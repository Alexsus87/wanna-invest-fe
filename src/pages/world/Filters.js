import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import "./Filters.css";

const Filters = ({ onApply }) => {
  const [roi, setRoi] = useState("CASH_FLOW");
  const [total, setTotal] = useState(null);

  const handleRoiChange = (event) => {
    setRoi(event.target.value);
  };

  const handleTotalChange = (event) => {
    setTotal(event.target.value);
  };

  const handleApply = () => {
    onApply({ roi, total });
  };

  return (
    <Card className="filters">
      <CardContent>
        <FormControl variant="standard" className="filter">
          <InputLabel id="roi"></InputLabel>
          <Select
            labelId="roi"
            id="roi"
            value={roi}
            onChange={handleRoiChange}
            label=""
          >
            <MenuItem value={"CASH_FLOW"}>Cash flow</MenuItem>

            <MenuItem value={"CASH_ON_CASH"}>Cash-on-Cash</MenuItem>

            <MenuItem value={"CAP_RATE"}>Cap rate</MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="standard">
          <TextField
            id="total-investment"
            label="Total Investment"
            variant="standard"
            value={total}
            onChange={handleTotalChange}
            inputProps={{ type: "number" }}
          />
        </FormControl>

        <Button variant="contained" className="apply" onClick={handleApply}>
          Apply
        </Button>
      </CardContent>
    </Card>
  );
};

export default Filters;
