import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import type { Note as NoteType } from '@/shared/lib/types/notes';

const notesAtom = atomWithStorage<NoteType[]>('dlist:notes', [], undefined, { getOnInit: true });
const deletedNotesAtom = atom<NoteType[]>([]);

export const useNotes = () => {
  const [notes, setNotes] = useAtom(notesAtom);
  const [deletedNotes, setDeletedNotes] = useAtom(deletedNotesAtom);

  const createNote = useCallback((noteData: Omit<NoteType, 'id'>) => {
    const newNote: NoteType = {
      ...noteData,
      id: uuid()
    };
    setNotes(prev => [...prev, newNote]);
  }, [setNotes]);

  const updateNote = useCallback((id: string, updates: Partial<NoteType>) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, ...updates } : note
    ));
  }, [setNotes]);

  const deleteNote = useCallback((id: string) => {
    const noteToDelete = notes.find(note => note.id === id);
    if (noteToDelete) {
      const trashedItem = { ...noteToDelete };
      setDeletedNotes(prev => [...prev, trashedItem]);
      setNotes(prev => prev.filter(note => note.id !== id));
      
      setTimeout(() => {
        setDeletedNotes(prev => prev.filter(note => note !== trashedItem));
      }, 300000);
    }
  }, [notes, setNotes, setDeletedNotes]);

  const restoreNote = useCallback((id: string) => {
    const noteToRestore = deletedNotes.find(note => note.id === id);
    if (noteToRestore) {
      setNotes(prev => [...prev, noteToRestore]);
      setDeletedNotes(prev => prev.filter(note => note.id !== id));
    }
  }, [deletedNotes, setNotes, setDeletedNotes]);

  const permanentlyDeleteNote = useCallback((id: string) => {
    setDeletedNotes(prev => prev.filter(note => note.id !== id));
  }, [setDeletedNotes]);

  const deleteAllNotes = useCallback(() => {
    const trashedItems = notes.map(note => ({ ...note }));
    setDeletedNotes(prev => [...prev, ...trashedItems]);
    setNotes([]);
    
    setTimeout(() => {
      setDeletedNotes(prev => prev.filter(note => !trashedItems.includes(note)));
    }, 10000);
  }, [notes, setNotes, setDeletedNotes]);

  const restoreAllNotes = useCallback(() => {
    setNotes(prev => [...prev, ...deletedNotes]);
    setDeletedNotes([]);
  }, [deletedNotes, setNotes, setDeletedNotes]);

  const deleteAllPermanently = useCallback(() => {
    setDeletedNotes([]);
  }, [setDeletedNotes]);

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