import { useState, useCallback } from 'react';

type ModalType = 
  | 'add' 
  | 'edit' 
  | 'delete' 
  | 'deletePermanently' 
  | 'deleteAll' 
  | 'deleteAllPermanently' 
  | 'restoreAll'
  | 'completeAll'
  | 'switchImportance'
  | 'warning'
  | null;

export const useModal = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalWarning, setShowModalWarning] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalReason, setModalReason] = useState('');
  const [currentModal, setCurrentModal] = useState<ModalType>(null);

  const openModal = useCallback(() => {
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setShowModalWarning(false);
    setCurrentModal(null);
  }, []);

  const openModalOptions = useCallback((
    items: unknown[],
    errorMessage: string,
    errorReason: string
  ): boolean => {
    if (items.length === 0) {
      setModalMessage(errorMessage);
      setModalReason(errorReason);
      setShowModalWarning(true);
      setCurrentModal('warning');
      openModal();
      return false;
    }
    return true;
  }, [openModal]);

  return {
    // State
    showOptions,
    showModal,
    showModalWarning,
    modalMessage,
    modalReason,
    currentModal,
    
    // Actions
    openModal,
    closeModal,
    openModalOptions,
    setShowOptions,
    setCurrentModal
  };
};