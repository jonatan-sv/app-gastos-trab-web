import PropTypes from "prop-types";
import { TextField, Button, InputAdornment } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/pt-br";

export default function ExpensesForm({
  formData,
  handleChange,
  handleDateChange,
  handleRegister,
  limparLista,
}) {
  return (
    <form onSubmit={handleRegister}>
      <TextField
        required
        label="Gasto"
        name="gasto"
        placeholder="Digite no quê você gastou"
        autoComplete="off"
        value={formData.gasto}
        onChange={handleChange}
        fullWidth
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        required
        label="Valor"
        name="valor"
        type="number"
        placeholder="Digite o quanto você gastou"
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          },
          htmlInput: { min: "0.01", step: "0.01" },
        }}
        value={formData.valor}
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
          margin="normal"
        />
      </LocalizationProvider>

      <Button
        id="register_btn"
        variant="contained"
        type="submit"
        fullWidth
        sx={{ mt: 2 }}
      >
        Registrar
      </Button>

      <Button
        id="limpar"
        variant="contained"
        onClick={limparLista}
        fullWidth
        sx={{ mt: 2 }}
      >
        Limpar
      </Button>
    </form>
  );
}

ExpensesForm.propTypes = {
  formData: PropTypes.shape({
    gasto: PropTypes.string,
    valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    data: PropTypes.object.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  limparLista: PropTypes.func.isRequired,
};
