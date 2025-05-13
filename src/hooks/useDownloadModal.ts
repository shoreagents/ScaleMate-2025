import { useState, useCallback } from 'react';

export const useDownloadModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = useCallback((callback?: () => void) => {
    setIsOpen(true);
    if (callback) {
      callback();
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    openModal,
    closeModal
  };
}; 