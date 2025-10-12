import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useWindowWidth } from '@/shared/lib/hooks/useWindowWidth';
import { useSwipeGesture } from '@/shared/lib/hooks/useSwipeGesture';
import { Todo as TodoType, TodoActions } from '@/shared/lib/types/todos';

interface DeletedTodoProps extends TodoType, Required<Pick<TodoActions, 'onRestore' | 'onPermanentlyDelete'>> {
  className?: string;
  onToggle: (id: string) => void;
}

export const DeletedTodo: React.FC<DeletedTodoProps> = ({
  id,
  task,
  isCompleted,
  onRestore,
  onPermanentlyDelete,
  onToggle,
  className = ''
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 492;

  const swipeGestures = useSwipeGesture({
    onSwipe: () => onPermanentlyDelete(id)
  });

  // Генерация уникальных ID для доступности
  const checkboxId = `deleted-todo-checkbox-${id}`;

  const handleRestore = () => onRestore(id);
  const handlePermanentlyDelete = () => onPermanentlyDelete(id);
  const handleToggle = () => onToggle(id);

  const renderTodoContent = () => {
    if (isMobile) {
      return (
        <div className={`todo ${className}`}>
          <div className="todo-checkbox">
            <FontAwesomeIcon
              className="rotate-left"
              onClick={handleRestore}
              icon={faRotateLeft}
              aria-label={`Восстановить задачу: ${task}`}
              title="Восстановить задачу"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleRestore();
                }
              }}
            />
            <label htmlFor={checkboxId}>{task}</label>
          </div>
          <div className="todo-checkbox">
            <input
              id={checkboxId}
              type="checkbox"
              checked={isCompleted}
              onChange={handleToggle}
              aria-label={isCompleted ? `Задача выполнена: ${task}` : `Задача не выполнена: ${task}`}
              title={isCompleted ? "Задача выполнена" : "Задача не выполнена"}
            />
          </div>
        </div>
      );
    }

    return (
      <div className={`todo ${className}`}>
        <div className="todo-checkbox">
          <input 
            id={checkboxId}
            type="checkbox" 
            checked={isCompleted} 
            readOnly 
            aria-label={isCompleted ? `Задача выполнена: ${task}` : `Задача не выполнена: ${task}`}
            title={isCompleted ? "Задача выполнена" : "Задача не выполнена"}
          />
          <label htmlFor={checkboxId}>{task}</label>
        </div>
        <div className="todo-buttons">
          <FontAwesomeIcon
            className="rotate-left"
            onClick={handleRestore}
            icon={faRotateLeft}
            aria-label={`Восстановить задачу: ${task}`}
            title="Восстановить задачу"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRestore();
              }
            }}
          />
          <FontAwesomeIcon
            className="trash-can"
            onClick={handlePermanentlyDelete}
            icon={faTrashCan}
            aria-label={`Удалить задачу навсегда: ${task}`}
            title="Удалить навсегда"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePermanentlyDelete();
              }
            }}
          />
        </div>
      </div>
    );
  };

  if (isMobile) {
    return (
      <div 
        {...swipeGestures}
        role="article"
        aria-label={`Удаленная задача: ${task}`}
      >
        {renderTodoContent()}
      </div>
    );
  }

  return (
    <div role="article" aria-label={`Удаленная задача: ${task}`}>
      {renderTodoContent()}
    </div>
  );
};