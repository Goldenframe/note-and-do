import React from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';
import { Note } from '@/shared/lib/types/notes';

interface NoteDeleteProps {
  note: Note;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const NoteDelete: React.FC<NoteDeleteProps> = ({ note, onDelete, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDelete(note.id);
    onClose();
  };

  return (
    <ModalContent onClose={onClose} className="note-modal" title="Удалить заметку?">
      <Form onSubmit={handleSubmit}>
        {note.theme ? (
          <input value={note.theme} readOnly name="deleteNoteInput" />
        ) : (
          <input placeholder="Нет темы" readOnly name="deleteNoteInputEmpty" />
        )}
        <textarea value={note.text} readOnly name="deleteNoteTextarea" />
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