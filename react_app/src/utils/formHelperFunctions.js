function displayError(inputId, validationErrors) {
  if (validationErrors.find(e => e.path.includes(inputId))) {
    return validationErrors.find(e => e.path.includes(inputId)).message
  }
}

function errorClass(inputId, validationErrors) {
  return validationErrors.find(e => e.path.includes(inputId))
      ? 'error-input'
      : ''
}

function inputValue(body, formObj, inputId) {
  const formObjElementVal = formObj[inputId] !== undefined ? formObj[inputId]
      : '';
  const bodyElementVal = body[inputId] !== undefined ? body[inputId] : '';
  return Object.keys(body).includes(inputId)
      ? bodyElementVal
      : (formObjElementVal
          ? formObjElementVal
          : null);
}

function inputDateValue(body, formObj, inputId) {
  const formObjElementVal = formObj[inputId] !== undefined ? formObj[inputId]
      : '';
  const bodyElementVal = body[inputId] !== undefined ? body[inputId] : '';
  return bodyElementVal
      ? bodyElementVal
      : (formObjElementVal
          ? formObjElementVal.toISOString().split('T')[0]
          : null);
}

function ariaRequired(isEditable) {
  if (isEditable) {
    return '<abbr title="required" aria-label="required">*</abbr>'
  }
  return '';
}

function errorSpan(isEditable, inputId, validationErrors) {
  const errorId = 'error' + inputId.slice(0, 1).toUpperCase() + inputId.slice(1)
  const errorMsg = displayError(inputId, validationErrors)
  if (isEditable) {
    return '<span></span><span id="' + errorId + '" class="errors-text">'
        + (errorMsg ? errorMsg : '')
        + '</span>'
  }
}

function optionSelected(body, formObj, inputId, expValue, formMode) {
  if (Object.keys(body).includes(inputId)) {
    if (body[inputId] === expValue) {
      return 'selected'
    }
  }else if (formMode !== 'create' && formObj[inputId] === expValue) {
    return 'selected';
  }
}

function optionSelectedById(body, formObj, inputId, expValue, formMode) {
  console.log(Object.keys(body).includes(inputId))
  console.log(body[inputId] === expValue)
  console.log(body[inputId])
  console.log(expValue)

  if (Object.keys(body).includes(inputId)) {
    if (body[inputId] == expValue) {
      return 'selected'
    }
  }else if (formMode !== 'create' && formObj._id === expValue) {
    return 'selected';
  }
}

function disabledOptionSelected(body, formMode, inputId) {
  if (formMode === 'create'
      && (Object.keys(body).length === 0
          || !body[inputId]
      )
  ) {
    return 'selected';
  }
}

module.exports = {
  errorClass: errorClass,
  inputValue: inputValue,
  inputDateValue: inputDateValue,
  ariaRequired: ariaRequired,
  errorSpan: errorSpan,
  optionSelected: optionSelected,
  optionSelectedById: optionSelectedById,
  disabledOptionSelected: disabledOptionSelected
}