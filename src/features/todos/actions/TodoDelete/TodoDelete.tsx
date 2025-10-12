import React from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';
import { Todo } from '@/shared/lib/types/todos';

interface TodoDeleteProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onClose: () => void;
}

export const TodoDelete: React.FC<TodoDeleteProps> = ({ todo, onDelete, onClose }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onDelete(todo.id);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <ModalContent onClose={onClose} title="Удалить задачу?">
      <Form onSubmit={handleSubmit} onKeyDown={handleKeyDown}>
        <textarea
          placeholder={todo.task}
          value={todo.task}
          readOnly
          name="deleteTodoTextarea"
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