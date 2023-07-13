import { useEffect, useCallback, useState } from "react";
import axios from "axios";

import MainCard from "components/MainCard";

import GlobeWrapper from "./GlobeWrapper";
import Filters from "./Filters";

const World = () => {
  const [data, setData] = useState([]);
  const [initialData, setInitialData] = useState([]);
  const [type, setType] = useState("sum");

  const onApplyChanges = ({ roi, total, interest, mortgageYears }) => {
    if (roi === "cashOnCash") {
      getData({ interest, mortgageYears, investmentAmount: total });
      setType(roi);
      return;
    } else {
      setType(roi);
    }

    if (total) {
      const newData = data.filter((item) => item.sum <= total);

      setData(newData);
    } else {
      setData(initialData);
    }
  };

  const getData = useCallback(
    async ({ interest, mortgageYears, investmentAmount } = {}) => {
      try {
        const response = await axios.get(
          "https://lionfish-app-zv3go.ondigitalocean.app/api",
          {
            params: {
              year: 2022,
              groupBy: "city",
              country: "United States",
              interestRate: interest,
              mortgageYears,
              investmentAmount,
            },
          }
        );

        setData(response.data);

        if (!interest && !mortgageYears && !investmentAmount) {
          setInitialData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    []
  );

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <MainCard>
      <Filters onApply={onApplyChanges} />
      <GlobeWrapper data={data} type={type} />
    </MainCard>
  );
};

export default World;
