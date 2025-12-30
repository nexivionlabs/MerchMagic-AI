
import React, { useRef } from 'react';

interface LogoUploadProps {
  onUpload: (base64: string) => void;
  currentLogo: string | null;
}

const LogoUpload: React.FC<LogoUploadProps> = ({ onUpload, currentLogo }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpload(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <i className="fas fa-upload text-indigo-500"></i> Step 1: Upload Logo
      </h3>
      
      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`relative cursor-pointer group border-2 border-dashed rounded-xl transition-all duration-300 flex flex-col items-center justify-center p-8
          ${currentLogo ? 'border-indigo-400 bg-indigo-50/30' : 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50/50'}`}
      >
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleFileChange} 
          className="hidden" 
          accept="image/*"
        />
        
        {currentLogo ? (
          <div className="relative">
            <img 
              src={currentLogo} 
              alt="Logo preview" 
              className="max-h-32 w-auto object-contain rounded-lg drop-shadow-md"
            />
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-md border border-gray-100 text-indigo-600">
              <i className="fas fa-check-circle text-xl"></i>
            </div>
            <p className="mt-4 text-xs text-indigo-600 font-medium text-center">Click to change logo</p>
          </div>
        ) : (
          <>
            <div className="w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
              <i className="fas fa-image text-gray-400 text-2xl"></i>
            </div>
            <p className="text-sm font-medium text-gray-700">Drop your logo here or click</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG, SVG supported</p>
          </>
        )}
      </div>
    </div>
  );
};

export default LogoUpload;
