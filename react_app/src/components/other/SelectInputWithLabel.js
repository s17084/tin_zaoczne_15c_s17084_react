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
    setValue,
    disabled,
    errorSpan,
    formErrors,
    isCreate,
    // errorParams
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
      setError(formError)
    }
  }, [formErrors, id])

  return (
      <>
        <label className={labelClass}
               htmlFor={id}>{labelText}</label>
        <select
            name={id}
            id={id}
            onInput={handleChange}
            className={(inputClass + (error ? ' error-input' : null)).trim()}
            disabled={disabled}>
          <option
              disabled
              value={-1}
              selected={isCreate}
              key={"defaultKey"}>
            --
          </option>
          {options.map(option => {
            console.log(option)
                return (<option selected={option.selected} value={option.key}
                               key={option.key}>
                  {option.value}
                </option>)
              }
          )}
        </select>
        {errorSpan ? (
            <>
              <span/>
              <span
                  id={'error' + id.slice(0, 1).toUpperCase()
                  + id.slice(1)}
                  className="errors-text">{error ?
                  t('validationErrors.' + error)
                  : ""}
              </span>
            </>
        ) : null}
      </>
  )
}

export default SelectInputWithLabel;