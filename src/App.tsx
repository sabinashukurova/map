import { useState, useEffect } from 'react'
import ReactMapGl, { Popup, Marker, LngLatBounds } from 'react-map-gl';
import { IData } from '../src/type';
import 'mapbox-gl/dist/mapbox-gl.css';
import CustomPopup from './Components/CustomPopup';
import Supercluster, { PointFeature } from 'supercluster';
import * as StarbucksData from './data/starbucks_data.json'

const data: any = StarbucksData;

const geoData: PointFeature<IData>[] = data.items.map((row: IData) => {

  return {
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [row.longitude, row.latitude],
    },
    properties: row,
  };
});

const index = new Supercluster({
  radius: 36,
  maxZoom: 16
});
index.load(geoData);


function App() {
  const [popupInfo, setPopupInfo] = useState<null | PointFeature<IData>>(null);
  const [markers, setMarkers] = useState<any>()
  const [bounds, setBounds] = useState<LngLatBounds | undefined>();
  const [zoom, setZoom] = useState<number>(2)

    useEffect(() => {
    if (!bounds) return;
    const m = index.getClusters([bounds.getWest(), bounds.getSouth(), bounds.getEast(), bounds.getNorth()], zoom)
    setMarkers(m)
  }, [bounds, zoom]);


  return ( 
    <>
      <ReactMapGl
      initialViewState={{
        longitude: -100,
        latitude: 40,
        zoom: 3.5,
      }}
      style={{ width: "100%", height: "98vh", }}
      mapStyle="mapbox://styles/mapbox/dark-v9"
      mapboxAccessToken={"YOUR_API_KEY"}
      onZoom={(e) => {
        setZoom(e.target.getZoom())
        setBounds(e.target.getBounds())
      }}
      onDrag={(e) => {
        setZoom(e.target.getZoom())
        setBounds(e.target.getBounds())
      }}>
        {
          markers?.map((item: PointFeature<IData>) => {
            return <Marker
              longitude={item.geometry.coordinates[0]}
              latitude={item.geometry.coordinates[1]}
              key={item.id}
            >
              <button
                className="marker-btn"
                onClick={() => {
                  setPopupInfo(item)
                }}
              >
                {item.properties.point_count}
              </button>
              {popupInfo && (
                <Popup
                  anchor="top"
                  latitude={popupInfo.geometry.coordinates[1]}
                  longitude={popupInfo.geometry.coordinates[0]}
                  onClose={() => setPopupInfo(null)}
                  closeOnClick={false}
                >
                  <CustomPopup leaves={popupInfo.id && typeof popupInfo.id === 'number'
                  ? index.getLeaves(popupInfo.id)
                  :
                  [{properties: popupInfo.properties}]} />
                </Popup>
              )}
            </Marker>
          })}
      </ReactMapGl>
    </>
  )
}

export default App;