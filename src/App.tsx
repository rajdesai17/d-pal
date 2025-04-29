import { useState, useEffect, useCallback, useRef } from 'react'
import { useNotes } from './hooks/useNotes'
import Navbar from './components/Navbar'
import NoteEditor, { NoteEditorHandle } from './components/NoteEditor'
import CommandPalette from './components/CommandPalette'
import FontPickerModal from './components/FontPickerModal'
import EmojiPickerModal from './components/EmojiPickerModal'
import { Routes, Route } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import './App.css'

const FONT_FAMILIES: Record<string, string> = {
  'Inter': 'Inter, sans-serif',
  'IBM Plex Sans': 'IBM Plex Sans, sans-serif',
  'Merriweather': 'Merriweather, serif',
  'Lora': 'Lora, serif',
  'Fira Sans': 'Fira Sans, sans-serif',
  'Source Serif Pro': 'Source Serif Pro, serif',
  'Georgia': 'Georgia, serif',
  'PT Serif': 'PT Serif, serif',
  'Roboto Slab': 'Roboto Slab, serif',
  'Open Sans': 'Open Sans, sans-serif',
};

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    if (saved !== null) return JSON.parse(saved);
    // Use system preference if not set
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  })
  const [isCommandPaletteOpen, setIsCommandPaletteOpen] = useState(false)
  const {
    segments,
    setContent,
    setFontForNewText,
    setAlignForCurrentSegment,
    currentFont
  } = useNotes()

  // Font picker state
  const [fontModalOpen, setFontModalOpen] = useState(false)
  // Emoji picker state
  const [emojiModalOpen, setEmojiModalOpen] = useState(false)
  // Ref for NoteEditor textarea
  const noteEditorRef = useRef<any>(null)

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode))
    document.documentElement.classList.toggle('dark', darkMode)
  }, [darkMode])

  // Keyboard shortcut for font picker and emoji picker
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'f') {
      e.preventDefault()
      setFontModalOpen(true)
    }
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'e') {
      e.preventDefault()
      setEmojiModalOpen(true)
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
      e.preventDefault()
      setIsCommandPaletteOpen(true)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Insert emoji at cursor in NoteEditor
  const insertEmojiAtCursor = (emoji: string) => {
    if (noteEditorRef.current) {
      noteEditorRef.current.insertEmoji(emoji)
    }
    setEmojiModalOpen(false)
  }

  const commands = [
    {
      id: 'toggle-theme',
      name: 'Toggle Theme',
      action: () => setDarkMode(!darkMode),
    },
    {
      id: 'clear-notes',
      name: 'Clear Notes',
      action: () => setContent(''),
    },
  ]

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/notes" element={
        <div className={`min-h-screen transition-colors duration-200 ${darkMode ? 'dark bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text'}`}
        >
          <Navbar />
          <div className="container mx-auto px-4 pt-24 pb-8">
            <div className="max-w-3xl mx-auto">
              <NoteEditor
                ref={noteEditorRef}
                segments={segments}
                setContent={setContent}
                setAlignForCurrentSegment={setAlignForCurrentSegment}
                currentFont={currentFont}
                darkMode={darkMode}
              />
            </div>
          </div>
          <CommandPalette
            isOpen={isCommandPaletteOpen}
            onClose={() => setIsCommandPaletteOpen(false)}
            commands={commands}
          />
          <FontPickerModal
            open={fontModalOpen}
            onClose={() => setFontModalOpen(false)}
            onSelectFont={(font) => { setFontForNewText(font); setFontModalOpen(false); }}
            selectedFont={currentFont}
          />
          <EmojiPickerModal
            open={emojiModalOpen}
            onClose={() => setEmojiModalOpen(false)}
            onSelectEmoji={insertEmojiAtCursor}
          />
        </div>
      } />
    </Routes>
  )
}

export default App
