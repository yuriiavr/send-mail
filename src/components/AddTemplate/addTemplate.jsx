import React, { useState } from 'react';
import css from './addTemplate.module.css';
import axios from 'axios';
import DOMPurify from 'dompurify';
import { baseUrl } from "../api/api";

const AddTemplate = () => {
  const [tempName, setTempName] = useState('');
  const [tempSubject, setTempSubject] = useState('');
  const [tempBody, setTempBody] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedTempName = DOMPurify.sanitize(tempName);
    const sanitizedTempSubject = DOMPurify.sanitize(tempSubject);
    const sanitizedTempBody = DOMPurify.sanitize(tempBody);

    if (!sanitizedTempName.trim() || !sanitizedTempSubject.trim() || !sanitizedTempBody.trim()) {
      alert('Все поля должны быть заполнены!');
      return;
    }

    try {
      const response = await axios.post(baseUrl + 'templates/add', {
        tempName: sanitizedTempName,
        tempSubject: sanitizedTempSubject,
        tempBody: sanitizedTempBody,
      });

      console.log('Шаблон збережено:', response.data);

      setTempName('');
      setTempSubject('');
      setTempBody('');
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
