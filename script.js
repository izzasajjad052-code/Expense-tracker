const expenseForm = document.getElementById('expense-form');
const categoryInput = document.getElementById('category-input');
const amountInput = document.getElementById('amount-input');
const expenseList = document.getElementById('expense-list');
const totalAmount = document.getElementById('total-amount');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function displayExpenses() {
    const html = expenses.map((expense, index) => {
        return `<li>${expense.category}: $${expense.amount}
         <button onclick="deleteExpense(${index})">Delete</button></li>`;
    });
    expenseList.innerHTML = html.join('');
}

function updateTotalAmount() {
    const total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
    totalAmount.textContent = total.toFixed(2);
}

function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    updateTotalAmount();
}

expenseForm.addEventListener('submit', function (event) {
    event.preventDefault();
    const category = categoryInput.value.trim();
    const amount = amountInput.value;

    if (!category || amount <= 0) {
        alert('Please enter a valid category and amount.');
        return;
    }

    expenses.push({ category, amount });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    displayExpenses();
    updateTotalAmount();
    categoryInput.value = '';
    amountInput.value = '';
    expenseForm.reset();
});

displayExpenses();
updateTotalAmount();