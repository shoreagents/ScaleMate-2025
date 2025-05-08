import { FC } from 'react';

interface CoursesAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAuthSuccess: () => void;
}

export const CoursesAuthModal: FC<CoursesAuthModalProps>; 