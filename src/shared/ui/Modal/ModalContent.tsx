import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface ModalContentProps {
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const ModalContent: React.FC<ModalContentProps> = ({
  onClose,
  children,
  className = '',
  title
}) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  return (
    <div className={`modal-content ${className}`} onKeyDown={handleKeyDown}>
      <FontAwesomeIcon
        className="modal-xmark"
        icon={faXmark}
        onClick={onClose}
        tabIndex={0}
        role="button"
        aria-label="Закрыть модальное окно"
      />
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
};