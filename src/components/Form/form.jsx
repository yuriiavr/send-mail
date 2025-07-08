import css from "./form.module.css";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import fetchWithFallback from "../api/fetchWithFallback";
import { Link } from "react-router-dom";

const Form = () => {
  const [allTemplates, setAllTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
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

  const [geoInput, setGeoInput] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const countries = useMemo(() => [
    { code: "ES", name: "[ES] Spain" },
    { code: "US", name: "[US] United States" },
    { code: "FR", name: "[FR] France" },
    { code: "DE", name: "[DE] Germany" },
    { code: "IT", name: "[IT] Italy" },
    { code: "ZA", name: "[ZA] South Africa" },
    { code: "GB", name: "[GB] United Kingdom" },
    { code: "CA", name: "[CA] Canada" },
    { code: "AU", name: "[AU] Australia" },
    { code: "NZ", name: "[NZ] New Zealand" },
    { code: "IE", name: "[IE] Ireland" },
    { code: "PL", name: "[PL] Poland" },
    { code: "UA", name: "[UA] Ukraine" },
    { code: "AR", name: "[AR] Argentina" },
    { code: "RO", name: "[RO] Romania" },
    { code: "BE", name: "[BE] Belgium" },
  ], []);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const response = await fetchWithFallback('get', 'templates');
        setAllTemplates(response.data);
      } catch (error) {
        console.error("Помилка отримання шаблонів: ", error);
      }
    };
    fetchTemplates();
  }, []);

  useEffect(() => {
    if (!formData.geo) {
      setFilteredTemplates(allTemplates.filter(template => template.tempGeo === "none" || template.tempGeo === undefined));
    } else {
      const templatesByGeo = allTemplates.filter(
        (template) =>
          template.tempGeo === formData.geo || template.tempGeo === "none"
      );
      setFilteredTemplates(templatesByGeo);
    }

    setFormData((prev) => ({
      ...prev,
      templateName: "",
      tempSubject: "",
      previewText: "",
    }));
  }, [formData.geo, allTemplates]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "templateName") {
      const selectedTemplate = filteredTemplates.find(
        (t) => t.tempName === value
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

  const handleGeoInputChange = (e) => {
    const value = e.target.value;
    setGeoInput(value);
    setShowDropdown(true);

    const lowerCaseValue = value.toLowerCase();

    const filtered = countries.filter((country) =>
      country.name.toLowerCase().includes(lowerCaseValue)
    );
    setFilteredCountries(filtered);

    const currentSelectedCountryObject = countries.find(c => c.code === formData.geo);

    if (value === "") {
      setFormData((prev) => ({ ...prev, geo: "" }));
    } else if (currentSelectedCountryObject && currentSelectedCountryObject.name.toLowerCase() !== lowerCaseValue) {
      setFormData((prev) => ({ ...prev, geo: "" }));
    }
  };

  const handleGeoSelect = (country) => {
    setGeoInput(country.name);
    setFormData((prev) => ({ ...prev, geo: country.code }));
    setShowDropdown(false);
    setFilteredCountries([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetchWithFallback('post', "senderMails/send", {
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
      setFormData({
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
      setGeoInput("");
    } catch (error) {
      console.error("Помилка відправлення:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClickOutside = useCallback((e) => {
    if (e.target && !e.target.closest(`.${css.selectStylesGeo}`) && showDropdown) {
      setShowDropdown(false);

      const selectedCountry = countries.find(country => country.code === formData.geo);
      if (selectedCountry) {
        if (geoInput !== selectedCountry.name) {
          setGeoInput(selectedCountry.name);
        }
      } else {
        setGeoInput("");
      }
    }
  }, [showDropdown, geoInput, formData.geo, countries]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className={css.formSection}>
      <div className={css.sendNav}>
        <h2 className={css.title}>Email Mailing /</h2>
        <Link to={"/manualSender"} className={css.sendLink}>
          Manual
        </Link>
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
              <span>Enter product name</span>
              <div className={css.selectStyles}>
                <input
                  name="productName"
                  value={formData.productName}
                  onChange={handleChange}
                  type="text"
                  autoComplete="off"
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
              <span>Select a country</span>
              <div
                className={css.selectStylesGeo}
                style={{ position: "relative" }}
              >
                <input
                  type="text"
                  name="geoInput"
                  value={geoInput}
                  onChange={handleGeoInputChange}
                  onFocus={() => setShowDropdown(true)}
                  placeholder="Start typing..."
                  autoComplete="off"
                  required
                />
                {showDropdown && filteredCountries.length > 0 && (
                  <ul className={css.countryDropdown}>
                    {filteredCountries.map((country) => (
                      <li
                        key={country.code}
                        onClick={() => handleGeoSelect(country)}
                        className={css.dropdownItem}
                      >
                        {country.name}
                      </li>
                    ))}
                  </ul>
                )}
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
                  {filteredTemplates.map((template) => (
                    <option key={template.id} value={template.tempName}>
                      {template.tempName}
                    </option>
                  ))}
                </select>
              </div>
            </label>

            <label>
              <span>Select amount</span>
              <input
                name="posted"
                type="text"
                value={formData.posted}
                onChange={handleChange}
                required
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
                type="text"
                autoComplete="off"
                required
              />
            </div>
          </label>

          <label>
            <span>Enter preview text</span>
            <div className={css.selectStyles}>
              <textarea
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
      </form>
    </div>
  );
};

export default Form;