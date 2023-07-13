import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

import { roiTypes } from "./constants";
import "./Filters.css";

const Filters = ({ onApply }) => {
  const [roi, setRoi] = useState("");
  const [total, setTotal] = useState("");
  const [interest, setInterest] = useState("");
  const [mortgageYears, setMortgageYears] = useState("");

  const handleRoiChange = (event) => {
    setRoi(event.target.value);
  };

  const handleTotalChange = (event) => {
    setTotal(event.target.value);
  };

  const handleInterestChange = (event) => {
    setInterest(event.target.value);
  };

  const handleMortgageYearsChange = (event) => {
    setMortgageYears(event.target.value);
  };

  const handleApply = () => {
    onApply({ roi, total, interest, mortgageYears });
  };

  return (
    <Card className="filters">
      <CardContent>
        <FormControl variant="standard" className="filter select">
          <InputLabel id="roi"></InputLabel>
          <Select
            labelId="roi"
            id="roi"
            value={roi}
            onChange={handleRoiChange}
            label=""
          >
            <MenuItem value={"sum"}>Market volume</MenuItem>

            <MenuItem value={"cashFlow"}>{roiTypes.cashFlow.title}</MenuItem>

            <MenuItem value={"cashOnCash"}>
              {roiTypes.cashOnCash.title}
            </MenuItem>

            <MenuItem value={"capRate"}>{roiTypes.capRate.title}</MenuItem>
          </Select>
        </FormControl>

        {roi === "cashOnCash" ? (
          <>
            <FormControl variant="standard" className="filter">
              <TextField
                id="interest-rate"
                label="Interest rate"
                variant="standard"
                value={interest}
                onChange={handleInterestChange}
                inputProps={{ type: "number" }}
              />
            </FormControl>

            <FormControl variant="standard" className="filter">
              <TextField
                id="mortgage-years"
                label="Mortgage years"
                variant="standard"
                value={mortgageYears}
                onChange={handleMortgageYearsChange}
                inputProps={{ type: "number" }}
              />
            </FormControl>
          </>
        ) : null}

        <FormControl variant="standard" className="filter">
          <TextField
            id="total-investment"
            label="Investment amount"
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
