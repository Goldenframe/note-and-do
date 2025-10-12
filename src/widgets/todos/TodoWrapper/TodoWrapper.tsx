import React, { useState, useCallback, useMemo } from 'react';
import { useTodos } from '@/features/todos/hooks/useTodos';
import { useTodoModals } from '@/features/todos/hooks/useTodoModals';
import { TodoHeader } from '../components/TodoHeader/TodoHeader';
import { TodoList } from '../components/TodoList/TodoList';
import { TodoModals } from '../components/TodoModals/TodoModals';

type TodoCategory = 'Все' | 'Избранное' | 'Не выполнено' | 'Выполнено' | 'Корзина';

export const TodoWrapper: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<TodoCategory>('Все');
  const [switchImportantButton, setSwitchImportantButton] = useState('Отметить все "Избранное"');

  const {
    todos,
    deletedTodos,
    createTodo,
    updateTodo,
    toggleTodo,
    makeImportant,
    deleteTodo,
    restoreTodo,
    permanentlyDeleteTodo,
    deleteAllTodos,
    restoreAllTodos,
    deleteAllPermanently,
    completeAllTodos,
    switchAllImportance
  } = useTodos();

  const {
    showModal,
    showOptions,
    currentModal,
    selectedTodoId,
    switchImportantMode,
    modalMessage,
    modalReason,
    openTodoModal,
    closeModal,
    setShowOptions,
    validateAction
  } = useTodoModals();

  const handleAddTodo = useCallback(() => {
    openTodoModal('add');
  }, [openTodoModal]);

  const handleEditTodo = useCallback((id: string) => {
    openTodoModal('edit', id);
  }, [openTodoModal]);

  const handleDeleteTodo = useCallback((id: string) => {
    openTodoModal('delete', id);
  }, [openTodoModal]);

  const handlePermanentlyDeleteTodo = useCallback((id: string) => {
    openTodoModal('deletePermanently', id);
  }, [openTodoModal]);

  const handleToggleTodo = useCallback((id: string) => {
    toggleTodo(id);
  }, [toggleTodo]);

  const handleMakeImportant = useCallback((id: string) => {
    makeImportant(id);
  }, [makeImportant]);

  const handleRestoreTodo = useCallback((id: string) => {
    restoreTodo(id);
  }, [restoreTodo]);

  const handleRestoreAllTodos = useCallback(() => {
    if (validateAction(
      deletedTodos,
      'Невозможно восстановить список',
      'Вы не можете восстановить список, так как у вас не удалена ни одна задача'
    )) {
      openTodoModal('restoreAll');
    }
  }, [deletedTodos, validateAction, openTodoModal]);

  const handleDeleteAllTodos = useCallback(() => {
    if (validateAction(
      todos,
      'Невозможно очистить список',
      'Вы не можете очистить список, так как у вас нет ни одной задачи'
    )) {
      openTodoModal('deleteAll');
    }
  }, [todos, validateAction, openTodoModal]);

  const handlePermanentlyDeleteAllTodos = useCallback(() => {
    if (validateAction(
      deletedTodos,
      'Невозможно очистить список',
      'Вы не можете очистить список, так как у вас не удалена ни одна задача'
    )) {
      openTodoModal('deleteAllPermanently');
    }
  }, [deletedTodos, validateAction, openTodoModal]);

  const handleCompleteAllTodos = useCallback(() => {
    if (validateAction(
      todos,
      'Невозможно отметить задачи',
      'Вы не можете поставить метки, так как у вас нет ни одной задачи'
    )) {
      openTodoModal('completeAll');
    }
  }, [todos, validateAction, openTodoModal]);

  const handleSwitchImportant = useCallback(() => {
    if (validateAction(
      todos,
      'Невозможно отметить задачи',
      'Вы не можете поставить метки, так как у вас нет ни одной задачи'
    )) {
      const makeImportant = switchImportantButton === 'Отметить все "Избранное"';
      openTodoModal('switchImportance', undefined, makeImportant);
    }
  }, [todos, switchImportantButton, validateAction, openTodoModal]);

  const handleShowOptions = useCallback(() => {
    setShowOptions(prev => !prev);
    setTimeout(() => setShowOptions(false), 5000);
  }, [setShowOptions]);

  const handleSwitchAllImportance = useCallback((makeImportant: boolean) => {
    switchAllImportance(makeImportant);
    setSwitchImportantButton(makeImportant
      ? 'Снять метки "Избранное"'
      : 'Отметить все "Избранное"'
    );
  }, [switchAllImportance]);

  const todosCount = useMemo(() => {
    switch (selectedCategory) {
      case 'Избранное':
        return todos.filter(todo => todo.isImportant).length;
      case 'Не выполнено':
        return todos.filter(todo => !todo.isCompleted).length;
      case 'Выполнено':
        return todos.filter(todo => todo.isCompleted).length;
      case 'Корзина':
        return deletedTodos.length;
      default:
        return todos.length;
    }
  }, [selectedCategory, todos, deletedTodos]);

  const selectedTodo = useMemo(() => {
    if (!selectedTodoId) return null;

    const source = currentModal === 'deletePermanently' ? deletedTodos : todos;
    return source.find(todo => todo.id === selectedTodoId) || null;
  }, [selectedTodoId, currentModal, todos, deletedTodos]);

  return (
    <div className="wrapper">
      <TodoHeader
        selectedCategory={selectedCategory}
        todosCount={todosCount}
        showOptions={showOptions}
        switchImportantButton={switchImportantButton}
        onCategoryChange={setSelectedCategory}
        onShowOptions={handleShowOptions}
        onAddTodo={handleAddTodo}
        onSwitchImportant={handleSwitchImportant}
        onCompleteAll={handleCompleteAllTodos}
        onDeleteAll={handleDeleteAllTodos}
        onRestoreAll={handleRestoreAllTodos}
        onPermanentlyDeleteAll={handlePermanentlyDeleteAllTodos}
      />

      <TodoList
        category={selectedCategory}
        todos={todos}
        deletedTodos={deletedTodos}
        onEditTodo={handleEditTodo}
        onDeleteTodo={handleDeleteTodo}
        onToggleTodo={handleToggleTodo}
        onMakeImportant={handleMakeImportant}
        onRestoreTodo={handleRestoreTodo}
        onPermanentlyDeleteTodo={handlePermanentlyDeleteTodo}
      />

      {showModal && (
        <div
          className="modal-overlay"
          onMouseDown={closeModal}
          role="button"
          aria-label="Закрыть модальное окно"
          title="Закрыть модальное окно"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') {
              e.preventDefault();
              closeModal();
            }
          }}
        />
      )}

      {showModal && (
        <TodoModals
          currentModal={currentModal}
          selectedTodo={selectedTodo}
          switchImportantMode={switchImportantMode}
          modalMessage={modalMessage}
          modalReason={modalReason}
          onCreateTodo={createTodo}
          onUpdateTodo={updateTodo}
          onDeleteTodo={deleteTodo}
          onPermanentlyDeleteTodo={permanentlyDeleteTodo}
          onMakeImportant={handleMakeImportant}
          onDeleteAllTodos={deleteAllTodos}
          onRestoreAllTodos={restoreAllTodos}
          onDeleteAllPermanently={deleteAllPermanently}
          onCompleteAllTodos={completeAllTodos}
          onSwitchAllImportance={handleSwitchAllImportance}
          onCloseModal={closeModal}
        />
      )}
    </div>
  );
};