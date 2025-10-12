import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as regularBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBookmark as solidBookmark, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { useWindowWidth } from '@/shared/lib/hooks/useWindowWidth';
import { useSwipeGesture } from '@/shared/lib/hooks/useSwipeGesture';
import { Todo as TodoType, TodoActions } from '@/shared/lib/types/todos';

interface TodoProps extends TodoType, Omit<TodoActions, 'onRestore' | 'onPermanentlyDelete'> {
  className?: string;
}

export const Todo: React.FC<TodoProps> = ({
  id,
  task,
  isCompleted,
  isImportant,
  onToggle,
  onEdit,
  onDelete,
  onMakeImportant,
  className = ''
}) => {
  const windowWidth = useWindowWidth();
  const isMobile = windowWidth <= 492;

  const swipeGestures = useSwipeGesture({
    onSwipe: () => onDelete(id),
    onTap: isMobile ? () => onEdit(id) : undefined
  });

  const checkboxId = `todo-checkbox-${id}`;

  const handleToggle = () => onToggle(id);
  const handleEdit = () => onEdit(id);
  const handleDelete = () => onDelete(id);
  const handleMakeImportant = () => onMakeImportant(id);

  const renderTodoContent = () => {
    if (isMobile) {
      return (
        <div className={`todo ${className}`}>
          <div className="todo-checkbox">
            <FontAwesomeIcon
              icon={isImportant ? solidBookmark : regularBookmark}
              onClick={handleMakeImportant}
              className={isImportant ? 'important bookmark' : 'bookmark'}
              aria-label={isImportant ? `Убрать из избранного: ${task}` : `Добавить в избранное: ${task}`}
              title={isImportant ? "Убрать из избранного" : "Добавить в избранное"}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleMakeImportant();
                }
              }}
            />
            <label htmlFor={checkboxId} onClick={handleEdit}>
              {task}
            </label>
          </div>
          <div className="todo-checkbox">
            <input
              id={checkboxId}
              type="checkbox"
              checked={isCompleted}
              onChange={handleToggle}
              aria-label={isCompleted ? `Отметить как невыполненную: ${task}` : `Отметить как выполненную: ${task}`}
              title={isCompleted ? "Отметить как невыполненную" : "Отметить как выполненную"}
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
            onChange={handleToggle}
            aria-label={isCompleted ? `Отметить как невыполненную: ${task}` : `Отметить как выполненную: ${task}`}
            title={isCompleted ? "Отметить как невыполненную" : "Отметить как выполненную"}
          />
          <label htmlFor={checkboxId}>{task}</label>
        </div>
        <div className="todo-buttons">
          <FontAwesomeIcon
            icon={isImportant ? solidBookmark : regularBookmark}
            onClick={handleMakeImportant}
            className={isImportant ? 'important bookmark' : 'bookmark'}
            aria-label={isImportant ? `Убрать из избранного: ${task}` : `Добавить в избранное: ${task}`}
            title={isImportant ? "Убрать из избранного" : "Добавить в избранное"}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleMakeImportant();
              }
            }}
          />
          <FontAwesomeIcon
            icon={faPen}
            onClick={handleEdit}
            className="pen"
            aria-label={`Редактировать задачу: ${task}`}
            title="Редактировать"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleEdit();
              }
            }}
          />
          <FontAwesomeIcon
            icon={faTrashCan}
            onClick={handleDelete}
            className="trash-can"
            aria-label={`Удалить задачу: ${task}`}
            title="Удалить"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleDelete();
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
        aria-label={`Задача: ${task}`}
      >
        {renderTodoContent()}
      </div>
    );
  }

  return (
    <div role="article" aria-label={`Задача: ${task}`}>
      {renderTodoContent()}
    </div>
  );
};