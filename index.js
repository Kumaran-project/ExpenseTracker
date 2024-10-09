const ExpenseAmount = document.querySelector("#expense");
const expenseType = document.querySelector("#Enter-description");
const expenseCategory = document.querySelector("#category");
const form = document.querySelector("form");
const listToAdd = document.querySelector("#list-toadd");
console.log(expenseCategory, expenseType, form, ExpenseAmount, listToAdd);


function renderExpenses() {
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  
  expenses.forEach(expenseDetails => {
    const expense = document.createElement("li");
    const expensedes = `${expenseDetails.ExpenseAmount}-${expenseDetails.expenseType}-${expenseDetails.ExpenseCategory}`;
    expense.textContent = expensedes;
    
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete Expense";
    
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit Expense";
    
    expense.append(editBtn, delBtn);
    listToAdd.append(expense);
    
   
    delBtn.addEventListener('click', () => {
      listToAdd.removeChild(expense);
      expenses = expenses.filter(item => item.ExpenseAmount !== expenseDetails.ExpenseAmount ||
                                          item.expenseType !== expenseDetails.expenseType ||
                                          item.ExpenseCategory !== expenseDetails.ExpenseCategory);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    });

    editBtn.addEventListener("click", () => {
      const edited = expense.textContent.split("-");
      ExpenseAmount.value = edited[0].trim();
      expenseType.value = edited[1].trim();
      expenseCategory.value = edited[2].trim();
      listToAdd.removeChild(expense);
      
      expenses = expenses.filter(item => item.ExpenseAmount !== expenseDetails.ExpenseAmount ||
                                          item.expenseType !== expenseDetails.expenseType ||
                                          item.ExpenseCategory !== expenseDetails.ExpenseCategory);
      localStorage.setItem("expenses", JSON.stringify(expenses));
    });
  });
}

renderExpenses();

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const expense = document.createElement("li");
  const expensedes = `${ExpenseAmount.value}-${expenseType.value}-${expenseCategory.value}`;
  expense.textContent = expensedes;
  
  const delBtn = document.createElement("button");
  delBtn.textContent = "Delete Expense";
  
  const editBtn = document.createElement("button");
  editBtn.textContent = "Edit Expense";
  
  expense.append(editBtn, delBtn);
  listToAdd.append(expense);
  
  const expenseDetails = {
    ExpenseAmount: ExpenseAmount.value,
    expenseType: expenseType.value,
    ExpenseCategory: expenseCategory.value,
  };
  
  let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
  expenses.push(expenseDetails);
  
  localStorage.setItem("expenses", JSON.stringify(expenses));
  form.reset();

 
  delBtn.addEventListener('click', () => {
    listToAdd.removeChild(expense);
    expenses = expenses.filter(item => item.ExpenseAmount !== expenseDetails.ExpenseAmount ||
                                        item.expenseType !== expenseDetails.expenseType ||
                                        item.ExpenseCategory !== expenseDetails.ExpenseCategory);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    
  });

 
  editBtn.addEventListener("click", () => {
    const edited = expense.textContent.split("-");
    ExpenseAmount.value = edited[0].trim();
    expenseType.value = edited[1].trim();
    expenseCategory.value = edited[2].trim();
    listToAdd.removeChild(expense);
    
    expenses = expenses.filter(item => item.ExpenseAmount !== expenseDetails.ExpenseAmount ||
                                        item.expenseType !== expenseDetails.expenseType ||
                                        item.ExpenseCategory !== expenseDetails.ExpenseCategory);
    localStorage.setItem("expenses", JSON.stringify(expenses));
  });
});
