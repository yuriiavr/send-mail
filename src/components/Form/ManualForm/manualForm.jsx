import axios from "axios";
import css from "../form.module.css";
import { baseUrl } from "../../api/api";
import { useEffect, useState } from "react";

const ManualForm = () => {
  const [templates, setTemplates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    campaignName: "",
    nameFrom: "",
    domainName: "",
    posted: "",
    templateName: "",
    shopName: "",
    productName: "",
    tempSubject: "",
    previewText: "",
  });

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
      const response = await axios.post(baseUrl + "/api/senderMails/send-manual", {
        campaignName: formData.campaignName,
        nameFrom: formData.nameFrom,
        domainName: formData.domainName,
        posted: formData.posted,
        templateName: formData.templateName,
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
      <h1 className={css.title}>Manual Sender</h1>
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
        <button className={css.startButton} type="submit">
          Start
        </button>
      </form>
    </div>
  );
};

export default ManualForm;
