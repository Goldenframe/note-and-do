import React, { useState, useEffect } from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';
import { Note, NoteFormData } from '@/shared/lib/types/notes';

interface NoteEditProps {
  note: Note;
  onUpdate: (id: string, updates: Partial<Note>) => void;
  onClose: () => void;
}

export const NoteEdit: React.FC<NoteEditProps> = ({ note, onUpdate, onClose }) => {
  const [formData, setFormData] = useState<NoteFormData>({
    theme: note.theme,
    text: note.text
  });
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    setFormData({
      theme: note.theme,
      text: note.text
    });
  }, [note]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.text.trim() === '') {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 3000);
      return;
    }

    onUpdate(note.id, {
      theme: formData.theme,
      text: formData.text
    });
    onClose();
  };

  const handleInputChange = (field: keyof NoteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ModalContent onClose={onClose} className="note-modal">
      <Form onSubmit={handleSubmit}>
        <h3>Редактирование</h3>
        {showWarning && (
          <p className="warning-text">Поле не должно быть пустым</p>
        )}
        <input
          value={formData.theme}
          placeholder={note.theme || "Добавьте тему заметки"}
          onChange={(e) => handleInputChange('theme', e.target.value)}
          name="editNoteInput"
        />
        <textarea
          value={formData.text}
          placeholder={note.text}
          onChange={(e) => handleInputChange('text', e.target.value)}
          name="editNoteTextarea"
        />
        <div className="answer-buttons">
          <button type="submit">да</button>
          <button type="button" onClick={onClose}>
            нет
          </button>
        </div>
      </Form>
    </ModalContent>
  );
};