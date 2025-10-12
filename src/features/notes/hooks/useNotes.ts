import { useState, useCallback } from 'react';
import { Note as NoteType } from '@/shared/lib/types/notes';

export const useNotes = () => {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [deletedNotes, setDeletedNotes] = useState<NoteType[]>([]);

  const createNote = useCallback((noteData: Omit<NoteType, 'id'>) => {
    const newNote: NoteType = {
      ...noteData,
      id: Date.now().toString()
    };
    setNotes(prev => [...prev, newNote]);
  }, []);

  const updateNote = useCallback((id: string, updates: Partial<NoteType>) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  }, []);

  const deleteNote = useCallback((id: string) => {
    const noteToDelete = notes.find(note => note.id === id);
    if (noteToDelete) {
      setDeletedNotes(prev => [...prev, noteToDelete]);
      setNotes(prev => prev.filter(note => note.id !== id));
      
      setTimeout(() => {
        setDeletedNotes(prev => prev.filter(note => note.id !== id));
      }, 300000);
    }
  }, [notes]);

  const restoreNote = useCallback((id: string) => {
    const noteToRestore = deletedNotes.find(note => note.id === id);
    if (noteToRestore) {
      setNotes(prev => [...prev, noteToRestore]);
      setDeletedNotes(prev => prev.filter(note => note.id !== id));
    }
  }, [deletedNotes]);

  const permanentlyDeleteNote = useCallback((id: string) => {
    setDeletedNotes(prev => prev.filter(note => note.id !== id));
  }, []);

  const deleteAllNotes = useCallback(() => {
    setDeletedNotes(prev => [...prev, ...notes]);
    setNotes([]);
    
    setTimeout(() => {
      setDeletedNotes([]);
    }, 10000);
  }, [notes]);

  const restoreAllNotes = useCallback(() => {
    setNotes(prev => [...prev, ...deletedNotes]);
    setDeletedNotes([]);
  }, [deletedNotes]);

  const deleteAllPermanently = useCallback(() => {
    setDeletedNotes([]);
  }, []);

  return {
    notes,
    deletedNotes,
    createNote,
    updateNote,
    deleteNote,
    restoreNote,
    permanentlyDeleteNote,
    deleteAllNotes,
    restoreAllNotes,
    deleteAllPermanently
  };
};