import css from "./form.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [domains, setDomains] = useState([]);
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
          "http://localhost:3001/api/collections"
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
        const response = await axios.get("http://localhost:3001/api/templates");
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
        const response = await axios.get("http://localhost:3001/api/domains");
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
    try {
      const response = await axios.post(
        "http://localhost:3001/api/senderMails/send",
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
                {templates.map((template) => (
                  <option key={template} value={template}>
                    {template}
                  </option>
                ))}
              </select>
            </div>
          </label>
        </div>
        <button className={css.startButton} type="submit">
          Start
        </button>
      </form>
    </div>
  );
};

export default Form;
