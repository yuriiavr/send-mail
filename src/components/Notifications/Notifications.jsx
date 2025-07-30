import { useState, useCallback, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';
import css from './Notifications.module.css';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notifications, setNotifications] = useState([]);
    const [confirmation, setConfirmation] = useState(null);

    const showNotification = useCallback((message, type = 'info', duration = 3000) => {
        const effectiveType = type === 'success' || type === 'info' ? 'success' : 'error';
        const id = Date.now() + Math.random();
        setNotifications((prev) => [...prev, { id, message, type: effectiveType }]); 

        if (duration > 0) {
            setTimeout(() => {
                setNotifications((prev) => prev.filter((n) => n.id !== id));
            }, duration);
        }
    }, []);

    const showConfirmation = useCallback((message) => {
        return new Promise((resolve, reject) => {
            setConfirmation({ message, resolve, reject });
        });
    }, []);

    const closeConfirmation = useCallback(() => {
        setConfirmation(null);
    }, []);

    const value = { showNotification, showConfirmation };

    return (
        <NotificationContext.Provider value={value}>
            {children}
            {ReactDOM.createPortal(
                <div className={css.notificationContainer}>
                    {notifications.map((n) => (
                        <div key={n.id} className={`${css.notification} ${css[n.type]}`}>
                            {n.message}
                            <button onClick={() => setNotifications((prev) => prev.filter((item) => item.id !== n.id))} className={css.closeButton}>
                                &times;
                            </button>
                        </div>
                    ))}
                </div>,
                document.body
            )}
            {confirmation && ReactDOM.createPortal(
                <ConfirmationDialog
                    message={confirmation.message}
                    onConfirm={() => {
                        confirmation.resolve(true);
                        closeConfirmation();
                    }}
                    onCancel={() => {
                        confirmation.reject(false);
                        closeConfirmation();
                    }}
                />,
                document.body
            )}
        </NotificationContext.Provider>
    );
};

export const useNotifications = () => {
    return useContext(NotificationContext);
};

const Notification = ({ message, type, onClose }) => {
    return (
        <div className={`${css.notification} ${css[type]}`}>
            {message}
            <button onClick={onClose} className={css.closeButton}>
                &times;
            </button>
        </div>
    );
};

const ConfirmationDialog = ({ message, onConfirm, onCancel }) => {
    return (
        <div className={css.confirmationOverlay}>
            <div className={css.confirmationDialog}>
                <p className={css.confirmationMessage}>{message}</p>
                <div className={css.confirmationButtons}>
                    <button onClick={onConfirm} className={css.confirmButton}>Yes</button>
                    <button onClick={onCancel} className={css.cancelButton}>No</button>
                </div>
            </div>
        </div>
    );
};