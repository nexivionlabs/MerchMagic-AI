
import React from 'react';
import { PRODUCT_TEMPLATES } from '../constants';
import { ProductTemplate } from '../types';

interface TemplateSelectorProps {
  selectedId: string | null;
  onSelect: (template: ProductTemplate) => void;
}

const TemplateSelector: React.FC<TemplateSelectorProps> = ({ selectedId, onSelect }) => {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <i className="fas fa-shopping-bag text-indigo-500"></i> Step 2: Choose Product
      </h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        {PRODUCT_TEMPLATES.map((item) => (
          <button
            key={item.id}
            onClick={() => onSelect(item)}
            className={`group relative flex flex-col rounded-xl overflow-hidden border-2 transition-all duration-300 text-left
              ${selectedId === item.id ? 'border-indigo-600 ring-4 ring-indigo-50' : 'border-gray-100 hover:border-indigo-200'}`}
          >
            <div className="aspect-square relative overflow-hidden bg-gray-100">
              <img 
                src={item.imageUrl} 
                alt={item.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
              />
              <div className="absolute top-2 right-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[10px] font-bold text-gray-700 shadow-sm">
                {item.category.toUpperCase()}
              </div>
            </div>
            <div className="p-3">
              <p className="text-xs font-bold text-gray-900 truncate">{item.name}</p>
              <p className="text-[10px] text-gray-500 truncate mt-0.5">{item.description}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TemplateSelector;
