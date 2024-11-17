const ExpenseAmount = document.querySelector("#expense");
const expenseType = document.querySelector("#Enter-description");
const expenseCategory = document.querySelector("#category");
const form = document.querySelector("form");
const listToAdd = document.querySelector("#list-toadd");

const token = localStorage.getItem("Token"); 


form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const expenseDetails = {
    amount: parseFloat(ExpenseAmount.value),
    description: expenseType.value,
    category: expenseCategory.value,
  };

  try {
    const response = await axios.post(
      "http://localhost:3000/api/expenses",
      expenseDetails,
      {
        headers: {
          Authorization: token, // Include Authorization header
        },
      }
    );

    if (response.status === 200 || response.status === 201) {
      console.log("Expense added successfully:", response.data);
      renderExpenses(); 
      form.reset(); // Clear the form fields
    }
  } catch (error) {
    console.error("Error adding expense:");
  }
});


async function deleteExpense(id) {
  try {
    const response = await axios.delete(
      `http://localhost:3000/api/expenses/${id}`,
      {
        headers: {
          Authorization: token, // Include Authorization header
        },
      }
    );

    if (response.status === 204) {
      console.log("Expense deleted successfully:", response.data);
    } else {
      console.error("Failed to delete expense:", response.statusText);
    }
  } catch (error) {
    console.error("Error deleting expense:");
  }
}


async function renderExpenses() {
  try {
    const response = await axios.get("http://localhost:3000/api/expenses", {
      headers: { Authorization: token },
    });


    const expenses = response.data;
    listToAdd.innerHTML = ""; 
    console.log(token);

    // Populate the list with the fetched expenses
    expenses.forEach((expenseDetails) => {
      const expense = document.createElement("li");
      const expensedes = `${expenseDetails.amount}-${expenseDetails.description}-${expenseDetails.category}`;
      expense.textContent = expensedes;

      const delBtn = document.createElement("button");
      delBtn.textContent = "Delete Expense";

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit Expense";

      expense.append(editBtn, delBtn);
      listToAdd.append(expense);

      // Delete button functionality
      delBtn.addEventListener("click", async () => {
        await deleteExpense(expenseDetails.id);
        listToAdd.removeChild(expense); // Remove the expense from the DOM
      });

      // Edit button functionality
      editBtn.addEventListener("click", () => {
        ExpenseAmount.value = expenseDetails.amount;
        expenseType.value = expenseDetails.description;
        expenseCategory.value = expenseDetails.category;
        listToAdd.removeChild(expense); // Remove the expense from the DOM
        deleteExpense(expenseDetails.id); // Delete the expense for updating
      });
    });
  } catch (error) {
    console.log("Error fetching expenses:",error);
  }
}


renderExpenses();
