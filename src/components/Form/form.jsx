import css from "./form.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";

const Form = () => {
  const [groups, setGroups] = useState([]);
  const [templates, setTemplates] = useState([]);
  const [domains, setDomains] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    campaignName: "",
    tempSubject: "",
    nameFrom: "",
    domainName: "",
    group: "",
    posted: "",
    templateName: "",
    geo: "", 
  });

  const countries = [
    { code: "ES", name: "Spain" },
    { code: "US", name: "United States" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "IT", name: "Italy" },
    { code: "ZA", name: "South Africa" },
  ];

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const response = await axios.get("/api/groups");
        setGroups(response.data);
      } catch (error) {
        console.error("Помилка отримання груп: ", error);
      }
    };
    fetchGroups();
  }, []);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await axios.get("/api/templates");
        setTemplates(response.data);
      } catch (error) {
        console.error("Помилка отримання шаблонів: ", error);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    const fetchDomains = async () => {
      try {
        const response = await axios.get("/api/domains");
        setDomains(response.data);
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

    if (e.target.name === "templateName") {
      const selectedTemplate = templates.find(t => t.tempName === e.target.value);
      if (selectedTemplate) {
        setFormData((prev) => ({
          ...prev,
          tempSubject: selectedTemplate.tempSubject,
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/senderMails/send", {
        campaignName: formData.campaignName,
        tempSubject: formData.tempSubject,
        nameFrom: formData.nameFrom,
        posted: formData.posted,
        group: formData.group,
        domainName: formData.domainName,
        templateName: formData.templateName,
        geo: formData.geo, 
      });

      console.log("Відправлено успішно:", response.data);
    } catch (error) {
      console.error("Помилка відправлення:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.formSection}>
      <h1 className={css.title}>Email Mailing</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formCont}>
          <label>
            <span>Enter campaign name</span>
            <input
              name="campaignName"
              type="text"
              value={formData.campaignName}
              onChange={handleChange}
            />
          </label>
          <div style={{ display: "flex" }}>
            <label>
              <span>Enter email subject</span>
              <div className={css.selectStyles}>
                <input
                  name="tempSubject"
                  value={formData.tempSubject}
                  onChange={handleChange}
                  type="text"
                  autoComplete="disable"
                  required
                  readOnly
                />
              </div>
            </label>
            <label>
              <span>Enter sender name</span>
              <div className={css.selectStyles}>
                <input
                  type="text"
                  required
                  name="nameFrom"
                  value={formData.nameFrom}
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>
          <div>
            <label>
              <span>Select a country</span>
              <div className={css.selectStyles}>
                <select
                  className={css.smallInp}
                  name="geo"
                  value={formData.geo}
                  onChange={handleChange}
                >
                  <option value="" disabled>Select Country</option>
                  {countries.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </label>
            <label>
              <span>Select amount</span>
              <input
                className={css.smallInp}
                name="posted"
                type="text"
                value={formData.posted}
                onChange={handleChange}
              />
            </label>
          </div>
          <label>
            <span>Choice email template</span>
            <div className={css.selectStyles}>
              <select
                name="templateName"
                value={formData.templateName}
                onChange={handleChange}
              >
                <option value="" disabled>Select template</option>
                {templates.map((template) => (
                  <option key={template.tempName} value={template.tempName}>
                    {template.tempName}
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
