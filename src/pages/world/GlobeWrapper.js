import { useRef } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

import { roiTypes } from "./constants";

const weightColor = d3
  .scaleSequentialSqrt(d3.interpolateYlOrRd)
  .domain([0, 1e7]);

const USDollar = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const GlobeWrapper = ({ data, type }) => {
  const globeEl = useRef();

  const _type = type || "sum";

  return (
    <Card>
      <CardContent>
        <div>
          <Globe
            ref={globeEl}
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
            bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
            backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
            hexBinPointsData={data}
            hexBinPointWeight={_type}
            hexAltitude={(d) => d.sumWeight * roiTypes[_type].coefficient}
            hexTopColor={(d) => weightColor(d.sumWeight)}
            hexSideColor={(d) => weightColor(d.sumWeight)}
            hexLabel={(d) => {
              return `
                            <div style="background-color: white; padding: 5px; color: black; border-radius: 3px;">
                                <span>City: <b>${d.points[0]._id}</b></span>
                                <br />
                                <span>Booking count: <b>${
                                  d.points[0].count
                                }</b></span>
                                <br />
                                <span>
                                    ${roiTypes[_type].title}: 
                                        <b>
                                            ${
                                              roiTypes[_type].prefix
                                                ? USDollar.format(
                                                    d.points[0][_type]
                                                  )
                                                : +d.points[0][_type].toFixed(2)
                                            }${
                roiTypes[_type].suffix ? roiTypes[_type].suffix : ""
              }
                                        </b>
                                </span>
                            </div>
                        `;
            }}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default GlobeWrapper;
