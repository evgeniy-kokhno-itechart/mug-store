import React from 'react';
import { PropTypes } from 'prop-types';

const Modal = ({
  id, buttonLabel, buttonClasses, title, text, textConfirm, textAbort, onConfirm,
}) => (
  <React.Fragment>
    <button type="button" className={buttonClasses} data-toggle="modal" data-target={`#${id}`}>
      {buttonLabel}
    </button>
    <div className="modal fade" id={id} tabIndex="-1" role="dialog" aria-labelledby={id} aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered" role="document">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="display-5 modal-title" id={id}>
              {title}
            </h1>
            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="modal-body">{text}</div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-dismiss="modal">
              {textAbort}
            </button>
            <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={onConfirm}>
              {textConfirm}
            </button>
          </div>
        </div>
      </div>
    </div>
  </React.Fragment>
);

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  buttonClasses: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  textConfirm: PropTypes.string.isRequired,
  textAbort: PropTypes.string.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default Modal;
