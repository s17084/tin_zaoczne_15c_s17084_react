import React, {useState, useEffect} from "react";
import {useTranslation} from 'react-i18next';

const SelectInputWithLabel = (props) => {
  const {t} = useTranslation();
  const {
    id,
    options,
    labelText,
    labelClass,
    inputClass,
    formValues,
    setValue,
    disabled,
    errorSpan,
    formErrors,
    isCreate
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
  }, [])

  console.log({error: error})

  return (
      <>
        <label className={labelClass}
               htmlFor={id}>{labelText}</label>
        <select
            name={id}
            id={id}
            onInput={() => setError("")}
            className={(inputClass + (error ? ' error-input' : null)).trim()}
            disabled={disabled}
        >
          <option
              disabled
              value
              selected={isCreate}
          >--
          </option>
          {options.map(option =>
              <option selected={formValues[id] === option}>
                {option}
              </option>
          )}
        </select>
        {errorSpan ? (
            <>
              <span/>
              <span
                  id={'error' + id.slice(0, 1).toUpperCase()
                  + id.slice(1)}
                  className="errors-text">{error ? t(
                  'validationErrors.' + error) : ""}
              </span>
            </>
        ) : null}
      </>
  )
}

export default SelectInputWithLabel;