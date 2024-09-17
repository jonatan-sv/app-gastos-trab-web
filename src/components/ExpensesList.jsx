import PropTypes from "prop-types";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
} from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

export default function ExpensesList({
  gastos,
  calcularTotalGastos,
  removeItem,
}) {
  return (
    <Box sx={{ mt: 4 }} id="lista">
      <Typography variant="h6" gutterBottom>
        Lista de Gastos - Total: R$ {calcularTotalGastos()}
      </Typography>
      <List sx={{ width: "100%", maxWidth: "100%" }}>
        {gastos.map((gasto, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <AttachMoneyIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={`${gasto.gasto} - R$ ${gasto.valor}`}
              secondary={`Data: ${gasto.data.dia}/${gasto.data.mes}/${gasto.data.ano}`}
            />
            <Tooltip title="Remover">
              <IconButton
                aria-label="fingerprint"
                color="secondary"
                onClick={() => removeItem(index)}
              >
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

ExpensesList.propTypes = {
  gastos: PropTypes.arrayOf(
    PropTypes.shape({
      gasto: PropTypes.string.isRequired,
      valor: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      data: PropTypes.shape({
        dia: PropTypes.number.isRequired,
        mes: PropTypes.number.isRequired,
        ano: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  calcularTotalGastos: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};
