import React from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';

interface NoteRestoreAllProps {
  onRestoreAll: () => void;
  onClose: () => void;
}

export const NoteRestoreAll: React.FC<NoteRestoreAllProps> = ({ onRestoreAll, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onRestoreAll();
    onClose();
  };

  return (
    <ModalContent onClose={onClose} title="Восстановить все заметки?">
      <p>Все заметки будут восстановлены</p>
      <Form onSubmit={handleSubmit}>
        <div className="answer-buttons">
          <button type="submit">да</button>
          <button type="button" onClick={onClose}>нет</button>
        </div>
      </Form>
    </ModalContent>
  );
};