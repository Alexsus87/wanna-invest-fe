import { useEffect, useCallback, useState } from "react";
import axios from "axios";

import GlobeWrapper from "./GlobeWrapper";

const World = () => {
  const [data, setData] = useState([]);

  const getData = useCallback(async () => {
    try {
      const response = await axios.get(
        "https://lionfish-app-zv3go.ondigitalocean.app/api",
        {
          params: {
            year: 2022,
            groupBy: "city",
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

  return <GlobeWrapper data={data} />;
};

export default World;
