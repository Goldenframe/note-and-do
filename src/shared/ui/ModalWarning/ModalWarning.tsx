import React, { useEffect } from 'react';
import { ModalContent } from '../Modal/ModalContent';

interface ModalWarningProps {
  message: string;
  reason: string;
  onClose: () => void;
}

export const ModalWarning: React.FC<ModalWarningProps> = ({
  message,
  reason,
  onClose
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Enter') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <ModalContent onClose={onClose} title={message}>
      <p className="modal-warning-text">{reason}</p>
    </ModalContent>
  );
};