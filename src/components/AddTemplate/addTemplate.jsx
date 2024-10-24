import React, { useState } from 'react';
import css from './addTemplate.module.css';
import axios from 'axios';
import { baseUrl } from '../api/api';

const AddTemplate = () => {
  const [tempName, setTempName] = useState('');
  const [tempSubject, setTempSubject] = useState('');
  const [tempBody, setTempBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${baseUrl}` + 'senderMails/addtemp', {
        tempName,
        tempSubject,
        tempBody,
      });

      console.log('Шаблон створено успішно:', response.data);
    } catch (error) {
      console.error('Помилка при створенні шаблону:', error);
    }
  };

  return (
    <div className={css.cont}>
      <h2>Create Template</h2>
      <form className={css.form} onSubmit={handleSubmit}>
        <label className={css.label}>
          <span>Template name:</span>
          <input
            type="text"
            value={tempName}
            onChange={(e) => setTempName(e.target.value)}
          />
        </label>
        <label className={css.label}>
          <span>Template title:</span>
          <input
            type="text"
            value={tempSubject}
            onChange={(e) => setTempSubject(e.target.value)}
          />
        </label>
        <label className={css.label}>
          <span>Template html:</span>
          <textarea
            value={tempBody}
            onChange={(e) => setTempBody(e.target.value)}
          />
        </label>
        <button className={css.button} type="submit">
          Create
        </button>
      </form>
    </div>
  );
};

export default AddTemplate;
