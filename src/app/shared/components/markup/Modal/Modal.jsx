import React from 'react';
import { PropTypes } from 'prop-types';
import './Modal.scss';

const Modal = ({
  title, text, textConfirm, textAbort, closeBtnClasses, confirmBtnClasses, onClose, onConfirm,
}) => (
  <div className="modal-page">
    <div className="modal-page__content">
      <h1 className="modal-page__header">
        {title}
      </h1>
      <div className="modal-page__body">
        {text}
      </div>
      <div className="modal-page__buttons">
        <button type="button" className={`button button--solid ${closeBtnClasses}`} onClick={onClose}>
          {textAbort}
        </button>
        <button type="button" className={`button button--solid ${confirmBtnClasses}`} onClick={onConfirm}>
          {textConfirm}
        </button>
      </div>
    </div>
  </div>
);

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textConfirm: PropTypes.string.isRequired,
  textAbort: PropTypes.string.isRequired,
  closeBtnClasses: PropTypes.string,
  confirmBtnClasses: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

Modal.defaultProps = {
  closeBtnClasses: '',
  confirmBtnClasses: '',
};

export default Modal;
