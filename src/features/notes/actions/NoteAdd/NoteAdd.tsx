import React, { useState } from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';
import { getCurrentTimestamp } from '@/shared/lib/utils/date';
import { Note, NoteFormData } from '@/shared/lib/types/notes';

interface NoteAddProps {
  onCreate: (note: Omit<Note, 'id'>) => void;
  onClose: () => void;
}

export const NoteAdd: React.FC<NoteAddProps> = ({ onCreate, onClose }) => {
  const [formData, setFormData] = useState<NoteFormData>({
    theme: '',
    text: ''
  });
  const [showWarning, setShowWarning] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.text.trim() === '') {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    const { timestampMonth, timestampTime } = getCurrentTimestamp();
    
    onCreate({
      theme: formData.theme.toUpperCase(),
      text: formData.text,
      timestampMonth,
      timestampTime,
    });

    setFormData({ theme: '', text: '' });
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(e);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleInputChange = (field: keyof NoteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ModalContent 
      onClose={onClose} 
      className="note-modal"
      title="Добавить заметку"
    >
      {showWarning && (
        <p className="warning-text">
          Чтобы добавить заметку, необходимо заполнить поле
        </p>
      )}
      
      <Form onSubmit={handleSubmit}>
        <input
          value={formData.theme}
          placeholder="Введите тему"
          onChange={(e) => handleInputChange('theme', e.target.value)}
          onKeyDown={handleKeyDown}
          name="addNoteInput"
          autoFocus
          tabIndex={1}
        />
        <textarea
          value={formData.text}
          placeholder="Введите заметку..."
          onChange={(e) => handleInputChange('text', e.target.value)}
          onKeyDown={handleKeyDown}
          tabIndex={2}
          name="addNoteTextarea"
        />
        <button type="submit" className="add-modal-button" tabIndex={3}>
          добавить
        </button>
      </Form>
    </ModalContent>
  );
};