import css from "../form.module.css";
import fetchWithFallback from "../../api/fetchWithFallback";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ManualForm = () => {
  const [templates, setTemplates] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailCount, setEmailCount] = useState(0);

  const [formData, setFormData] = useState({
    campaignName: "",
    nameFrom: "",
    domainName: "",
    templateName: "",
    shopName: "",
    productName: "",
    tempSubject: "",
    previewText: "",
    emails: "",
  });

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetchWithFallback('get', "templates");
        setTemplates(response.data);
      } catch (error) {
        console.error("Помилка отримання шаблонів: ", error);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    const rawEmailsString = formData.emails;
    const emailsArray = rawEmailsString
      .split('\n')
      .map(email => email.trim())
      .filter(email => email !== '');
    setEmailCount(emailsArray.length);
  }, [formData.emails]);

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
          previewText: selectedTemplate.previewText || "",
        }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const rawEmailsString = formData.emails;
    const emailsArray = rawEmailsString
      .split('\n')
      .map(email => email.trim())
      .filter(email => email !== '');

    if (emailsArray.length === 0) {
      alert("Будь ласка, введіть хоча б одну адресу електронної пошти.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetchWithFallback('post', "senderMails/send-manual", {
        campaignName: formData.campaignName,
        nameFrom: formData.nameFrom,
        domainName: formData.domainName,
        posted: emailsArray.length,
        templateName: formData.templateName,
        shopName: formData.shopName,
        productName: formData.productName,
        tempSubject: formData.tempSubject,
        previewText: formData.previewText,
        emails: emailsArray,
      });

      console.log("Відправлено успішно:", response.data);
      setFormData({
        campaignName: "",
        nameFrom: "",
        domainName: "",
        templateName: "",
        shopName: "",
        productName: "",
        tempSubject: "",
        previewText: "",
        emails: "",
      });
    } catch (error) {
      console.error("Помилка відправлення:", error);
      alert(`Помилка відправлення: ${error.response?.data?.error || error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={css.formSection}>
      <div className={css.sendNav}>
        <Link to={'/'} className={css.sendLink}>Email Mailing</Link>
        <h2 className={css.title}>/ Manual</h2>
      </div>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formCont}>
          <label>
            <span>Enter campaign name</span>
            <input
              name="campaignName"
              type="text"
              value={formData.campaignName}
              onChange={handleChange}
              required
            />
          </label>

          <div style={{ display: "flex" }}>
            <label>
              <span>Choice email template</span>
              <div className={css.selectStyles}>
                <select
                  name="templateName"
                  value={formData.templateName}
                  onChange={handleChange}
                  required
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
                name="posted"
                type="text"
                value={emailCount}
                readOnly
                disabled
              />
            </label>
          </div>
          <label>
            <span>Enter template subject</span>
            <div className={css.selectStyles}>
              <textarea
                name="tempSubject"
                value={formData.tempSubject}
                onChange={handleChange}
                autoComplete="off"
                required
              />
            </div>
          </label>

          <label>
            <span>Enter preview text</span>
            <div className={css.selectStyles}>
              <textarea
                required
                name="previewText"
                value={formData.previewText}
                onChange={handleChange}
              />
            </div>
          </label>
          <label>
            <span>Enter emails</span>
            <div className={css.textAreaStyles}>
              <textarea
                name="emails"
                id="emails"
                value={formData.emails}
                onChange={handleChange}
                required
                placeholder="Enter emails, each on a new line"
              ></textarea>
            </div>
          </label>
        </div>
        <button className={css.startButton} type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Start"}
        </button>
      </form>
    </div>
  );
};

export default ManualForm;