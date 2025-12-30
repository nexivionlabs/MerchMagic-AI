
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import LogoUpload from './components/LogoUpload';
import TemplateSelector from './components/TemplateSelector';
import EditorControls from './components/EditorControls';
import { generateMockup, editMockup } from './services/geminiService';
import { ProductTemplate, MockupResult, AppStatus } from './types';

const App: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [selectedTemplate, setSelectedTemplate] = useState<ProductTemplate | null>(null);
  const [mockup, setMockup] = useState<MockupResult | null>(null);
  const [status, setStatus] = useState<AppStatus>(AppStatus.IDLE);
  const [error, setError] = useState<string | null>(null);

  const handleCreateMockup = useCallback(async (template: ProductTemplate) => {
    if (!logo) {
      setError("Please upload a logo first!");
      return;
    }

    setSelectedTemplate(template);
    setStatus(AppStatus.GENERATING);
    setError(null);

    try {
      const resultImageUrl = await generateMockup(logo, template.imageUrl, template.name);
      setMockup({
        id: Date.now().toString(),
        imageUrl: resultImageUrl,
        promptUsed: `Initial placement on ${template.name}`,
        timestamp: Date.now()
      });
      setStatus(AppStatus.IDLE);
    } catch (err) {
      console.error(err);
      setError("Failed to generate mockup. Please try again.");
      setStatus(AppStatus.ERROR);
    }
  }, [logo]);

  const handleEditMockup = useCallback(async (prompt: string) => {
    if (!mockup) return;

    setStatus(AppStatus.EDITING);
    setError(null);

    try {
      const resultImageUrl = await editMockup(mockup.imageUrl, prompt);
      setMockup({
        id: Date.now().toString(),
        imageUrl: resultImageUrl,
        promptUsed: prompt,
        timestamp: Date.now()
      });
      setStatus(AppStatus.IDLE);
    } catch (err) {
      console.error(err);
      setError("Failed to apply edit. The model might be busy.");
      setStatus(AppStatus.ERROR);
    }
  }, [mockup]);

  const downloadImage = () => {
    if (!mockup) return;
    const link = document.createElement('a');
    link.href = mockup.imageUrl;
    link.download = `mockup-${selectedTemplate?.id || 'merch'}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const isProcessing = status === AppStatus.GENERATING || status === AppStatus.EDITING;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-12">
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Panel: Controls */}
          <div className="lg:col-span-4 space-y-6">
            <LogoUpload onUpload={setLogo} currentLogo={logo} />
            
            <TemplateSelector 
              selectedId={selectedTemplate?.id || null} 
              onSelect={handleCreateMockup} 
            />

            {mockup && (
              <EditorControls onEdit={handleEditMockup} isProcessing={isProcessing} />
            )}
            
            {error && (
              <div className="bg-red-50 border border-red-100 p-4 rounded-xl flex items-start gap-3">
                <i className="fas fa-exclamation-circle text-red-500 mt-1"></i>
                <div className="text-sm text-red-700 font-medium">{error}</div>
              </div>
            )}
          </div>

          {/* Right Panel: Preview Area */}
          <div className="lg:col-span-8 sticky top-24">
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl overflow-hidden min-h-[500px] flex flex-col relative">
              
              {/* Toolbar */}
              <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                    <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  </div>
                  <span className="ml-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
                    Live Preview
                  </span>
                </div>
                
                {mockup && (
                  <button 
                    onClick={downloadImage}
                    className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 bg-indigo-50 px-3 py-1.5 rounded-full transition-all"
                  >
                    <i className="fas fa-download"></i> EXPORT PRINT-READY
                  </button>
                )}
              </div>

              {/* Main Canvas Area */}
              <div className="flex-1 relative flex items-center justify-center p-8 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
                {isProcessing ? (
                  <div className="flex flex-col items-center gap-6 animate-pulse">
                    <div className="relative">
                      <div className="w-24 h-24 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <i className="fas fa-wand-magic-sparkles text-indigo-600 text-2xl"></i>
                      </div>
                    </div>
                    <div className="text-center space-y-2">
                      <p className="text-lg font-bold text-gray-900">
                        {status === AppStatus.GENERATING ? 'Generating Mockup...' : 'Applying Magic Edits...'}
                      </p>
                      <p className="text-sm text-gray-500 max-w-[250px]">
                        Our AI is placing your logo with realistic depth and lighting. This takes about 10 seconds.
                      </p>
                    </div>
                  </div>
                ) : mockup ? (
                  <div className="group relative w-full h-full flex items-center justify-center">
                    <img 
                      src={mockup.imageUrl} 
                      alt="Product Mockup" 
                      className="max-w-full max-h-[600px] object-contain rounded-xl shadow-2xl transition-transform duration-700 hover:scale-[1.02]"
                    />
                    <div className="absolute bottom-4 left-4 right-4 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-[10px] font-medium border border-white/10">
                        <i className="fas fa-info-circle mr-1 text-indigo-400"></i>
                        PROMPT: {mockup.promptUsed}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-32 h-32 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-6">
                      <i className="fas fa-tshirt text-indigo-200 text-5xl"></i>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Ready to design?</h2>
                    <p className="text-gray-500 max-w-sm mx-auto">
                      Upload your brand logo and select a product on the left to see the AI magic happen instantly.
                    </p>
                  </div>
                )}
              </div>

              {/* Tips Footer */}
              <div className="px-6 py-4 border-t border-gray-100 bg-white flex items-center justify-center gap-6 overflow-x-auto">
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <i className="fas fa-bolt text-yellow-400 text-sm"></i>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Ultra Fast Rendering</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <i className="fas fa-shield-alt text-green-400 text-sm"></i>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Print-Ready Quality</span>
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <i className="fas fa-heart text-pink-400 text-sm"></i>
                  <span className="text-[10px] font-bold text-gray-400 uppercase">Natural Texture Overlay</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;
