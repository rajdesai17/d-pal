import { forwardRef, useImperativeHandle, useRef, useEffect, useState } from 'react'
import { NoteSegment } from '../hooks/useNotes'

export interface NoteEditorProps {
  segments: NoteSegment[]
  setContent: (content: string) => void
  setAlignForCurrentSegment: (align: 'left' | 'center') => void
  currentFont: string
  darkMode: boolean
}

export interface NoteEditorHandle {
  insertEmoji: (emoji: string) => void
}

const NoteEditor = forwardRef<NoteEditorHandle, NoteEditorProps>(
  ({ segments, setContent, setAlignForCurrentSegment, currentFont, darkMode }, ref) => {
    const textareaRef = useRef<HTMLTextAreaElement>(null)
    const [showToolbar, setShowToolbar] = useState(false)
    const [toolbarPos, setToolbarPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

    useImperativeHandle(ref, () => ({
      insertEmoji: (emoji: string) => {
        const textarea = textareaRef.current
        if (!textarea) return
        const start = textarea.selectionStart
        const end = textarea.selectionEnd
        const value = textarea.value
        const newValue = value.slice(0, start) + emoji + value.slice(end)
        setContent(newValue)
        setTimeout(() => {
          textarea.focus()
          textarea.selectionStart = textarea.selectionEnd = start + emoji.length
        }, 0)
      }
    }))

    useEffect(() => {
      if (textareaRef.current) {
        textareaRef.current.focus()
      }
    }, [segments.length])

    // Show toolbar on text selection
    const handleSelect = () => {
      const textarea = textareaRef.current
      if (!textarea) return
      const selection = textarea.value.substring(textarea.selectionStart, textarea.selectionEnd)
      if (selection.length > 0) {
        const rect = textarea.getBoundingClientRect()
        setToolbarPos({
          top: rect.top + window.scrollY - 48,
          left: rect.left + window.scrollX + rect.width / 2,
        })
        setShowToolbar(true)
      } else {
        setShowToolbar(false)
      }
    }

    // Formatting handlers (bold/italic via markdown)
    const formatSelection = (type: 'bold' | 'italic') => {
      const textarea = textareaRef.current
      if (!textarea) return
      const start = textarea.selectionStart
      const end = textarea.selectionEnd
      const value = textarea.value
      const selected = value.substring(start, end)
      let formatted = selected
      if (type === 'bold') formatted = `**${selected}**`
      if (type === 'italic') formatted = `_${selected}_`
      const newValue = value.slice(0, start) + formatted + value.slice(end)
      setContent(newValue)
      setTimeout(() => {
        textarea.focus()
        textarea.selectionStart = start
        textarea.selectionEnd = start + formatted.length
      }, 0)
    }

    return (
      <div className="w-full max-w-6xl mx-auto min-h-[60vh] bg-transparent focus:outline-none transition-colors duration-200 overflow-y-auto">
        {segments.slice(0, -1).map((seg, idx) => (
          <div
            key={idx}
            className={`mb-2 px-1 py-1 ${seg.align === 'center' ? 'text-center' : 'text-left'}`}
            style={{ fontFamily: seg.font, color: darkMode ? '#9ca3af' : '#4b5563', fontSize: '1.125rem', lineHeight: '1.6' }}
          >
            {seg.text}
          </div>
        ))}
        {/* Editable segment */}
        <div className="relative">
          {showToolbar && (
            <div
              className="absolute z-50 left-1/2 -translate-x-1/2 -top-12 flex items-center gap-2 bg-white/80 dark:bg-black/70 border border-gray-200 dark:border-gray-700 shadow-lg rounded-xl px-3 py-2 backdrop-blur-md"
              style={{ top: toolbarPos.top, left: toolbarPos.left, position: 'fixed' }}
            >
              <button
                className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm font-bold"
                onMouseDown={e => { e.preventDefault(); formatSelection('bold') }}
              >
                B
              </button>
              <button
                className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm italic font-semibold"
                onMouseDown={e => { e.preventDefault(); formatSelection('italic') }}
              >
                I
              </button>
              <button
                className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                onMouseDown={e => { e.preventDefault(); setAlignForCurrentSegment('center'); setShowToolbar(false); }}
              >
                Center
              </button>
              <button
                className="px-2 py-1 rounded hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                onMouseDown={e => { e.preventDefault(); setAlignForCurrentSegment('left'); setShowToolbar(false); }}
              >
                Left
              </button>
            </div>
          )}
          <textarea
            ref={textareaRef}
            value={segments[segments.length - 1]?.text || ''}
            onChange={e => setContent(e.target.value)}
            onSelect={handleSelect}
            className={`w-full bg-transparent focus:outline-none resize-none ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
            style={{
              fontFamily: currentFont,
              lineHeight: '1.6',
              fontSize: '1.125rem',
              minHeight: '40vh',
              textAlign: segments[segments.length - 1]?.align || 'left',
            }}
            placeholder="Start writing..."
          />
        </div>
      </div>
    )
  }
)

export default NoteEditor 