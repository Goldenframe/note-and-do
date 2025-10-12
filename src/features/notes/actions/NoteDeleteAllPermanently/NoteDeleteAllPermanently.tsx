import React from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';

interface NoteDeleteAllPermanentlyProps {
  onDeleteAllPermanently: () => void;
  onClose: () => void;
}

export const NoteDeleteAllPermanently: React.FC<NoteDeleteAllPermanentlyProps> = ({
  onDeleteAllPermanently,
  onClose
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeleteAllPermanently();
    onClose();
  };

  return (
    <ModalContent onClose={onClose} title="Очистить список?">
      <p>Заметки из корзины будут удалены навсегда и их нельзя будет восстановить</p>
      <Form onSubmit={handleSubmit}>
        <div className="answer-buttons">
          <button type="submit">да</button>
          <button type="button" onClick={onClose}>нет</button>
        </div>
      </Form>
    </ModalContent>
  );
};