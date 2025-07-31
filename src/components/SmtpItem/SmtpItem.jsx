import React, { useState } from 'react';
import fetchWithFallback from '../api/fetchWithFallback';
import styles from './SmtpItem.module.css';

const SmtpItem = ({ smtp, onUpdate }) => {
  const [dailyLimit, setDailyLimit] = useState(smtp.dailyLimit);
  const [status, setStatus] = useState(smtp.status);
  const [isEditing, setIsEditing] = useState(false);
  const [updateMessage, setUpdateMessage] = useState('');
  const [updateError, setUpdateError] = useState('');

  const handleLimitChange = (e) => {
    setDailyLimit(Number(e.target.value));
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleUpdate = async () => {
    setUpdateMessage('');
    setUpdateError('');
    try {
      const response = await fetchWithFallback(
        'PUT',
        `smtp/smtp-statuses/${smtp.smtp_id}`,
        {
          dailyLimit: dailyLimit,
          status: status,
        }
      );
      
      onUpdate(); 
      setUpdateMessage('Updated successfully!');
      setIsEditing(false);
    } catch (err) {
      console.error("Failed to update SMTP:", err);
      setUpdateError(`Failed to update: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div className={styles.smtpItemContainer}>
      <h3 className={styles.smtpId}>SMTP ID: {smtp.smtp_id}</h3>
      <p>Current Status: <strong className={styles.statusText}>{smtp.status}</strong></p>
      <p>Daily Limit: {smtp.dailyLimit}</p>
      <p>Today's Sends: {smtp.todaySends}</p>

      {!isEditing ? (
        <button onClick={() => setIsEditing(true)} className={styles.editButton}>
          Edit
        </button>
      ) : (
        <div className={styles.editSection}>
          <h4 className={styles.editTitle}>Edit SMTP Settings:</h4>
          <div className={styles.formGroup}>
            <label htmlFor={`dailyLimit-${smtp._id}`}>Daily Limit:</label>
            <input
              type="number"
              id={`dailyLimit-${smtp._id}`}
              value={dailyLimit}
              onChange={handleLimitChange}
            />
          </div>

          <div className={styles.radioGroup}>
            <p>Change Status:</p>
            {['stopped', 'ban', 'free', 'busy'].map((s) => (
              <label key={s}>
                <input
                  type="radio"
                  name={`status-${smtp._id}`}
                  value={s}
                  checked={status === s}
                  onChange={handleStatusChange}
                />
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </label>
            ))}
          </div>

          <button onClick={handleUpdate} className={styles.saveButton}>
            Save Changes
          </button>
          <button onClick={() => {
            setIsEditing(false);
            setDailyLimit(smtp.dailyLimit);
            setStatus(smtp.status);
            setUpdateMessage('');
            setUpdateError('');
          }} className={styles.cancelButton}>
            Cancel
          </button>
          {updateMessage && <p className={`${styles.message} ${styles.success}`}>{updateMessage}</p>}
          {updateError && <p className={`${styles.message} ${styles.error}`}>{updateError}</p>}
        </div>
      )}
    </div>
  );
};

export default SmtpItem;