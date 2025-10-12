import React, { useState } from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';
import { Todo, TodoFormData } from '@/shared/lib/types/todos';

interface TodoAddProps {
  onCreate: (todo: Omit<Todo, 'id'>) => void;
  onClose: () => void;
}

export const TodoAdd: React.FC<TodoAddProps> = ({ onCreate, onClose }) => {
  const [formData, setFormData] = useState<TodoFormData>({ task: '' });
  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.task.trim() === '') {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    onCreate({
      task: formData.task,
      isCompleted: false,
      isImportant: false,
    });

    setFormData({ task: '' });
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <ModalContent onClose={onClose} title="Добавить задачу">
      {showWarning && (
        <p className="warning-text">
          Чтобы добавить задачу, необходимо заполнить поле
        </p>
      )}
      
      <Form onSubmit={handleSubmit}>
        <textarea
          value={formData.task}
          onChange={(e) => setFormData({ task: e.target.value })}
          placeholder="Мне необходимо сделать..."
          className="textarea-add"
          maxLength={120}
          name="addTodoTextarea"
          autoFocus
          tabIndex={1}
          onKeyDown={handleKeyDown}
        />
        <button type="submit" className="add-modal-button" tabIndex={2}>
          добавить
        </button>
      </Form>
    </ModalContent>
  );
};