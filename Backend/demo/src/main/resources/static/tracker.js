const API_URL = "http://localhost:8081/api/expenses";

async function renderExpenses() {
    try {
        const response = await fetch(API_URL);
        const expenses = await response.json();
        const tbody = document.querySelector("#expense-table tbody");
        tbody.innerHTML = "";
        let total = 0;

        expenses.forEach(exp => {
            total += exp.amount;
            let row = tbody.insertRow();
            row.innerHTML = `
                <td>${exp.date}</td>
                <td>${exp.category}</td>
                <td>₹${exp.amount}</td>
                <td>${exp.description}</td>
                <td><button onclick="deleteExpense(${exp.id})" style="background:red; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">Delete</button></td>
            `;
        });

        document.getElementById("total").innerText = total;

        // BUDGET ALERT LOGIC (₹500 mela pona alert varum)
        if (total > 500) {
            setTimeout(() => {
                alert("🚨 Budget Over! Total: ₹" + total + ". Control pannu da!");
            }, 300);
        }
    } catch (e) { console.error("Error:", e); }
}

document.getElementById("expense-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        date: document.getElementById("date").value,
        category: document.getElementById("category").value,
        amount: parseFloat(document.getElementById("amount").value),
        description: document.getElementById("description").value
    };
    await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    document.getElementById("expense-form").reset();
    renderExpenses();
});

async function deleteExpense(id) {
    if(confirm("Delete panna va?")) {
        await fetch(`${API_URL}/${id}`, { method: "DELETE" });
        renderExpenses();
    }
}

window.onload = renderExpenses;