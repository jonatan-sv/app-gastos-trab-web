import { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import dayjs from "dayjs";
import ExpensesForm from "./components/ExpensesForm";
import ExpensesList from "./components/ExpensesList";
import "./App.css";

export default function App() {
  const dataKey = "gastos";

  const initialFormData = {
    gasto: "",
    valor: "",
    data: dayjs(),
  };

  const [formData, setFormData] = useState(initialFormData);
  const [gastos, setGastos] = useState([]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDateChange = (newValue) => {
    setFormData({
      ...formData,
      data: newValue,
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const novoGasto = {
      ...formData,
      valor: parseFloat(formData.valor) || 0,
      data: {
        dia: formData.data.date(),
        mes: formData.data.month() + 1,
        ano: formData.data.year(),
      },
    };
    const gastosAtualizados = [...gastos, novoGasto];
    setGastos(gastosAtualizados);
    localStorage.setItem(dataKey, JSON.stringify(gastosAtualizados));
    setFormData(initialFormData);
  };

  const calcularTotalGastos = () => {
    const total = gastos.reduce(
      (acc, gasto) => acc + (parseFloat(gasto.valor) || 0),
      0
    );
    return total.toFixed(2);
  };

  useEffect(() => {
    const savedGastos = JSON.parse(localStorage.getItem(dataKey)) || [];
    setGastos(savedGastos);
  }, []);

  const limparLista = () => {
    localStorage.removeItem(dataKey);
    setGastos([]);
  };

  return (
    <Box id="app_box">
      <Typography variant="h6" id="titulo" gutterBottom>
        <AttachMoneyIcon />
        Cadastro de Gastos
        <AttachMoneyIcon />
      </Typography>

      <ExpensesForm
        formData={formData}
        handleChange={handleChange}
        handleDateChange={handleDateChange}
        handleRegister={handleRegister}
        limparLista={limparLista}
      />

      <ExpensesList gastos={gastos} calcularTotalGastos={calcularTotalGastos} />
    </Box>
  );
}
