import { useState, useCallback } from 'react';
import { Todo as TodoType } from '@/shared/lib/types/todos';

export const useTodos = () => {
  const [todos, setTodos] = useState<TodoType[]>([]);
  const [deletedTodos, setDeletedTodos] = useState<TodoType[]>([]);

  const createTodo = useCallback((todoData: Omit<TodoType, 'id'>) => {
    const newTodo: TodoType = {
      ...todoData,
      id: Date.now().toString()
    };
    setTodos(prev => [...prev, newTodo]);
  }, []);

  const updateTodo = useCallback((id: string, updates: Partial<TodoType>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  }, []);

  const makeImportant = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo
    ));
  }, []);

  const deleteTodo = useCallback((id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (todoToDelete) {
      setDeletedTodos(prev => [...prev, todoToDelete]);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      
      setTimeout(() => {
        setDeletedTodos(prev => prev.filter(todo => todo.id !== id));
      }, 300000);
    }
  }, [todos]);

  const restoreTodo = useCallback((id: string) => {
    const todoToRestore = deletedTodos.find(todo => todo.id === id);
    if (todoToRestore) {
      setTodos(prev => [...prev, todoToRestore]);
      setDeletedTodos(prev => prev.filter(todo => todo.id !== id));
    }
  }, [deletedTodos]);

  const permanentlyDeleteTodo = useCallback((id: string) => {
    setDeletedTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const deleteAllTodos = useCallback(() => {
    setDeletedTodos(prev => [...prev, ...todos]);
    setTodos([]);
    
    setTimeout(() => {
      setDeletedTodos([]);
    }, 10000);
  }, [todos]);

  const restoreAllTodos = useCallback(() => {
    setTodos(prev => [...prev, ...deletedTodos]);
    setDeletedTodos([]);
  }, [deletedTodos]);

  const deleteAllPermanently = useCallback(() => {
    setDeletedTodos([]);
  }, []);

  const completeAllTodos = useCallback(() => {
    setTodos(prev => prev.map(todo => ({ ...todo, isCompleted: true })));
  }, []);

  const switchAllImportance = useCallback((makeImportant: boolean) => {
    setTodos(prev => prev.map(todo => ({ ...todo, isImportant: makeImportant })));
  }, []);

  return {
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
  };
};