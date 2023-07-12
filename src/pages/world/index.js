import { useEffect, useCallback, useState } from "react";
import axios from "axios";

import MainCard from "components/MainCard";

import GlobeWrapper from "./GlobeWrapper";
import Filters from "./Filters";

const World = () => {
  const [data, setData] = useState([]);

  const onApplyChanges = ({ count, roi, total }) => {
    console.log(count, roi, total);
  };

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://lionfish-app-zv3go.ondigitalocean.app/api",
        {
          params: {
            year: 2022,
            groupBy: "city",
            country: "United States",
          },
        }
      );
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    getData();
  }, [getData]);

  return (
    <MainCard>
      <Filters onApply={onApplyChanges} />
      <GlobeWrapper data={data} />
    </MainCard>
  );
};

export default World;
