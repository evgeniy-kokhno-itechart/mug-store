import React from "react";

const Modal = ({
  id,
  buttonLabel,
  buttonClasses,
  title,
  text,
  textConfirm,
  textAbort,
  onConfirm
}) => {
  return (
    <React.Fragment>
      <button
        type="button"
        className={buttonClasses}
        data-toggle="modal"
        data-target={`#${id}`}
      >
        {buttonLabel}
      </button>
      <div
        className="modal fade"
        id={id}
        tabIndex="-1"
        role="dialog"
        aria-labelledby={id}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id={id}>
                {title}
              </h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{text}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
              >
                {textAbort}
              </button>
              <button
                type="button"
                className="btn btn-danger"
                data-dismiss="modal"
                onClick={onConfirm}
              >
                {textConfirm}
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Modal;
