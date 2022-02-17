let income = 0;
let balence = 0;

//For Updating Field texts/values
function updateFieldValue(value, fieldId) {
   const field =  document.getElementById(fieldId);
   field.innerText = value;
}

//reseting to it's default
function reset(isSavings) {
    if(isSavings) {
        //resetings savings and remaining balance
        updateFieldValue('00', 'savings-total');
        updateFieldValue('00', 'remaining-total');
    }
    else {
        income = 0;
        balence = 0;
        //resetings expense and balance
        updateFieldValue('00', 'expenses-total');
        updateFieldValue('00', 'balence-total');

        //resetings savings and remaining balance
        updateFieldValue('00', 'savings-total');
        updateFieldValue('00', 'remaining-total');
    }
}

//For Calculating expenses and savings
function updateAllAmounts(amount, fieldId, isExpenses) {
    const ErrorField = document.getElementById(fieldId);
    if(isExpenses) {
        //FOR EXPENSES
        if(amount <= income) {
            // updating Total Expenses and Balance 
            updateFieldValue(amount, 'expenses-total');
            balence = income - amount;
            updateFieldValue(balence, 'balence-total');
            ErrorField.style.display = 'none';
            reset(true); // reseting savings for new income and balance
        }
        else {
            ErrorField.innerText = "Opps ! Your expenses are much bigger then your income";
            ErrorField.style.display = 'block';
            reset(false);
        }
    } 
    else {
        //FOR SAVINGS
        //checking, is savings amount less then balance and balence isn't empty
        if(amount <= balence && balence > 0) {
            // updating Saving Amount and Remaining Balance
            updateFieldValue(amount, 'savings-total');
            const remainingBalance = balence - amount;
            updateFieldValue(remainingBalance, 'remaining-total');
            ErrorField.style.display = 'none';
        }
        else {
            ErrorField.innerText = "Opps ! Not enough balance for savings";
            ErrorField.style.display = 'block';
            reset(true);
        }
    }
}

//getting input values from input after validation
function getInputValue(inputId) {
    const inputField = document.getElementById(inputId);
    const inputFieldText = inputField.value;
    const inputValue = parseFloat(inputFieldText);
    const inputErrorField = document.getElementById(inputId+'-message');
    
    // Validating User inputs
    if (inputFieldText == '') {
        inputErrorField.innerText = "Empty field is not allowed";
        inputField.classList.add('is-invalid');
        return 'invalid';
    } 
    else if (isNaN(inputValue)) {
        inputErrorField.innerText = "Only number is allowed";
        inputField.classList.add('is-invalid');
        return 'invalid';
    } 
    else if(inputValue < 0) {
        inputErrorField.innerText = "negative value is not allowed";
        inputField.classList.add('is-invalid');
        return 'invalid';
    }
    else {
        inputField.classList.remove('is-invalid');
        inputField.classList.add('is-valid');
        return inputValue;
    }
}

//For calculating expenses from income
function calculateExpenses() {
    income = getInputValue('income-input');
    const foodCost = getInputValue('food-cost-input');
    const rentCost = getInputValue('rent-cost-input');
    const clothsCost = getInputValue('cloths-cost-input');
    
    //checking, is inputs valid or not
    if(income != 'invalid' && foodCost != 'invalid' && rentCost != 'invalid' 
    && clothsCost != 'invalid') {
        const totalExpenses = foodCost + rentCost + clothsCost;
        // To update expense and balance
        updateAllAmounts(totalExpenses, 'expense-error-message', true);
    }
    else reset(false);
}

//For Savings some amount from balance
function addSavings() {
    const savingsPercent  = getInputValue('savings-input');

    //Checking, is savings percent valid or not
    if(savingsPercent != 'invalid') {
        const savingsAmount = (income * savingsPercent) / 100;
        // To update savings and remaining balance
        updateAllAmounts(savingsAmount, 'savings-error-message', false);
    }
    else reset(true);
}