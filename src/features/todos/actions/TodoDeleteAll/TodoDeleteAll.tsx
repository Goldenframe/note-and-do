import React from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';

interface TodoDeleteAllProps {
  onDeleteAll: () => void;
  onClose: () => void;
}

export const TodoDeleteAll: React.FC<TodoDeleteAllProps> = ({ onDeleteAll, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDeleteAll();
    onClose();
  };

  return (
    <ModalContent onClose={onClose} title="Очистить список?">
      <p>Все задачи будут перемещены в корзину</p>
      <Form onSubmit={handleSubmit}>
        <div className="answer-buttons">
          <button type="submit">да</button>
          <button type="button" onClick={onClose}>нет</button>
        </div>
      </Form>
    </ModalContent>
  );
};