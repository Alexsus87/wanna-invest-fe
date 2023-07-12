import { useEffect, useCallback, useState } from "react";
import axios from "axios";

import GlobeWrapper from "./GlobeWrapper";
import popData from "./test-data.json";

const World = () => {
  const [data, setData] = useState([])

  const getData = useCallback(async () => {

    try {
      const response = await axios.get(
        "https://lionfish-app-zv3go.ondigitalocean.app/api"
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
