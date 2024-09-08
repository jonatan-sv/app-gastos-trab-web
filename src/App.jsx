import { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import 'dayjs/locale/pt-br';
import './App.css';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

const FormExample = () => {
  const dataKey = "gastos";

  const initialFormData = {
    gasto: '',
    valor: '',
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

  // Função para lidar com o envio do formulário
  const handleRegister = (e) => {
    e.preventDefault();
    const novoGasto = {
      ...formData,
      valor: parseFloat(formData.valor) || 0,
      data: {
        dia: formData.data.date(),
        mes: formData.data.month() + 1, // +1 para corrigir o índice do mês
        ano: formData.data.year(),
      },
    };
    // Atualizar
    const gastosAtualizados = [...gastos, novoGasto];
    setGastos(gastosAtualizados);
    // Armazenar
    localStorage.setItem(dataKey, JSON.stringify(gastosAtualizados));
    // Resetar
    setFormData(initialFormData);
  };

  // Calcular o total de gastos
  const calcularTotalGastos = () => {
    const total = gastos.reduce((accumulator, gasto) => accumulator + (parseFloat(gasto.valor) || 0), 0);
    return total.toFixed(2);
  };

  // Carregar os dados do localStorage ao carregar o componente
  useEffect(() => {
    const savedGastos = JSON.parse(localStorage.getItem(dataKey)) || [];
    setGastos(savedGastos);
  }, []);

  return (
    <Box sx={{ width: '100%', maxWidth: 500, margin: 'auto', padding: 2 }}>
      <Typography variant="h6" id="titulo" gutterBottom>
        <AttachMoneyIcon/>
        Cadastro de Gastos
        <AttachMoneyIcon/>
      </Typography>
      <form onSubmit={handleRegister}>
        <TextField
          label="Gasto"
          name="gasto"
          placeholder="Digite no quê você gastou"
          value={formData.gasto}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Valor"
          name="valor"
          type="number"
          placeholder="Digite o quanto você gastou"
          InputProps={{ startAdornment: 'R$ㅤ' }}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
          <DatePicker
            label="Data"
            value={formData.data}
            onChange={handleDateChange}
            slotProps={{ textField: { fullWidth: true, margin: "normal" } }}
          />
        </LocalizationProvider>

        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth
          sx={{ mt: 2 }}
        >
          Registrar
        </Button>
      </form>

      <Box sx={{ mt: 4 }} id="lista">
        <Typography variant="h6" gutterBottom>
          Lista de Gastos - Total: R$ {calcularTotalGastos()}
        </Typography>
        <List sx={{ width: '100%', maxWidth: '100%' }}>
          {
            gastos.map((gasto, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <AttachMoneyIcon />
                </ListItemIcon>
                <ListItemText
                  primary={`${gasto.gasto} - R$ ${gasto.valor}`}
                  secondary={`Data: ${gasto.data.dia}/${gasto.data.mes}/${gasto.data.ano}`}
                />
              </ListItem>
            ))
          }
        </List>
      </Box>
    </Box>
  );
};

export default FormExample;
