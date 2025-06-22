import css from "./form.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { baseUrl } from "../api/api";
import { Link } from "react-router-dom";

const Form = () => {
  const [templates, setTemplates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    campaignName: "",
    nameFrom: "",
    domainName: "",
    posted: "",
    templateName: "",
    geo: "",
    shopName: "",
    productName: "",
    tempSubject: "",
    previewText: "",
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
    const fetchTemplates = async () => {
      try {
        const response = await axios.get(baseUrl + "templates");
        setTemplates(response.data);
      } catch (error) {
        console.error("Помилка отримання шаблонів: ", error);
      }
    };
    fetchTemplates();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    if (e.target.name === "templateName") {
      const selectedTemplate = templates.find(
        (t) => t.tempName === e.target.value
      );
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
      const response = await axios.post(baseUrl + "senderMails/send", {
        campaignName: formData.campaignName,
        nameFrom: formData.nameFrom,
        domainName: formData.domainName,
        posted: formData.posted,
        templateName: formData.templateName,
        geo: formData.geo,
        shopName: formData.shopName,
        productName: formData.productName,
        tempSubject: formData.tempSubject,
        previewText: formData.previewText,
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
              <span>Enter product name</span>
              <div className={css.selectStyles}>
                <input
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  type="text"
                  autoComplete="disable"
                  required
                />
              </div>
            </label>
            <label>
              <span>Enter shop name</span>
              <div className={css.selectStyles}>
                <input
                  type="text"
                  required
                  name="shopName"
                  value={formData.shopName}
                  onChange={handleChange}
                />
              </div>
            </label>
          </div>
          <div style={{ display: "flex" }}>
            <label>
              <span>Enter template subject</span>
              <div className={css.selectStyles}>
                <input
                  name="tempSubject"
                  value={formData.tempSubject}
                  onChange={handleChange}
                  type="text"
                  autoComplete="disable"
                  required
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
                  <option value="" disabled>
                    Select Country
                  </option>
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
                <option value="" disabled>
                  Select template
                </option>
                {templates.map((template) => (
                  <option key={template.tempName} value={template.tempName}>
                    {template.tempName}
                  </option>
                ))}
              </select>
            </div>
          </label>
          <label>
            <span>Enter preview text</span>
            <div className={css.selectStyles}>
              <input
                type="text"
                required
                name="previewText"
                value={formData.previewText}
                onChange={handleChange}
              />
            </div>
          </label>
        </div>
        <button
          disabled={isSubmitting}
          className={css.startButton}
          type="submit"
        >
          {isSubmitting ? "Sending..." : "Start"}
        </button>
        <br />
        <Link to={"/manualSender"}>try manual</Link>
      </form>
    </div>
  );
};

export default Form;
