import GlobeWrapper from "./GlobeWrapper";

import popData from "./test-data.json";

const World = () => {
  return <GlobeWrapper data={popData} />;
};

export default World;
