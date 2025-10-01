# Configuración de OpenAI API

## Error de Cuota Excedida

Si estás viendo el error `429 - Too Many Requests` con el mensaje `insufficient_quota`, significa que has excedido la cuota de tu plan de OpenAI.

## Soluciones

### 1. Verificar tu cuenta de OpenAI
- Ve a [OpenAI Platform](https://platform.openai.com/account/billing)
- Verifica que tengas créditos disponibles
- Revisa tu plan actual y límites de uso

### 2. Configurar la API Key
Crea un archivo `.env.local` en la raíz del proyecto con:

```bash
OPENAI_API_KEY=tu_api_key_aqui
```

### 3. Obtener una nueva API Key
1. Ve a [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Inicia sesión en tu cuenta
3. Crea una nueva API key
4. Copia la key y pégala en `.env.local`

### 4. Reiniciar el servidor
Después de configurar la API key:
```bash
npm run dev
# o
yarn dev
```

## Sistema de Fallback

El sistema ahora incluye respuestas de fallback automáticas cuando:
- La cuota de OpenAI está excedida
- Hay límites de velocidad
- La API key no está configurada
- Hay otros errores técnicos

Las respuestas de fallback proporcionan información básica sobre Luca y sus proyectos.

## Monitoreo

El sistema registra en la consola:
- Errores específicos de la API
- Tipo de error (cuota, límite de velocidad, etc.)
- Cambios automáticos a modo fallback

## Próximos Pasos

1. Configura tu API key de OpenAI
2. Verifica que tu cuenta tenga créditos
3. Considera actualizar tu plan si necesitas más cuota
4. El sistema funcionará con respuestas de fallback mientras tanto
