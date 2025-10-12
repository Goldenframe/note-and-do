import { useState, useCallback } from 'react';
import { useModal } from '@/shared/lib/hooks/useModal';
import { Note as NoteType } from '@/shared/lib/types/notes';

type NoteModalType = 
  | 'add' 
  | 'edit' 
  | 'delete' 
  | 'deletePermanently' 
  | 'deleteAll' 
  | 'deleteAllPermanently' 
  | 'restoreAll';

export const useNoteModals = () => {
  const {
    openModal,
    closeModal,
    openModalOptions,
    showOptions,
    setShowOptions,
    showModal,
    showModalWarning,
    modalMessage,
    modalReason,
    currentModal,
    setCurrentModal
  } = useModal();

  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const openNoteModal = useCallback((modalType: NoteModalType, noteId?: string) => {
    setCurrentModal(modalType);
    if (noteId) {
      setSelectedNoteId(noteId);
    }
    openModal();
  }, [openModal, setCurrentModal]);

  const validateAction = useCallback((
    items: NoteType[],
    errorMessage: string,
    errorReason: string
  ): boolean => {
    if (items.length === 0) {
      openModalOptions(items, errorMessage, errorReason); // ← ИСПРАВЛЕНО: добавлен первый аргумент
      return false;
    }
    return true;
  }, [openModalOptions]);

  return {
    showModal,
    showOptions,
    showModalWarning,
    currentModal,
    selectedNoteId,
    modalMessage,
    modalReason,
    openNoteModal,
    closeModal,
    setShowOptions,
    validateAction
  };
};