import { useState, useCallback } from 'react';
import { useModal } from '@/shared/lib/hooks/useModal';
import { Todo as TodoType } from '@/shared/lib/types/todos';

type TodoModalType = 
  | 'add' 
  | 'edit' 
  | 'delete' 
  | 'deletePermanently' 
  | 'deleteAll' 
  | 'deleteAllPermanently' 
  | 'restoreAll'
  | 'completeAll'
  | 'switchImportance'
  | 'warning';

export const useTodoModals = () => {
  const {
    openModal,
    closeModal,
    openModalOptions,
    showOptions,
    setShowOptions,
    showModal,
    showModalWarning,
    modalMessage,
    modalReason,
    currentModal,
    setCurrentModal
  } = useModal();

  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [switchImportantMode, setSwitchImportantMode] = useState<boolean>(true);

  const openTodoModal = useCallback((modalType: TodoModalType, todoId?: string, makeImportant?: boolean) => {
    setCurrentModal(modalType);
    if (todoId) {
      setSelectedTodoId(todoId);
    }
    if (makeImportant !== undefined) {
      setSwitchImportantMode(makeImportant);
    }
    openModal();
  }, [openModal, setCurrentModal]);

  const validateAction = useCallback((
    items: TodoType[],
    errorMessage: string,
    errorReason: string
  ): boolean => {
    if (items.length === 0) {
      openModalOptions(items, errorMessage, errorReason); 
      return false;
    }
    return true;
  }, [openModalOptions]);

  return {
    // Modal state
    showModal,
    showOptions,
    showModalWarning,
    currentModal,
    selectedTodoId,
    switchImportantMode,
    modalMessage,
    modalReason,
    
    // Modal actions
    openTodoModal,
    closeModal,
    setShowOptions,
    validateAction
  };
};