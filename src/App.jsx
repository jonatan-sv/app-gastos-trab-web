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

  const removerItem = (index) => {
    const gastosAtualizados = gastos.filter((_, i) => i !== index);
    setGastos(gastosAtualizados);
    localStorage.setItem(dataKey, JSON.stringify(gastosAtualizados));
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar></Navbar>
        <div id="main_div">
          <Box id="app_box">
            <Typography variant="h3" id="titulo" gutterBottom>
              Cadastro de Gastos
            </Typography>

            <ExpensesForm
              formData={formData}
              handleChange={handleChange}
              handleDateChange={handleDateChange}
              handleRegister={handleRegister}
              limparLista={limparLista}
            />

            <ExpensesList
              gastos={gastos}
              calcularTotalGastos={calcularTotalGastos}
              removeItem={removerItem}
            />
          </Box>
        </div>
      </ThemeProvider>
    </>
  );
}
