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
  expenses,
  calculateTotalExpenses,
  removeItem,
}) {
  return (
    <Box sx={{ mt: 4 }} id="list">
      <Typography variant="h6" gutterBottom>
        Lista de Gastos - Total: R$ {calculateTotalExpenses()}
      </Typography>
      <List sx={{ width: "100%", maxWidth: "100%" }}>
        {expenses.map((expense, index) => (
          <ListItem key={index}>
            <ListItemIcon>
              <AttachMoneyIcon color="primary" />
            </ListItemIcon>
            <ListItemText
              primary={`${expense.expense} - R$ ${expense.amount}`}
              secondary={`Data: ${expense.date.day}/${expense.date.month}/${expense.date.year}`}
            />
            <Tooltip title="Remover">
              <IconButton
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
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      expense: PropTypes.string.isRequired,
      amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
        .isRequired,
      date: PropTypes.shape({
        day: PropTypes.number.isRequired,
        month: PropTypes.number.isRequired,
        year: PropTypes.number.isRequired,
      }).isRequired,
    })
  ).isRequired,
  calculateTotalExpenses: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
};