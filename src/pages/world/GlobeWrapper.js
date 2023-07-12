import { useRef } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";

const weightColor = d3
  .scaleSequentialSqrt(d3.interpolateYlOrRd)
  .domain([0, 1e7]);

const GlobeWrapper = ({ data }) => {
  const globeEl = useRef();

  return (
    <Globe
      ref={globeEl}
      globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
      backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      hexBinPointsData={data}
      hexBinPointWeight="pop"
      hexAltitude={(d) => d.sumWeight * 6e-8}
      hexBinResolution={4}
      hexTopColor={(d) => weightColor(d.sumWeight)}
      hexSideColor={(d) => weightColor(d.sumWeight)}
      hexBinMerge={true}
      enablePointerInteraction={false}
    />
  );
};

export default GlobeWrapper;
