import React from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';

interface TodoCompleteAllProps {
  onCompleteAll: () => void;
  onClose: () => void;
}

export const TodoCompleteAll: React.FC<TodoCompleteAllProps> = ({ onCompleteAll, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCompleteAll();
    onClose();
  };

  return (
    <ModalContent onClose={onClose} title="Отметить 'Выполнено'">
      <p>Все задачи будут отмечены 'Выполнено'</p>
      <Form onSubmit={handleSubmit}>
        <div className="answer-buttons">
          <button type="submit">да</button>
          <button type="button" onClick={onClose}>нет</button>
        </div>
      </Form>
    </ModalContent>
  );
};