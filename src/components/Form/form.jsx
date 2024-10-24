import css from "./form.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../api/api";

const Form = () => {

  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [domains, setDomains] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    campaignName: "",
    domainName: "",
    group: "",
    posted: "",
    templateName: "",
  });

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get(
          `${baseUrl}`+`collections`
        );
        setGroups(response.data.collections);
      } catch (error) {
        console.error("Помилка отримання груп: ", error);
      }
    };

    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(`${baseUrl}`+`templates`);
        setTemplates(response.data.templates);
      } catch (error) {
        console.error("Помилка отримання шаблонів: ", error);
      }
    };

    fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get(`${baseUrl}`+`domains`);
        setDomains(response.data.domains);
      } catch (error) {
        console.error("Помилка отримання доменів: ", error);
      }
    };

    fetchDomains();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${baseUrl}`+`senderMails/send`,
        {
          campaignName: formData.campaignName,
          posted: formData.posted,
          group: formData.group,
          domainName: formData.domainName,
          templateName: formData.templateName,
        }
      );
      console.log("Відправлено успішно:", response.data);
    } catch (error) {
      console.error("Помилка відправлення:", error);
    }  finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.formSection}>
      <h1 className={css.title}>Email Mailing</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formCont}>
          <label>
            <span>Enter campaing name</span>
            <input
              name="campaignName"
              type="text"
              value={formData.campaignName}
              onChange={handleChange}
            />
          </label>
          <label>
            <span>Choice email domain</span>
            <div className={css.selectStyles}>
              <img
                className={css.selectArrow}
                src={require("../../img/select-arrow.png")}
                alt=""
              />
              <select name="domainName"
                value={formData.domainName}
                onChange={handleChange}>
                  <option value="" disabled>Виберіть домен</option>
                {domains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label>
            <span>Select proxy </span>
            <div className={css.selectStyles}>
              <img
                className={css.selectArrow}
                src={require("../../img/select-arrow.png")}
                alt=""
              />
              <select className={css.smallInp} name="proxy" id=""></select>
            </div>
          </label>
          <div>
            <label>
              <span>Select a group </span>
              <div className={css.selectStyles}>
                <img
                  className={css.selectArrow}
                  src={require("../../img/select-arrow.png")}
                  alt=""
                />
                <select className={css.smallInp} name="group"
                  value={formData.group}
                  onChange={handleChange}>
                    <option value="" disabled>Виберіть групу</option>
                  {groups.map((group) => (
                    <option key={group} value={group}>
                      {group}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <span>Select a amount </span>
              <input className={css.smallInp} name="posted"
                type="text"
                value={formData.posted}
                onChange={handleChange} />
            </label>
          </div>
          <label>
            <span>Choice email template</span>
            <div className={css.selectStyles}>
              <img
                className={css.selectArrow}
                src={require("../../img/select-arrow.png")}
                alt=""
              />
              <select name="templateName"
                value={formData.templateName}
                onChange={handleChange}>
                  <option value="" disabled>Виберіть шаблон</option>
                {templates.map((template) => (
                  <option key={template} value={template}>
                    {template}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
        <button disabled={isSubmitting} className={css.startButton} type="submit">
          {isSubmitting ? "Sending..." : "Start"}
        </button>
      </form>
    </div>
  );
};

export default Form;
