let income = 0;
let balence = 0;

// function UpdateField(value, fieldId) {
//    const field =  document.getElementById(fieldId);
//    field.innerText = value;
// }

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
        // inputField.classList.replace('is-invalid', 'is-valid');
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
    const balanceTotalField = document.getElementById('balence-total');
    const expenseTotalField = document.getElementById('expenses-total');

    //checking, is inputs valid or not
    if(income != 'invalid' && foodCost != 'invalid' && rentCost != 'invalid' 
    && clothsCost != 'invalid') {
        const expenses = foodCost + rentCost + clothsCost;
        const expenseErrorField = document.getElementById('expense-error-message');
        
        //Checking is expenses less then income
        if(expenses <= income) {
            expenseTotalField.innerText = expenses;
            balence = income - expenses;
            balanceTotalField.innerText = balence;
            expenseErrorField.style.display = 'none';
        }
        else {
            expenseErrorField.innerText = "Opps ! Your expenses are much bigger then your income"
            expenseErrorField.style.display = 'block';
            expenseTotalField.innerText = '00';
            balanceTotalField.innerText = '00';
        }
    }
    else {
        expenseTotalField.innerText = '00';
        balanceTotalField.innerText = '00';
    }
}

//For Savings some amount from balance
function addSavings() {
    const savingsPercent  = getInputValue('savings-input');
    const savingsErrorField = document.getElementById('savings-error-message');
    const savingsTotalField = document.getElementById('savings-total');
    const remainingTotalField = document.getElementById('remaining-total');
    
    //Checking, is savings percent valid or not
    if(savingsPercent != 'invalid') {
        const savings = (income * savingsPercent) / 100;
        
        //checking, is savings amount less then balance and balence isn't empty
        if(savings <= balence && balence > 0) {
            savingsTotalField.innerText = savings;
            remainingTotalField.innerText = balence - savings;
            savingsErrorField.style.display = 'none';
        }
        else {
            savingsErrorField.innerText = "Opps ! Not enough balance for savings";
            savingsErrorField.style.display = 'block';
            savingsTotalField.innerText = '00';
            remainingTotalField.innerText = '00';
        }
    }
    else {
        savingsTotalField.innerText = '00';
        remainingTotalField.innerText = '00';
    }
}