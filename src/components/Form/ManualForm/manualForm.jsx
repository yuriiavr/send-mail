import axios from "axios";
import css from "../form.module.css";
import { baseUrl } from "../../api/api";
import { useEffect,useState } from "react";

const ManualForm = () => {
  const countries = [
    { code: "ES", name: "Spain" },
    { code: "US", name: "United States" },
    { code: "FR", name: "France" },
    { code: "DE", name: "Germany" },
    { code: "IT", name: "Italy" },
    { code: "ZA", name: "South Africa" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();

    
  };

  return (
    <div className={css.formSection}>
      <h1 className={css.title}>Manual Sender</h1>
      <form className={css.form} onSubmit={handleSubmit}>
        <div className={css.formCont}>
          <label>
            <span>Enter campaign name</span>
            <input name="campaignName" type="text" />
          </label>
          <div style={{ display: "flex" }}>
            <label>
              <span>Enter email subject</span>
              <div className={css.selectStyles}>
                <input
                  name="tempSubject"
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
                <input type="text" required name="nameFrom" />
              </div>
            </label>
          </div>
          <div>
            <label>
              <span>Select a country</span>
              <div className={css.selectStyles}>
                <select className={css.smallInp} name="geo">
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
              <input className={css.smallInp} name="posted" type="text" />
            </label>
          </div>
        </div>
        <button
         
          className={css.startButton}
          type="submit"
        >
          Start
        </button>
      </form>
    </div>
  );
};

export default ManualForm;
