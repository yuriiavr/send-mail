import css from './addGroup.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { baseUrl } from '../api/api';

const AddGroup = () => {
  const [collectionName, setCollectionName] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!collectionName) {
      setStatusMessage('Enter group name');
      return;
    }

    try {
      const response = await axios.post(`${baseUrl}`+'senderMails/addgroup', {
        collectionName: collectionName,
      });

      setStatusMessage(response.data.message);
    } catch (error) {
      setStatusMessage(error.response?.data?.message || 'Error');
    }
  };

  return (
    <>
      <div className={css.cont}>
        <h2>Create Group</h2>
        <form onSubmit={handleSubmit}>
          <label style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span>Group name:</span>
            <input
              type="text"
              value={collectionName}
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </label>
          <button type="submit">Create</button>
        </form>
        {statusMessage && <p>{statusMessage}</p>}
      </div>
    </>
  );
};

export default AddGroup;
