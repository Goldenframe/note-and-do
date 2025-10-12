import React from 'react';
import { Todo } from '@/entities/todos';
import { DeletedTodo } from '@/entities/todos';
import { Todo as TodoType } from '@/shared/lib/types/todos';

type TodoCategory = 'Все' | 'Избранное' | 'Не выполнено' | 'Выполнено' | 'Корзина';

interface TodoListProps {
  category: TodoCategory;
  todos: TodoType[];
  deletedTodos: TodoType[];
  onEditTodo: (id: string) => void;
  onDeleteTodo: (id: string) => void;
  onToggleTodo: (id: string) => void;
  onMakeImportant: (id: string) => void;
  onRestoreTodo: (id: string) => void;
  onPermanentlyDeleteTodo: (id: string) => void;
}

export const TodoList: React.FC<TodoListProps> = ({
  category,
  todos,
  deletedTodos,
  onEditTodo,
  onDeleteTodo,
  onToggleTodo,
  onMakeImportant,
  onRestoreTodo,
  onPermanentlyDeleteTodo
}) => {
  const getFilteredTodos = (): TodoType[] => {
    switch (category) {
      case 'Избранное':
        return todos.filter(todo => todo.isImportant);
      case 'Не выполнено':
        return todos.filter(todo => !todo.isCompleted);
      case 'Выполнено':
        return todos.filter(todo => todo.isCompleted);
      case 'Корзина':
        return deletedTodos;
      default:
        return todos;
    }
  };

  const currentTodos = getFilteredTodos();
  const isEmpty = currentTodos.length === 0;

  if (isEmpty) {
    return (
      <div className="empty-list">
        <p>Список пуст</p>
      </div>
    );
  }

  const renderTodo = (todo: TodoType) => {
    if (category === 'Корзина') {
      return (
        <DeletedTodo
          key={todo.id}
          {...todo}
          onRestore={onRestoreTodo}
          onPermanentlyDelete={onPermanentlyDeleteTodo}
          onToggle={onToggleTodo}
        />
      );
    } else {
      return (
        <Todo
          key={todo.id}
          {...todo}
          onEdit={onEditTodo}
          onDelete={onDeleteTodo}
          onToggle={onToggleTodo}
          onMakeImportant={onMakeImportant}
        />
      );
    }
  };

  return (
    <>
      {currentTodos.map(renderTodo)}
      {category !== 'Все' && category !== 'Корзина' && <hr />}
    </>
  );
};