const expenseForm = document.getElementById("expense-form");
const expenseTable = document.getElementById("expense-table").getElementsByTagName("tbody")[0];
const totalDisplay = document.getElementById("total");

// Backend URL with port 8081
const API_URL = "http://localhost:8081/api/expenses";

// Fetch and Render expenses from Database
async function renderExpenses() {
    try {
        const response = await fetch(API_URL);
        const expenses = await response.json();
        
        expenseTable.innerHTML = "";
        let total = 0;

        expenses.forEach((expense) => {
            total += expense.amount;
            let row = expenseTable.insertRow();
            row.insertCell(0).innerText = expense.date;
            row.insertCell(1).innerText = expense.category;
            row.insertCell(2).innerText = expense.amount;
            row.insertCell(3).innerText = expense.description;

            let actionCell = row.insertCell(4);
            let deleteBtn = document.createElement("button");
            deleteBtn.innerText = "Delete";
            deleteBtn.classList.add("delete-btn");
            deleteBtn.onclick = () => deleteExpense(expense.id);
            actionCell.appendChild(deleteBtn);
        });
        totalDisplay.innerText = total;
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Add Expense to Database
expenseForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const newExpense = {
        date: document.getElementById("date").value,
        category: document.getElementById("category").value,
        amount: parseFloat(document.getElementById("amount").value),
        description: document.getElementById("description").value
    };

    try {
        await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(newExpense)
        });
        renderExpenses(); // Refresh list
        expenseForm.reset();
        document.getElementById("date").valueAsDate = new Date();
    } catch (error) {
        console.error("Error saving data:", error);
    }
});

// Delete function
async function deleteExpense(id) {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    renderExpenses();
}

// Initial render
renderExpenses();
document.getElementById("date").valueAsDate = new Date();