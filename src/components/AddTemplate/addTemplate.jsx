import React, { useState, useCallback, useEffect } from 'react';
import css from './addTemplate.module.css';
import fetchWithFallback from "../api/fetchWithFallback";
import COUNTRIES from "../Constants/Countries";
import { useNotifications } from '../Notifications/Notifications';

const ADD_TEMPLATE_DATA_KEY = 'addTemplateData';

const AddTemplate = () => {
    const [tempName, setTempName] = useState('');
    const [tempSubject, setTempSubject] = useState('');
    const [tempBody, setTempBody] = useState('');
    const [tempGeo, setTempGeo] = useState('');
    const [geoInput, setGeoInput] = useState("");
    const [filteredCountries, setFilteredCountries] = useState([]);
    const [showDropdown, setShowDropdown] = useState(false); 

    const { showNotification } = useNotifications();

    useEffect(() => {
        const storedData = localStorage.getItem(ADD_TEMPLATE_DATA_KEY);
        if (storedData) {
            try {
                const parsedData = JSON.parse(storedData);
                setTempName(parsedData.tempName || '');
                setTempSubject(parsedData.tempSubject || '');
                setTempBody(parsedData.tempBody || '');
                setTempGeo(parsedData.tempGeo || '');
                setGeoInput(parsedData.geoInput || '');
            } catch (e) {
                console.error("Failed to parse stored form data from localStorage", e);
                localStorage.removeItem(ADD_TEMPLATE_DATA_KEY);
            }
        }
    }, []);

    useEffect(() => {
        const handler = setTimeout(() => {
            const dataToStore = { tempName, tempSubject, tempBody, tempGeo, geoInput };
            localStorage.setItem(ADD_TEMPLATE_DATA_KEY, JSON.stringify(dataToStore));
        }, 500);
        return () => {
            clearTimeout(handler);
        };
    }, [tempName, tempSubject, tempBody, tempGeo, geoInput]);

    const isFormValid = tempName && tempSubject && tempBody && tempGeo;

    const handleGeoInputChange = (e) => {
        const value = e.target.value;
        setGeoInput(value);
        setShowDropdown(true);

        const lowerCaseValue = value.toLowerCase();

        const filtered = COUNTRIES.filter((country) =>
            country.name.toLowerCase().includes(lowerCaseValue)
        );
        setFilteredCountries(filtered);

        const currentSelectedCountryObject = COUNTRIES.find(c => c.code === tempGeo);
        if (value === "") {
            setTempGeo("");
        } else if (currentSelectedCountryObject && currentSelectedCountryObject.name.toLowerCase() !== lowerCaseValue) {
            setTempGeo("");
        }
    };

    const handleGeoSelect = (country) => {
        setGeoInput(country.name);
        setTempGeo(country.code);
        setShowDropdown(false);
        setFilteredCountries([]);
    };

    const handleClickOutside = useCallback((e) => {
        if (e.target && !e.target.closest(`.${css.selectStylesGeo}`) && showDropdown) {
            setShowDropdown(false);

            const selectedCountry = COUNTRIES.find(country => country.code === tempGeo);
            if (selectedCountry) {
                if (geoInput !== selectedCountry.name) {
                    setGeoInput(selectedCountry.name);
                }
            } else {
                setGeoInput("");
            }
        }
    }, [showDropdown, geoInput, tempGeo]); 

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [handleClickOutside]);


    const handleSubmit = async (e) => {
        e.preventDefault();

        let processedTempBody = tempBody;

        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(tempBody, 'text/html');
            const bodyElement = doc.body; 

            if (bodyElement) {
                processedTempBody = bodyElement.innerHTML;
            } else {
                showNotification('Попередження: Тег <body> не знайдено у вмісті шаблону. Буде відправлено весь введений вміст.', 'info');
            }

            const response = await fetchWithFallback('post', 'templates/addtemp', {
                tempName,
                tempSubject,
                tempBody: processedTempBody,
                tempGeo
            });

            showNotification('Шаблон збережено!', 'success');
            localStorage.removeItem(ADD_TEMPLATE_DATA_KEY);
            setTempName('');
            setTempSubject('');
            setTempBody('');
            setTempGeo('');
            setGeoInput('');
        } catch (error) {
            showNotification('Помилка при створенні шаблону. Будь ласка, спробуйте ще раз.', 'error');
        }
    };

    return (
        <div className={css.cont}>
            <form className={css.form} onSubmit={handleSubmit}>
              <h2 className="title">Create Template</h2>
                <div style={{display: 'flex', justifyContent: 'space-between', width: '530px'}}>
                    <label className={css.label}>
                        <span>Template name:</span>
                        <input
                            type="text"
                            value={tempName}
                            onChange={(e) => setTempName(e.target.value)}
                            required
                        />
                    </label>
                    <label className={css.label}>
                        <span>Template title:</span>
                        <input
                            type="text"
                            value={tempSubject}
                            onChange={(e) => setTempSubject(e.target.value)}
                            required
                        />
                    </label>
                    
                </div>
                <label className={css.label}>
                    <span>Select a country:</span>
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
                <label className={css.textareaLabel}>
                    <span>Template html:</span>
                    <textarea
                        value={tempBody}
                        onChange={(e) => setTempBody(e.target.value)}
                        required
                    />
                </label>
                <button className="button" type="submit" disabled={!isFormValid}>
                    Create
                </button>
            </form>
        </div>
    );
};

export default AddTemplate;