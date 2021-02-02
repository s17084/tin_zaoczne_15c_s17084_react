function resetErrors(inputs) {
  let input;
  for (let i = 0; i < inputs.length; i++) {
    input = inputs[i];
    input.classList.remove("error-input");
    inputId = input.getAttribute("id");
    document.getElementById(
      "error" + inputId.slice(0, 1).toUpperCase() + inputId.slice(1)
    ).innerText = "";
  }
}

function resetErrorsSummary(errorInfo) {
  errorInfo.innerText = "";
}

function resetError(input) {
  const id = input.getAttribute("id");
  input.classList.remove("error-input");
  document.getElementById(
    "error" + id.slice(0, 1).toUpperCase() + id.slice(1)
  ).innerText = "";
}

function addError(input, errMsg) {
  const inputId = input.getAttribute("id");
  const error = document.getElementById(
    "error" + inputId.slice(0, 1).toUpperCase() + inputId.slice(1)
  );
  input.classList.add("error-input");
  error.innerText = errMsg;
}

function validateRequired(input) {
  if (!checkRequired(input.value)) {
    addError(input, "Field is required");
    return false;
  }
  return true;
}

function validateRequiredTextField(input, min, max) {
  if (!validateRequired(input)) {
    return false;
  } else if (!checkTextLengthRange(input.value, min, max)) {
    addError(input, "Field must contain " + min + "-" + max + " characters");
    return false;
  }
  resetError(input);
  return true;
}

function checkRequired(value) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  if (value === "") {
    return false;
  }
  return true;
}

function checkTextLengthRange(value, min, max) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const length = value.length;
  if (max && length > max) {
    return false;
  }
  if (min && length < min) {
    return false;
  }
  return true;
}
