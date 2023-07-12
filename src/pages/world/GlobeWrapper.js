import { useRef } from "react";
import Globe from "react-globe.gl";
import * as d3 from "d3";
import { SizeMe } from "react-sizeme";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const weightColor = d3
  .scaleSequentialSqrt(d3.interpolateYlOrRd)
  .domain([0, 1e7]);

const GlobeWrapper = ({ data }) => {
  const globeEl = useRef();

  return (
    <Card>
      <CardContent>
        <SizeMe monitorWidth>
          {({ size: { width } }) => (
            <div>
              <Globe
                ref={globeEl}
                width={width}
                height={width / (4 / 3)}
                globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
                bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
                hexBinPointsData={data}
                hexBinPointWeight="sum"
                hexAltitude={(d) => d.sumWeight * 0.000001}
                hexTopColor={(d) => weightColor(d.sumWeight)}
                hexSideColor={(d) => weightColor(d.sumWeight)}
                hexLabel={(d) => {
                  return `
                            <div style="background-color: white; padding: 5px; color: black; border-radius: 3px;">
                                <span>Booking count: <b>${d.points[0].count}</b></span>
                                <br />
                                <span>Sum: <b>${d.points[0].sum}</b></span>
                            </div>
                        `;
                }}
              />
            </div>
          )}
        </SizeMe>
      </CardContent>
    </Card>
  );
};

export default GlobeWrapper;
