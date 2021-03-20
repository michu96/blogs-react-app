import { useEffect, useRef } from 'react'
import ReactDOM from 'react-dom'
import { CSSTransition } from 'react-transition-group'

function Modal({ header, onClose, children }) {
  const modalRef = useRef(null)
  useEffect(() => {
    const keyEvent = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keyup', keyEvent)
    return () => {
      window.removeEventListener('keyup', keyEvent)
    }
  }, [onClose])
  return ReactDOM.createPortal(
    <CSSTransition
      in={true}
      nodeRef={modalRef}
      timeout={500}
      classNames={'modal'}
      unmountOnExit
      appear={true}
    >
      <div ref={modalRef} className="modal" onClick={onClose}>
        <div className="modal__box" onClick={(e) => e.stopPropagation()}>
          <div className="modal__header">
            <h3 className="modal__title">{header}</h3>
            <button className="modal__btn-close" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="modal__content">{children}</div>
        </div>
      </div>
    </CSSTransition>,
    document.getElementById('root')
  )
}

export default Modal
