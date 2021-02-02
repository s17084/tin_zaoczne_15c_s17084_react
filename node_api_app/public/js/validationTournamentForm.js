const AVAILABLE_RANKS = { C: 100, "B+": 500, A: 1500 };

function validateForm() {
  const tournamentNameInput = document.getElementById("name");
  const tournamentDateInput = document.getElementById("date");
  const prizePoolInput = document.getElementById("prizePool");
  const rankInput = document.getElementById("rank");
  const errorsSummary = document.getElementById("errorsSummary");

  resetErrors([
    tournamentNameInput,
    tournamentDateInput,
    prizePoolInput,
    rankInput,
  ]);

  let validations = [];

  validations.push(validateRequiredTextField(tournamentNameInput, 5, 60));
  validations.push(validateFutureDate(tournamentDateInput));
  validations.push(validateRequiredPrize(prizePoolInput));
  validations.push(validateRank(rankInput));

  let valid = !validations.includes(false);

  if (!valid) {
    errorsSummary.innerText = "Form is invalid";
  }

  return valid;
}

function validateRank(input) {
  if (!isValidRank(input.value)) {
    addError(input, "Choose rank (A, B+, C)");
    return false;
  }
  return true;
}

function isValidRank(value) {
  return Object.keys(AVAILABLE_RANKS).includes(value);
}

function validateRequiredPrize(input) {
  const rankInput = document.getElementById("rank");

  const minPrize = isValidRank(rankInput.value)
    ? AVAILABLE_RANKS[rankInput.value]
    : Math.min(...Object.values(AVAILABLE_RANKS));
  if (!validateRequired(input)) {
    return false;
  } else if (!checkPrize(input.value, minPrize)) {
    addError(input, "Must be at least " + minPrize + " PLN");
    return false;
  }
  return true;
}

function checkPrize(value, minPrize) {
  const prize = Number(value);
  if (isNaN(prize)) {
    return false;
  } else if (prize < minPrize) {
    return false;
  }
  return true;
}

function validateFutureDate(input) {
  const inputDisabled = input.disabled;
  if (!isFutureDate(input.value) && !inputDisabled) {
    addError(input, "Must be future date");
    return false;
  }
  resetErrors(input);
  return true;
}

function isValidDate(value) {
  if (isNaN(Date.parse(value))) {
    return false;
  }
  return true;
}

function isFutureDate(value) {
  if (!isValidDate(value)) {
    return false;
  }
  const date = endOfTodayPlusDays(value, -1);
  return date > new Date();
}

function endOfTodayPlusDays(value, days) {
  const parsedDate = Date.parse(value);
  const ONE_DAY_MILLIS = days * 24 * 60 * 60 * 1000;
  const date = new Date(parsedDate + ONE_DAY_MILLIS);
  date.setHours(23);
  date.setMinutes(59);
  date.setSeconds(59);
  date.setMilliseconds(999);
  return date;
}
