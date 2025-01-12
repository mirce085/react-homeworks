import './ModalWindow.css';
import {useEffect} from "react";
import {createPortal} from "react-dom";

export function ModalWindow({isOpen, title, children, onClose}) {
    useEffect(() => {
        const handleKeyDown = e => {
            if (e.key === 'Escape') {
                onClose();
            }
        }

        window.addEventListener('keydown', handleKeyDown);

        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return isOpen && createPortal(
        <div id='modal'>
            <div className="content">
                <div className="header">
                    <div className="title">{title}</div>
                    <div className="close-btn" tabIndex={0} onClick={onClose} onKeyDown={e => {
                        if (e.key === 'Enter' || e.key === ' ') onClose()
                    }} role='button'></div>
                </div>
                <hr/>
                <div className="body">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    )
}