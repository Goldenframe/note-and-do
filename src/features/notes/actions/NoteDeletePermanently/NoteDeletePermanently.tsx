import React from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';
import { Note } from '@/shared/lib/types/notes';

interface NoteDeletePermanentlyProps {
  note: Note;
  onPermanentlyDelete: (id: string) => void;
  onClose: () => void;
}

export const NoteDeletePermanently: React.FC<NoteDeletePermanentlyProps> = ({
  note,
  onPermanentlyDelete,
  onClose
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPermanentlyDelete(note.id);
    onClose();
  };

  return (
    <ModalContent onClose={onClose} className="note-modal" title="Удалить заметку навсегда?">
      <Form onSubmit={handleSubmit}>
        {note.theme ? (
          <input value={note.theme} readOnly name="deleteNotePermanentlyInput" />
        ) : (
          <input placeholder="Нет темы" readOnly name="deleteNotePermanentlyInputEmpty" />
        )}
        <textarea value={note.text} readOnly name="deleteNotePermanentlyTextarea" />
        <div className="answer-buttons">
          <button type="submit">да</button>
          <button type="button" onClick={onClose}>
            нет
          </button>
        </div>
      </Form>
    </ModalContent>
  );
};