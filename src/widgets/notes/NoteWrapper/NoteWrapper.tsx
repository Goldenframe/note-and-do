import React, { useState, useCallback, useMemo } from 'react';
import { useNotes } from '@/features/notes/hooks/useNotes';
import { useNoteModals } from '@/features/notes/hooks/useNoteModals';
import { NoteHeader } from '../components/NoteHeader/NoteHeader';
import { NoteList } from '../components/NoteList/NoteList';
import { NoteModals } from '../components/NoteModals/NoteModals';

type NoteCategory = 'Все' | 'Корзина';

export const NoteWrapper: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<NoteCategory>('Все');
  
  const {
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
  } = useNotes();

  const {
    showModal,
    showOptions,
    currentModal,
    selectedNoteId,
    modalMessage,
    modalReason,
    openNoteModal,
    closeModal,
    setShowOptions,
    validateAction
  } = useNoteModals();

  const handleAddNote = useCallback(() => {
    openNoteModal('add');
  }, [openNoteModal]);

  const handleEditNote = useCallback((id: string) => {
    openNoteModal('edit', id);
  }, [openNoteModal]);

  const handleDeleteNote = useCallback((id: string) => {
    openNoteModal('delete', id);
  }, [openNoteModal]);

  const handlePermanentlyDeleteNote = useCallback((id: string) => {
    openNoteModal('deletePermanently', id);
  }, [openNoteModal]);

  const handleRestoreNote = useCallback((id: string) => {
    restoreNote(id);
  }, [restoreNote]);

  const handleRestoreAllNotes = useCallback(() => {
    if (validateAction(
      deletedNotes,
      'Невозможно восстановить список',
      'Вы не можете восстановить список, так как у вас не удалена ни одна заметка'
    )) {
      openNoteModal('restoreAll');
    }
  }, [deletedNotes, validateAction, openNoteModal]);

  const handleDeleteAllNotes = useCallback(() => {
    if (validateAction(
      notes,
      'Невозможно очистить список',
      'Вы не можете очистить список, так как у вас нет ни одной заметки'
    )) {
      openNoteModal('deleteAll');
    }
  }, [notes, validateAction, openNoteModal]);

  const handlePermanentlyDeleteAllNotes = useCallback(() => {
    if (validateAction(
      deletedNotes,
      'Невозможно очистить список',
      'Вы не можете очистить список, так как у вас нет ни одной заметки'
    )) {
      openNoteModal('deleteAllPermanently');
    }
  }, [deletedNotes, validateAction, openNoteModal]);

  const handleShowOptions = useCallback(() => {
    setShowOptions(prev => !prev);
    setTimeout(() => setShowOptions(false), 5000);
  }, [setShowOptions]);

  const notesCount = useMemo(() => 
    selectedCategory === 'Все' ? notes.length : deletedNotes.length,
    [selectedCategory, notes.length, deletedNotes.length]
  );

  const selectedNote = useMemo(() => {
    if (!selectedNoteId) return null;
    
    const source = currentModal === 'deletePermanently' ? deletedNotes : notes;
    return source.find(note => note.id === selectedNoteId) || null;
  }, [selectedNoteId, currentModal, notes, deletedNotes]);

  return (
    <div className="wrapper">
      <NoteHeader
        selectedCategory={selectedCategory}
        notesCount={notesCount}
        showOptions={showOptions}
        onCategoryChange={setSelectedCategory}
        onShowOptions={handleShowOptions}
        onAddNote={handleAddNote}
        onDeleteAll={handleDeleteAllNotes}
        onRestoreAll={handleRestoreAllNotes}
        onPermanentlyDeleteAll={handlePermanentlyDeleteAllNotes}
      />

      <NoteList
        category={selectedCategory}
        notes={notes}
        deletedNotes={deletedNotes}
        onEditNote={handleEditNote}
        onDeleteNote={handleDeleteNote}
        onRestoreNote={handleRestoreNote}
        onPermanentlyDeleteNote={handlePermanentlyDeleteNote}
      />


      {showModal && (
        <div 
          className="modal-overlay" 
          onMouseDown={closeModal}
          role="button"
          aria-label="Закрыть модальное окно"
          title="Закрыть модальное окно"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
              e.preventDefault();
              closeModal();
            }
          }}
        />
      )}

      {showModal && (
        <NoteModals
          currentModal={currentModal}
          selectedNote={selectedNote}
          modalMessage={modalMessage}
          modalReason={modalReason}
          onCreateNote={createNote}
          onUpdateNote={updateNote}
          onDeleteNote={deleteNote}
          onPermanentlyDeleteNote={permanentlyDeleteNote}
          onDeleteAllNotes={deleteAllNotes}
          onRestoreAllNotes={restoreAllNotes}
          onDeleteAllPermanently={deleteAllPermanently}
          onCloseModal={closeModal}
        />
      )}
    </div>
  );
};