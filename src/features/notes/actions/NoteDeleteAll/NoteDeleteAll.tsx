import React from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';

interface NoteDeleteAllProps {
  onDeleteAll: () => void;
  onClose: () => void;
}

export const NoteDeleteAll: React.FC<NoteDeleteAllProps> = ({ onDeleteAll, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeleteAll();
    onClose();
  };

  return (
    <ModalContent onClose={onClose} className="note-modal" title="Очистить список?">
      <p>Все заметки будут перемещены в корзину</p>
      <Form onSubmit={handleSubmit}>
        <div className="answer-buttons">
          <button type="submit">да</button>
          <button type="button" onClick={onClose}>нет</button>
        </div>
      </Form>
    </ModalContent>
  );
};