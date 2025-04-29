import { useState, useEffect } from 'react'

export type NoteSegment = {
  text: string
  font: string
  align?: 'left' | 'center'
}

export const useNotes = () => {
  const [segments, setSegments] = useState<NoteSegment[]>(() => {
    const saved = localStorage.getItem('notes');
    if (!saved) return [{ text: '', font: 'Inter', align: 'left' }];
    try {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed[0]?.text !== undefined && parsed[0]?.font !== undefined) {
        return parsed.map(seg => ({ ...seg, align: seg.align || 'left' }));
      }
      if (typeof parsed === 'string') {
        return [{ text: parsed, font: 'Inter', align: 'left' }];
      }
      return [{ text: '', font: 'Inter', align: 'left' }];
    } catch {
      return [{ text: saved, font: 'Inter', align: 'left' }];
    }
  })
  const [currentFont, setCurrentFont] = useState(() => localStorage.getItem('fontFamily') || 'Inter')

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(segments))
  }, [segments])

  const setFontForNewText = (font: string) => {
    setCurrentFont(font)
    setSegments((prev) => {
      if (prev.length === 0 || (prev[prev.length - 1].font === font && prev[prev.length - 1].text === '')) {
        return prev
      }
      return [...prev, { text: '', font, align: 'left' }]
    })
  }

  const setContent = (newText: string) => {
    setSegments((prev) => {
      if (prev.length === 0) return [{ text: newText, font: currentFont, align: 'left' }]
      const last = prev[prev.length - 1]
      return [...prev.slice(0, -1), { ...last, text: newText }]
    })
  }

  const setAlignForCurrentSegment = (align: 'left' | 'center') => {
    setSegments((prev) => {
      if (prev.length === 0) return prev
      const last = prev[prev.length - 1]
      return [...prev.slice(0, -1), { ...last, align }]
    })
  }

  return { segments, setContent, setFontForNewText, setAlignForCurrentSegment, currentFont }
} 