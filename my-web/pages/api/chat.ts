import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { message, conversationHistory } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Verificar que la API key esté disponible
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not found');
    }

    // Configuración del sistema para el asistente de IA
    const systemPrompt = `Eres Luca Alonso Froeling, un desarrollador full-stack especializado en React, Next.js, TypeScript, Python y Node.js. 
    
    Información sobre Luca:
    - Desarrollador full-stack con experiencia en React, Next.js, TypeScript, Python, Node.js
    - Especializado en desarrollo web moderno y aplicaciones escalables
    - Ha trabajado en proyectos como 7indoorgolf.com y escuelatecnicadegolf.com
    - Conocimientos en MongoDB, Tailwind CSS, Framer Motion, Vercel
    - Experiencia en diseño UI/UX con Figma
    - Apasionado por la tecnología y el desarrollo de software
    
    Responde las preguntas de los visitantes de manera amigable, profesional y útil. 
    Si te preguntan sobre proyectos, habilidades, experiencia o disponibilidad, proporciona información relevante.
    Mantén las respuestas concisas pero informativas.
    Si no sabes algo específico, admítelo y sugiere contactar directamente.
    
    Responde siempre en español a menos que te pidan específicamente en otro idioma.`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemPrompt },
          ...conversationHistory,
          { role: 'user', content: message }
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      let errorData;
      
      try {
        errorData = JSON.parse(errorText);
      } catch {
        errorData = { error: { message: errorText } };
      }

      console.error('OpenAI API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        errorText: errorText,
        errorData: errorData
      });

      // Manejo específico de errores de cuota
      if (response.status === 429) {
        if (errorData.error?.code === 'insufficient_quota') {
          console.warn('OpenAI quota exceeded - switching to fallback responses');
          throw new Error('QUOTA_EXCEEDED');
        } else {
          console.warn('OpenAI rate limit exceeded - switching to fallback responses');
          throw new Error('RATE_LIMIT_EXCEEDED');
        }
      }

      throw new Error(`OpenAI API error: ${response.status} - ${response.statusText}`);
    }

    const data = await response.json();
    const aiMessage = data.choices[0].message.content;

    res.status(200).json({ 
      message: aiMessage,
      timestamp: new Date().toISOString()
    });

  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    
    // Determinar el tipo de error y mensaje apropiado
    let errorType = 'general';
    let errorMessage = 'Problemas técnicos temporales';
    
    if (error instanceof Error) {
      if (error.message === 'QUOTA_EXCEEDED') {
        errorType = 'quota';
        errorMessage = 'Límite de cuota excedido';
      } else if (error.message === 'RATE_LIMIT_EXCEEDED') {
        errorType = 'rate_limit';
        errorMessage = 'Límite de velocidad excedido';
      } else if (error.message.includes('API key not found')) {
        errorType = 'api_key';
        errorMessage = 'Configuración de API no encontrada';
      }
    }
    
    // Sistema de respuestas de fallback cuando la API de OpenAI falla
    const fallbackResponses = {
      'hola': `¡Hola! 👋 Soy el asistente de Luca. ${errorType === 'quota' ? 'Actualmente estoy en modo de respuestas limitadas debido a restricciones de cuota, pero puedo ayudarte con información básica.' : 'Actualmente estoy teniendo problemas técnicos con la IA, pero puedo ayudarte con información básica.'} ¿Te gustaría saber sobre sus proyectos o habilidades?`,
      'proyectos': 'Luca ha trabajado en varios proyectos destacados como 7indoorgolf.com (plataforma de reservas de golf) y escuelatecnicadegolf.com. Ambos desarrollados con React, Next.js y tecnologías modernas.',
      'habilidades': 'Luca es especialista en React, Next.js, TypeScript, Python, Node.js, MongoDB, Tailwind CSS, Framer Motion y Vercel. También tiene experiencia en diseño UI/UX con Figma.',
      'experiencia': 'Luca es un desarrollador full-stack con experiencia en desarrollo web moderno y aplicaciones escalables. Ha trabajado en proyectos de reservas y plataformas educativas.',
      'contacto': 'Para contactar con Luca, puedes usar el formulario de contacto en esta página o enviarle un mensaje directo. Está disponible para proyectos y colaboraciones.',
      'default': `Lo siento, estoy teniendo ${errorType === 'quota' ? 'restricciones de cuota' : 'problemas técnicos temporales'}. Por favor, contacta directamente con Luca a través del formulario de contacto para obtener más información.`
    };

    // Buscar respuesta de fallback basada en palabras clave
    const messageLower = message.toLowerCase();
    let fallbackResponse = fallbackResponses.default;

    if (messageLower.includes('hola') || messageLower.includes('hello')) {
      fallbackResponse = fallbackResponses.hola;
    } else if (messageLower.includes('proyecto') || messageLower.includes('project')) {
      fallbackResponse = fallbackResponses.proyectos;
    } else if (messageLower.includes('habilidad') || messageLower.includes('skill') || messageLower.includes('tecnolog')) {
      fallbackResponse = fallbackResponses.habilidades;
    } else if (messageLower.includes('experiencia') || messageLower.includes('experience')) {
      fallbackResponse = fallbackResponses.experiencia;
    } else if (messageLower.includes('contacto') || messageLower.includes('contact')) {
      fallbackResponse = fallbackResponses.contacto;
    }

    res.status(200).json({ 
      message: fallbackResponse,
      timestamp: new Date().toISOString(),
      fallback: true,
      errorType: errorType,
      errorMessage: errorMessage
    });
  }
}
