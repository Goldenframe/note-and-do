import React from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';
import { Todo } from '@/shared/lib/types/todos';

interface TodoDeletePermanentlyProps {
  todo: Todo;
  onPermanentlyDelete: (id: string) => void;
  onClose: () => void;
}

export const TodoDeletePermanently: React.FC<TodoDeletePermanentlyProps> = ({
  todo,
  onPermanentlyDelete,
  onClose
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onPermanentlyDelete(todo.id);
    onClose();
  };

  return (
    <ModalContent onClose={onClose} title="Удалить задачу навсегда?">
      <Form onSubmit={handleSubmit}>
        <textarea
          placeholder={todo.task}
          value={todo.task}
          disabled
          name="deleteTodoPermanentlyTextarea"
          autoFocus
          tabIndex={1}
        />
        <div className="answer-buttons">
          <button type="submit" tabIndex={2}>да</button>
          <button type="button" onClick={onClose} tabIndex={3}>
            нет
          </button>
        </div>
      </Form>
    </ModalContent>
  );
};