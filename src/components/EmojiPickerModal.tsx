import React from "react";

const EMOJIS = [
  "😀", "😂", "😍", "😎", "😊", "😉", "😇", "🥰", "🤔", "😴",
  "😢", "😭", "😡", "🤯", "🥳", "😱", "🤗", "👍", "🙏", "🔥",
  "💡", "🎉", "✨", "❤️", "📝", "📚", "📖", "🧠", "💭", "🚀"
];

interface EmojiPickerModalProps {
  open: boolean;
  onClose: () => void;
  onSelectEmoji: (emoji: string) => void;
}

const EmojiPickerModal: React.FC<EmojiPickerModalProps> = ({ open, onClose, onSelectEmoji }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[7000] bg-black/30 flex items-center justify-center">
      <div className="bg-white/70 dark:bg-black/60 border border-white/30 dark:border-white/10 backdrop-blur-md rounded-2xl shadow-xl w-full max-w-xs p-4">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">Pick an Emoji</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 text-lg px-2 py-1 rounded-full transition-colors">✕</button>
        </div>
        <div className="grid grid-cols-6 gap-2 max-h-40 overflow-y-auto">
          {EMOJIS.map((emoji) => (
            <button
              key={emoji}
              onClick={() => onSelectEmoji(emoji)}
              className="text-2xl p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors text-gray-700 dark:text-gray-200"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmojiPickerModal; 