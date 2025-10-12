import React from 'react';
import {
  NoteAdd,
  NoteEdit,
  NoteDelete,
  NoteDeletePermanently,
  NoteRestoreAll,
  NoteDeleteAll,
  NoteDeleteAllPermanently
} from '@/features/notes/actions';
import { ModalWarning } from '@/shared/ui/ModalWarning/ModalWarning';
import { Note as NoteType } from '@/shared/lib/types/notes';

interface NoteModalsProps {
  currentModal: string | null;
  selectedNote: NoteType | null;
  modalMessage: string;
  modalReason: string;
  onCreateNote: (noteData: Omit<NoteType, 'id'>) => void;
  onUpdateNote: (id: string, updates: Partial<NoteType>) => void;
  onDeleteNote: (id: string) => void;
  onPermanentlyDeleteNote: (id: string) => void;
  onDeleteAllNotes: () => void;
  onRestoreAllNotes: () => void;
  onDeleteAllPermanently: () => void;
  onCloseModal: () => void;
}

export const NoteModals: React.FC<NoteModalsProps> = ({
  currentModal,
  selectedNote,
  modalMessage,
  modalReason,
  onCreateNote,
  onUpdateNote,
  onDeleteNote,
  onPermanentlyDeleteNote,
  onDeleteAllNotes,
  onRestoreAllNotes,
  onDeleteAllPermanently,
  onCloseModal
}) => {
  if (!currentModal) return null;

  switch (currentModal) {
    case 'add':
      return <NoteAdd onCreate={onCreateNote} onClose={onCloseModal} />;
    
    case 'edit':
      return selectedNote ? (
        <NoteEdit 
          note={selectedNote} 
          onUpdate={onUpdateNote} 
          onClose={onCloseModal} 
        />
      ) : null;
    
    case 'delete':
      return selectedNote ? (
        <NoteDelete 
          note={selectedNote} 
          onDelete={onDeleteNote} 
          onClose={onCloseModal} 
        />
      ) : null;
    
    case 'deletePermanently':
      return selectedNote ? (
        <NoteDeletePermanently 
          note={selectedNote} 
          onPermanentlyDelete={onPermanentlyDeleteNote} 
          onClose={onCloseModal} 
        />
      ) : null;
    
    case 'deleteAll':
      return <NoteDeleteAll onDeleteAll={onDeleteAllNotes} onClose={onCloseModal} />;
    
    case 'deleteAllPermanently':
      return <NoteDeleteAllPermanently onDeleteAllPermanently={onDeleteAllPermanently} onClose={onCloseModal} />;
    
    case 'restoreAll':
      return <NoteRestoreAll onRestoreAll={onRestoreAllNotes} onClose={onCloseModal} />;
    
    case 'warning':
      return <ModalWarning message={modalMessage} reason={modalReason} onClose={onCloseModal} />;
    
    default:
      return null;
  }
};