import {
  useEffect,
  useCallback,
  useState,
  useLayoutEffect,
  useRef,
} from "react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import MainCard from "components/MainCard";

import GlobeWrapper from "./GlobeWrapper";
import Filters from "./Filters";

const PADDINGS = 120;

const World = () => {
  const widthRef = useRef();

  const [isLoading, setIsLoading] = useState(true);
  const [width, setWidth] = useState(0);
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
      const newData = initialData.filter(
        (item) => item.averagePropertyCost <= total
      );

      setData(newData);
    } else {
      setData(initialData);
    }
  };

  const getData = useCallback(
    async ({ interest, mortgageYears, investmentAmount } = {}) => {
      setIsLoading(true);

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
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getData();
  }, [getData]);

  useLayoutEffect(() => {
    setWidth(widthRef.current.offsetWidth);
  }, []);

  return (
    <>
      <div ref={widthRef} />
      <MainCard>
        <Filters onApply={onApplyChanges} />
        {isLoading ? (
          <CircularProgress />
        ) : (
          <GlobeWrapper data={data} type={type} width={width - PADDINGS} />
        )}
      </MainCard>
    </>
  );
};

export default World;
