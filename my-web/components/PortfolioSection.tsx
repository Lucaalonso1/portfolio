import React from "react";
import { motion } from "framer-motion";

const PortfolioSection = () => {
  return (
    <motion.section
      className="min-h-screen flex items-center justify-center bg-[#1A1A1D] text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-6xl font-bold mb-12 text-center">
          Mis Proyectos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Proyecto 1 */}
          <motion.div
            className="bg-[#272729] rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/proyecto1.jpg"
              alt="Proyecto 1"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold mb-2">Proyecto Uno</h3>
              <p className="text-gray-400 mb-4">
                Breve descripción del proyecto uno.
              </p>
              <a
                href="#"
                className="text-indigo-500 hover:underline"
              >
                Ver más
              </a>
            </div>
          </motion.div>
          {/* Proyecto 2 */}
          <motion.div
            className="bg-[#272729] rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/proyecto2.jpg"
              alt="Proyecto 2"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold mb-2">Proyecto Dos</h3>
              <p className="text-gray-400 mb-4">
                Breve descripción del proyecto dos.
              </p>
              <a
                href="#"
                className="text-indigo-500 hover:underline"
              >
                Ver más
              </a>
            </div>
          </motion.div>
          {/* Proyecto 3 */}
          <motion.div
            className="bg-[#272729] rounded-lg overflow-hidden shadow-lg"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src="/proyecto3.jpg"
              alt="Proyecto 3"
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-semibold mb-2">Proyecto Tres</h3>
              <p className="text-gray-400 mb-4">
                Breve descripción del proyecto tres.
              </p>
              <a
                href="#"
                className="text-indigo-500 hover:underline"
              >
                Ver más
              </a>
            </div>
          </motion.div>
          {/* Agrega más proyectos según sea necesario */}
        </div>
      </div>
    </motion.section>
  );
};

export default PortfolioSection; 