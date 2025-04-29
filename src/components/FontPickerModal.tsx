import React from "react";

const FONTS = [
  { name: "Inter", style: { fontFamily: 'Inter, sans-serif' } },
  { name: "IBM Plex Sans", style: { fontFamily: 'IBM Plex Sans, sans-serif' } },
  { name: "Merriweather", style: { fontFamily: 'Merriweather, serif' } },
  { name: "Lora", style: { fontFamily: 'Lora, serif' } },
  { name: "Fira Sans", style: { fontFamily: 'Fira Sans, sans-serif' } },
  { name: "Source Serif Pro", style: { fontFamily: 'Source Serif Pro, serif' } },
  { name: "Georgia", style: { fontFamily: 'Georgia, serif' } },
  { name: "PT Serif", style: { fontFamily: 'PT Serif, serif' } },
  { name: "Roboto Slab", style: { fontFamily: 'Roboto Slab, serif' } },
  { name: "Open Sans", style: { fontFamily: 'Open Sans, sans-serif' } },
];

interface FontPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelectFont: (font: string) => void;
  selectedFont: string;
}

const FontPickerModal: React.FC<FontPickerModalProps> = ({ open, onClose, onSelectFont, selectedFont }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[7000] bg-black/30 flex items-center justify-center">
      <div className="bg-white/70 dark:bg-black/60 border border-white/30 dark:border-white/10 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-xs p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Choose a Font</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg px-2 py-1 rounded-full transition-colors">✕</button>
        </div>
        <div className="max-h-48 overflow-y-auto space-y-1">
          {FONTS.map((font) => (
            <button
              key={font.name}
              onClick={() => onSelectFont(font.name)}
              className={`w-full text-left px-3 py-2 rounded-lg transition-colors font-medium text-sm ${selectedFont === font.name ? 'bg-gray-100 dark:bg-gray-800 text-black dark:text-white' : 'hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-200'}`}
              style={font.style}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FontPickerModal; 