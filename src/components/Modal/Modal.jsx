import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ModalWindow, Overlay } from './Modal.styled';

export default function Modal({ onClick, src, alt }) {
  window.addEventListener('keydown', closeModal);
  useEffect(() => {
    const closeModal = event => {
      if (event.code === 'Escape') {
        onClick();
      }
    };
    window.addEventListener('keydown', closeModal);

    return () => {
      window.removeEventListener('keydown', closeModal);
    };
  }, [onClick]);

  function closeModal(event) {
    if (event.target === event.currentTarget) {
      onClick();
    }
  }
  return (
    <Overlay onClick={closeModal}>
      <ModalWindow>
        <img src={src} alt={alt} width="800" height="600" />
      </ModalWindow>
    </Overlay>
  );
}

Modal.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
