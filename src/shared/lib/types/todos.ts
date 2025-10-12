export interface Todo {
  id: string;
  task: string;
  isCompleted: boolean;
  isImportant: boolean;
  isDeleted?: boolean;
}

export interface TodoFormData {
  task: string;
}

export interface TodoActions {
  onToggle: (id: string) => void;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onMakeImportant: (id: string) => void;
  onRestore?: (id: string) => void;
  onPermanentlyDelete?: (id: string) => void;
}

export interface TodoOperations {
  onCreate: (todo: Omit<Todo, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Todo>) => void;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
  onPermanentlyDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onMakeImportant: (id: string) => void;
  onDeleteAll: () => void;
  onRestoreAll: () => void;
  onDeleteAllPermanently: () => void;
  onCompleteAll: () => void;
  onSwitchAllImportance: (makeImportant: boolean) => void;
}