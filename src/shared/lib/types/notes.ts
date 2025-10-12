export interface Note {
  id: string;
  text: string;
  theme: string;
  timestampMonth: string;
  timestampTime: string;
  isDeleted?: boolean;
}

export interface NoteFormData {
  theme: string;
  text: string;
}

export interface NoteActions {
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onRestore?: (id: string) => void;
  onPermanentlyDelete?: (id: string) => void;
}

export interface NoteOperations {
  onCreate: (note: Omit<Note, 'id'>) => void;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onDelete: (id: string) => void;
  onRestore: (id: string) => void;
  onPermanentlyDelete: (id: string) => void;
  onDeleteAll: () => void;
  onRestoreAll: () => void;
  onDeleteAllPermanently: () => void;
}

export interface ModalProps {
  onClose: () => void;
  className?: string;
}