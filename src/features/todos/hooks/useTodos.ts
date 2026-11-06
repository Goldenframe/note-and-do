import { atom, useAtom } from 'jotai';
import { atomWithStorage } from 'jotai/utils';
import { useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import type { Todo as TodoType } from '@/shared/lib/types/todos';

const todosAtom = atomWithStorage<TodoType[]>('dlist:todos', [], undefined, { getOnInit: true });
const deletedTodosAtom = atom<TodoType[]>([]);

export const useTodos = () => {
  const [todos, setTodos] = useAtom(todosAtom);
  const [deletedTodos, setDeletedTodos] = useAtom(deletedTodosAtom);

  const createTodo = useCallback((todoData: Omit<TodoType, 'id'>) => {
    const newTodo: TodoType = {
      ...todoData,
      id: uuid()
    };
    setTodos(prev => [...prev, newTodo]);
  }, [setTodos]);

  const updateTodo = useCallback((id: string, updates: Partial<TodoType>) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, ...updates } : todo
    ));
  }, [setTodos]);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  }, [setTodos]);

  const makeImportant = useCallback((id: string) => {
    setTodos(prev => prev.map(todo =>
      todo.id === id ? { ...todo, isImportant: !todo.isImportant } : todo
    ));
  }, [setTodos]);

  const deleteTodo = useCallback((id: string) => {
    const todoToDelete = todos.find(todo => todo.id === id);
    if (todoToDelete) {
      const trashedItem = { ...todoToDelete };
      setDeletedTodos(prev => [...prev, trashedItem]);
      setTodos(prev => prev.filter(todo => todo.id !== id));
      
      setTimeout(() => {
        setDeletedTodos(prev => prev.filter(todo => todo !== trashedItem));
      }, 300000);
    }
  }, [todos, setTodos, setDeletedTodos]);

  const restoreTodo = useCallback((id: string) => {
    const todoToRestore = deletedTodos.find(todo => todo.id === id);
    if (todoToRestore) {
      setTodos(prev => [...prev, todoToRestore]);
      setDeletedTodos(prev => prev.filter(todo => todo.id !== id));
    }
  }, [deletedTodos, setTodos, setDeletedTodos]);

  const permanentlyDeleteTodo = useCallback((id: string) => {
    setDeletedTodos(prev => prev.filter(todo => todo.id !== id));
  }, [setDeletedTodos]);

  const deleteAllTodos = useCallback(() => {
    const trashedItems = todos.map(todo => ({ ...todo }));
    setDeletedTodos(prev => [...prev, ...trashedItems]);
    setTodos([]);
    
    setTimeout(() => {
      setDeletedTodos(prev => prev.filter(todo => !trashedItems.includes(todo)));
    }, 10000);
  }, [todos, setTodos, setDeletedTodos]);

  const restoreAllTodos = useCallback(() => {
    setTodos(prev => [...prev, ...deletedTodos]);
    setDeletedTodos([]);
  }, [deletedTodos, setTodos, setDeletedTodos]);

  const deleteAllPermanently = useCallback(() => {
    setDeletedTodos([]);
  }, [setDeletedTodos]);

  const completeAllTodos = useCallback(() => {
    setTodos(prev => prev.map(todo => ({ ...todo, isCompleted: true })));
  }, [setTodos]);

  const switchAllImportance = useCallback((makeImportant: boolean) => {
    setTodos(prev => prev.map(todo => ({ ...todo, isImportant: makeImportant })));
  }, [setTodos]);

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