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

function calculateExpenses() {
    income = getInputValue('income-input');
    const foodCost = getInputValue('food-cost-input');
    const rentCost = getInputValue('rent-cost-input');
    const clothsCost = getInputValue('cloths-cost-input');
    
    //checking, is inputs valid or not
    if(income != 'invalid' && foodCost != 'invalid' && rentCost != 'invalid' 
    && clothsCost != 'invalid') {
        const expenses = foodCost + rentCost + clothsCost;
        const expenseErrorField = document.getElementById('expense-error-message');
        
        //Checking is expenses less then income
        if(expenses <= income) {
            // updating Total Expenses and Balance 
            updateFieldValue(expenses, 'expenses-total');
            balence = income - expenses;
            updateFieldValue(balence, 'balence-total');
            expenseErrorField.style.display = 'none';
        }
        else {
            expenseErrorField.innerText = "Opps ! Your expenses are much bigger then your income"
            expenseErrorField.style.display = 'block';
            reset(false);
        }
    }
    else reset(false);
}

//For Savings some amount from balance
function addSavings() {
    const savingsPercent  = getInputValue('savings-input');

    //Checking, is savings percent valid or not
    if(savingsPercent != 'invalid') {
        const savings = (income * savingsPercent) / 100;
        const savingsErrorField = document.getElementById('savings-error-message');
        
        //checking, is savings amount less then balance and balence isn't empty
        if(savings <= balence && balence > 0) {
            // updating Saving Amount and Remaining Balance
            updateFieldValue(savings, 'savings-total');
            const remainingBalance = balence - savings;
            updateFieldValue(remainingBalance, 'remaining-total');
            savingsErrorField.style.display = 'none';
        }
        else {
            savingsErrorField.innerText = "Opps ! Not enough balance for savings";
            savingsErrorField.style.display = 'block';
            reset(true);
        }
    }
    else reset(true);
}