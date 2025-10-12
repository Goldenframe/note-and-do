import React from 'react';
import { ModalContent } from '@/shared/ui/Modal/ModalContent';
import { Form } from '@/shared/ui/Form/Form';

interface TodoSwitchImportanceProps {
  makeImportant: boolean;
  onSwitchAllImportance: (makeImportant: boolean) => void;
  onClose: () => void;
}

export const TodoSwitchImportance: React.FC<TodoSwitchImportanceProps> = ({
  makeImportant,
  onSwitchAllImportance,
  onClose
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSwitchAllImportance(makeImportant);
    onClose();
  };

  const title = makeImportant 
    ? 'Отметить все "Избранное"' 
    : 'Снять метки "Избранное"';

  const description = makeImportant
    ? "Все задачи будут отмечены 'Избранное'"
    : "Метка 'Избранное' будет снята со всех задач";

  return (
    <ModalContent onClose={onClose} title={title}>
      <p>{description}</p>
      <Form onSubmit={handleSubmit}>
        <div className="answer-buttons">
          <button type="submit">да</button>
          <button type="button" onClick={onClose}>нет</button>
        </div>
      </Form>
    </ModalContent>
  );
};