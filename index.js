const ExpenseAmount = document.querySelector("#expense");
const expenseType = document.querySelector("#Enter-description");
const expenseCategory = document.querySelector("#category");
const form = document.querySelector("form");
const listToAdd = document.querySelector("#list-toadd");

async function renderExpenses() {
  try {
    const response = await fetch("http://localhost:3000/api/expenses");
    const expenses = await response.json();
    

    listToAdd.innerHTML = "";
    
    expenses.forEach(expenseDetails => {
      const expense = document.createElement("li");
      const expensedes = `${expenseDetails.amount}-${expenseDetails.description}-${expenseDetails.category}`;
      expense.textContent = expensedes;
      
      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete Expense";
      
      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit Expense";
      
      expense.append(editBtn, delBtn);
      listToAdd.append(expense);
      
    
      delBtn.addEventListener("click", async () => {
        await deleteExpense(expenseDetails.id);
        listToAdd.removeChild(expense);
      });

 
      editBtn.addEventListener("click", () => {
        ExpenseAmount.value = expenseDetails.amount;
        expenseType.value = expenseDetails.description;
        expenseCategory.value = expenseDetails.category;
        listToAdd.removeChild(expense);
        deleteExpense(expenseDetails.id); 
      });
    });
  } catch (error) {
    console.error("Error fetching expenses:", error);
  }
}


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const expenseDetails = {
    amount: parseFloat(ExpenseAmount.value),
    description: expenseType.value,
    category: expenseCategory.value,
  };

  try {
    const response = await fetch("http://localhost:3000/api/expenses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(expenseDetails),
    });

    if (response.ok) {
      renderExpenses();
      form.reset(); 
    } else {
      console.error("Failed to add expense:", response.statusText);
    }
  } catch (error) {
    console.error("Error adding expense:", error);
  }
});

// Delete an expense
async function deleteExpense(id) {
  try {
    const response = await fetch(`http://localhost:3000/api/expenses/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      console.error("Failed to delete expense:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting expense:", error);
  }
}


renderExpenses();
