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
  clearList,
}) {
  return (
    <form onSubmit={handleRegister}>
      <TextField
        required
        label="Expense"
        name="expense"
        placeholder="Digite no quê você gastou"
        autoComplete="off"
        value={formData.expense}
        onChange={handleChange}
        fullWidth
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <TextField
        required
        label="Amount"
        name="amount"
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
        value={formData.amount}
        onChange={handleChange}
        fullWidth
        margin="normal"
      />

      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
        <DatePicker
          label="Date"
          value={formData.date}
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
        onClick={clearList}
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
    expense: PropTypes.string.isRequired,
    amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
      .isRequired,
    date: PropTypes.object.isRequired,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleDateChange: PropTypes.func.isRequired,
  handleRegister: PropTypes.func.isRequired,
  clearList: PropTypes.func.isRequired,
};