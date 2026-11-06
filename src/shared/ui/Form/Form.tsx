import React from 'react';

interface FormProps {
  onSubmit: (e: React.FormEvent) => void;
  onKeyDown?: React.KeyboardEventHandler<HTMLFormElement>;
  children: React.ReactNode;
  className?: string;
}

export const Form: React.FC<FormProps> = ({ onSubmit, onKeyDown, children, className = '' }) => {
  return (
    <form onSubmit={onSubmit} onKeyDown={onKeyDown} className={className}>
      {children}
    </form>
  );
};