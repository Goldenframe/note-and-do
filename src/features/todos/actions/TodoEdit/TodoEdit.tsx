import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';
import { Todo, TodoFormData } from '@/shared/lib/types/todos';

interface TodoEditProps {
  todo: Todo;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onMakeImportant: (id: string) => void;
  onClose: () => void;
}

export const TodoEdit: React.FC<TodoEditProps> = ({
  todo,
  onUpdate,
  onMakeImportant,
  onClose
}) => {
  const [formData, setFormData] = useState<TodoFormData>({ task: todo.task });
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setFormData({ task: todo.task });
  }, [todo]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.task.trim() === '') {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    onUpdate(todo.id, { task: formData.task });
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleMakeImportant = () => {
    onMakeImportant(todo.id);
  };

  return (
    <ModalContent onClose={onClose}>
      <div className="modal-header-icons">
        <FontAwesomeIcon
          icon={todo.isImportant ? solidBookmark : regularBookmark}
          className={todo.isImportant ? "important modal-bookmark" : "modal-bookmark"}
          onClick={handleMakeImportant}
          onKeyDown={(e) => e.key === 'Enter' && handleMakeImportant()}
          tabIndex={4}
          role="button"
          aria-label={todo.isImportant ? "Убрать из избранного" : "Добавить в избранное"}
        />
      </div>

      <Form onSubmit={handleSubmit}>
        <h3>Редактирование</h3>
        {showWarning && (
          <p className="warning-text">Поле не должно быть пустым</p>
        )}
        <textarea
          value={formData.task}
          onChange={(e) => setFormData({ task: e.target.value })}
          onKeyDown={handleKeyDown}
          placeholder={todo.task}
          className="textarea-edit"
          maxLength={120}
          name="editTodoTextarea"
          tabIndex={1}
          autoFocus
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