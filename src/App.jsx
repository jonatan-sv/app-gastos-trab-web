import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./styles/Theme";
import "./styles/Style.css";
import ExpensesForm from "./components/ExpensesForm";
import ExpensesList from "./components/ExpensesList";
import Navbar from "./components/Navbar";

export default function App() {
  const dataKey = "expenses";

  const initialFormData = {
    expense: "",
    amount: "",
    date: dayjs(),
  };

  const [formData, setFormData] = useState(initialFormData);
  const [expenses, setExpenses] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      date: newValue,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const newExpense = {
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      date: {
        day: formData.date.date(),
        month: formData.date.month() + 1,
        year: formData.date.year(),
      },
    };
    const updatedExpenses = [...expenses, newExpense];
    setExpenses(updatedExpenses);
    localStorage.setItem(dataKey, JSON.stringify(updatedExpenses));
    setFormData(initialFormData);
  };

  const calculateTotalExpenses = () => {
    const total = expenses.reduce(
      (acc, expense) => acc + (parseFloat(expense.amount) || 0),
      0
    );
    return total.toFixed(2);
  };

  useEffect(() => {
    const savedExpenses = JSON.parse(localStorage.getItem(dataKey)) || [];
    setExpenses(savedExpenses);
  }, []);

  const clearList = () => {
    localStorage.removeItem(dataKey);
    setExpenses([]);
  };

  const removeItem = (index) => {
    const updatedExpenses = expenses.filter((_, i) => i !== index);
    setExpenses(updatedExpenses);
    localStorage.setItem(dataKey, JSON.stringify(updatedExpenses));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar></Navbar>
        <div id="main_div">
          <Box id="app_box">
            <Typography variant="h3" id="titulo" gutterBottom>
              Registro de Gastos
            </Typography>

            <ExpensesForm
              formData={formData}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
              handleRegister={handleRegister}
              clearList={clearList}
            />

            <ExpensesList
              expenses={expenses}
              calculateTotalExpenses={calculateTotalExpenses}
              removeItem={removeItem}
            />
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
}