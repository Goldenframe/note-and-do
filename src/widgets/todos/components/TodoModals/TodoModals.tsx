import React from 'react';
import {
  TodoAdd,
  TodoEdit,
  TodoDelete,
  TodoDeletePermanently,
  TodoRestoreAll,
  TodoDeleteAll,
  TodoDeleteAllPermanently,
  TodoCompleteAll,
  TodoSwitchImportance
} from '@/features/todos/actions';
import { ModalWarning } from '@/shared/ui/ModalWarning/ModalWarning';
import { Todo as TodoType } from '@/shared/lib/types/todos';

interface TodoModalsProps {
  currentModal: string | null;
  selectedTodo: TodoType | null;
  switchImportantMode: boolean;
  modalMessage: string;
  modalReason: string;
  onCreateTodo: (todoData: Omit<TodoType, 'id'>) => void;
  onUpdateTodo: (id: string, updates: Partial<TodoType>) => void;
  onDeleteTodo: (id: string) => void;
  onPermanentlyDeleteTodo: (id: string) => void;
  onMakeImportant: (id: string) => void;
  onDeleteAllTodos: () => void;
  onRestoreAllTodos: () => void;
  onDeleteAllPermanently: () => void;
  onCompleteAllTodos: () => void;
  onSwitchAllImportance: (makeImportant: boolean) => void;
  onCloseModal: () => void;
}

export const TodoModals: React.FC<TodoModalsProps> = ({
  currentModal,
  selectedTodo,
  switchImportantMode,
  modalMessage,
  modalReason,
  onCreateTodo,
  onUpdateTodo,
  onDeleteTodo,
  onPermanentlyDeleteTodo,
  onMakeImportant,
  onDeleteAllTodos,
  onRestoreAllTodos,
  onDeleteAllPermanently,
  onCompleteAllTodos,
  onSwitchAllImportance,
  onCloseModal
}) => {
  if (!currentModal) return null;

  switch (currentModal) {
    case 'add':
      return <TodoAdd onCreate={onCreateTodo} onClose={onCloseModal} />;
    
    case 'edit':
      return selectedTodo ? (
        <TodoEdit 
          todo={selectedTodo} 
          onUpdate={onUpdateTodo} 
          onMakeImportant={onMakeImportant}
          onClose={onCloseModal} 
        />
      ) : null;
    
    case 'delete':
      return selectedTodo ? (
        <TodoDelete 
          todo={selectedTodo} 
          onDelete={onDeleteTodo} 
          onClose={onCloseModal} 
        />
      ) : null;
    
    case 'deletePermanently':
      return selectedTodo ? (
        <TodoDeletePermanently 
          todo={selectedTodo} 
          onPermanentlyDelete={onPermanentlyDeleteTodo} 
          onClose={onCloseModal} 
        />
      ) : null;
    
    case 'deleteAll':
      return <TodoDeleteAll onDeleteAll={onDeleteAllTodos} onClose={onCloseModal} />;
    
    case 'deleteAllPermanently':
      return <TodoDeleteAllPermanently onDeleteAllPermanently={onDeleteAllPermanently} onClose={onCloseModal} />;
    
    case 'restoreAll':
      return <TodoRestoreAll onRestoreAll={onRestoreAllTodos} onClose={onCloseModal} />;
    
    case 'completeAll':
      return <TodoCompleteAll onCompleteAll={onCompleteAllTodos} onClose={onCloseModal} />;
    
    case 'switchImportance':
      return (
        <TodoSwitchImportance 
          makeImportant={switchImportantMode}
          onSwitchAllImportance={onSwitchAllImportance}
          onClose={onCloseModal} 
        />
      );
    
    case 'warning':
      return <ModalWarning message={modalMessage} reason={modalReason} onClose={onCloseModal} />;
    
    default:
      return null;
  }
};