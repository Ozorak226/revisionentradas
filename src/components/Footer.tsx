import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-white border-t border-gray-200 py-6 mt-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
          <div className="mb-4 md:mb-0">
            <p>© {currentYear} Sistema de Gestión de Inventario</p>
          </div>
          <div className="flex space-x-4">
            <span>Versión 1.0.0</span>
            <span>|</span>
            <span>Último inventario: {new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;