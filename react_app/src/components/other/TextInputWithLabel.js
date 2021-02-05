import React, {useState, useEffect} from "react";
import {useTranslation} from 'react-i18next';

const TextInputWithLabel = (props) => {
  const {t} = useTranslation();
  const {
    id,
    labelText,
    type,
      step,
    labelClass,
    inputClass,
    formValues,
    setValue,
    placeholder,
    disabled,
    errorSpan,
    formErrors
  } = props;

  const [error, setError] = useState("");

  const handleChange = (event) => {
    setError("");
    const obj = {};
    obj[id] = event.target.value;
    setValue(obj);
  }

  useEffect(() => {
    if (formErrors) {
      const formError = formErrors.find(e => e.path.includes(id))?.message
      console.log(formError)
      setError(formError)
    }
  }, [formErrors])

  console.log({error: error})

  return (
      <>
        <label className={labelClass}
               htmlFor={id}>{labelText}</label>
        <input
            className={(inputClass + (error ? ' error-input' : null)).trim()}
            type={type}
            step={step ? step : ''}
            id={id}
            name={id}
            value={formValues[id]}
            onChange={handleChange}
            placeholder={placeholder ? placeholder : ""}
            disabled={disabled}
        />
        {errorSpan ? (
            <>
              <span/>
              <span
                  id={'error' + id.slice(0, 1).toUpperCase()
                  + id.slice(1)}
                  className="errors-text">{error ? t('validationErrors.' + error) : ""}
              </span>
            </>
        ) : null}
      </>
  )
}

export default TextInputWithLabel;