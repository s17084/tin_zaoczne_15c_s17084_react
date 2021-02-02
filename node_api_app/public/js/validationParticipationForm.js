function validateForm() {
    const playerInput = document.getElementById("player");
    const tournamentInput = document.getElementById("tournament");
    const finalPositionInput = document.getElementById("finalPosition");
    const rankPointsInput = document.getElementById("rankPointsGained");
    const rankPointsOverallInput = document.getElementById("rankPointsOverall");
    const errorsSummary = document.getElementById("errorsSummary");

    resetErrors([
        playerInput,
        tournamentInput,
        finalPositionInput,
        rankPointsInput,
        rankPointsOverallInput,
    ]);

    let validations = [];

    validations.push(validateRequired(playerInput));
    validations.push(validateRequired(tournamentInput));
    validations.push(validatePositiveNumber(finalPositionInput));
    validations.push(validatePositiveNumber(rankPointsInput));
    validations.push(validateRankPointsOverall(rankPointsOverallInput));

    let valid = !validations.includes(false);

    if (!valid) {
        errorsSummary.innerText = "Form is invalid";
    }

    return valid;
}

function validateRankPointsOverall(input){
    const rankPointsGained = document.getElementById("rankPointsGained").value;
    if (!isPositiveNumber(input.value)) {
        addError(input, "Must be greater than 0");
        return false;
    }else if(!isGreaterThanOrEquals(input.value, rankPointsGained)){
        addError(input, "Must be greater than or equals to rank points gained")
        return false;
    }
    return true;
}

function validatePositiveNumber(input) {
    if (!isPositiveNumber(input.value)) {
        addError(input, "Must be greater than 0");
        return false;
    }
    return true;
}

function isPositiveNumber(value){
    const number = Number(value);
    if (isNaN(number)) {
        return false;
    } else if (number < 0) {
        return false;
    }
    return true;
}

function isGreaterThanOrEquals(val1, val2){
    const num1 = Number(val1);
    const num2 = Number(val2);
    if(isNaN(num1) || isNaN(num2)){
        return false;
    }else if(num1 < num2){
        return false;
    }
    return true;
}