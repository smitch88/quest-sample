// components/Modal.tsx
import React from 'react';
import './BaseModal.styles.css';

export interface ModalProps {
  children: React.ReactNode;
  isOpen: boolean;
  onClose?: () => void;
  className?: string;
  isPopup?: boolean;
}

const Modal: React.FC<ModalProps> = ({ children, isOpen, onClose, isPopup=true, className = ''}) => {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center ${isPopup ? 'bg-black bg-opacity-50' : ''} z-30`}>
      <div className={`relative ${className}`}>

        <div className="relative bg-white shadow-lg w-full h-full p-6 highlight-border z-40 flex justify-center items-center">
          {isPopup && (
            <button
            className="absolute top-3 right-3 text-2xl font-semibold text-gray-500 hover:text-gray-700"
            onClick={onClose}
          >
            &times;
          </button>)}
          <div className="relative">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
