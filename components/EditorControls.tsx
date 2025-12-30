
import React, { useState } from 'react';
import { EDIT_SUGGESTIONS } from '../constants';

interface EditorControlsProps {
  onEdit: (prompt: string) => void;
  isProcessing: boolean;
}

const EditorControls: React.FC<EditorControlsProps> = ({ onEdit, isProcessing }) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isProcessing) {
      onEdit(prompt);
      setPrompt('');
    }
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm mt-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <i className="fas fa-wand-sparkles text-indigo-500"></i> Step 3: Magic Edits
      </h3>
      
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g. Add a retro 80s filter..."
          disabled={isProcessing}
          className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
        />
        <button
          type="submit"
          disabled={!prompt.trim() || isProcessing}
          className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:bg-gray-400 text-white px-6 py-2.5 rounded-xl font-medium text-sm transition-all shadow-sm flex items-center gap-2"
        >
          {isProcessing ? (
            <i className="fas fa-circle-notch fa-spin"></i>
          ) : (
            <i className="fas fa-paper-plane"></i>
          )}
          Go
        </button>
      </form>

      <div className="mt-4">
        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-2">Suggested Edits</p>
        <div className="flex flex-wrap gap-2">
          {EDIT_SUGGESTIONS.map((sug) => (
            <button
              key={sug}
              onClick={() => !isProcessing && onEdit(sug)}
              className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs rounded-full transition-colors border border-indigo-100/50"
            >
              {sug}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EditorControls;
