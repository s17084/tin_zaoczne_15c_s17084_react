function validateForm() {
  const firstNameInput = document.getElementById("firstName");
  const lastNameInput = document.getElementById("lastName");
  const emailInput = document.getElementById("email");
  const licenseInput = document.getElementById("licenseNumber");
  const birthdateInput = document.getElementById("birthDate");
  const errorsSummary = document.getElementById("errorsSummary");

  resetErrors([
    firstNameInput,
    lastNameInput,
    emailInput,
    licenseInput,
    birthdateInput,
  ]);

  let validations = [];

  validations.push(validateRequiredTextField(firstNameInput, 2, 60));
  validations.push(validateRequiredTextField(lastNameInput, 2, 60));
  validations.push(validateEmail(emailInput));
  validations.push(validateRequiredTextField(licenseInput, 6, 6));
  validations.push(validateBirthDate(birthdateInput, 16));

  let valid = !validations.includes(false);

  if (!valid) {
    errorsSummary.innerText = "Form is invalid";
  }

  return valid;
}

function validateEmail(input) {
  if (input.value !== "" && !checkEmail(input.value)) {
    addError(input, "Must be valid e-mail address");
    return false;
  }
  resetError(input);
  return true;
}

function checkEmail(value) {
  if (!value) {
    return false;
  }
  value = value.toString().trim();
  const re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  return re.test(value);
}

function validateBirthDate(input, minAge) {
  if (input.value !== "" && !isBefore16YearsAgo(input.value, minAge)) {
    addError(input, "Must be at least " + minAge + " years old");
    return false;
  }
  resetError(input);
  return true;
}

function isBefore16YearsAgo(value, minAge) {
  return new Date(value) < new Date(new Date().setUTCFullYear(new Date().getUTCFullYear() - minAge));
}
