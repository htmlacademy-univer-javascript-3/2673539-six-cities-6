import React, { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import { CityType } from '../../types/offer';
import { OfferInMap } from '../../types/offer';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from '../../const';
import useMap from '../../hooks/use-map/use-map';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: CityType;
  offers: OfferInMap[];
  currentOffer: OfferInMap | undefined;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40]
});

const Map: React.FC<MapProps> = ({ city, offers, currentOffer }) => {

  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    if (map) {
      map.setView(
        {
          lat: city.location.latitude,
          lng: city.location.longitude
        },
        city.location.zoom
      );
    }
  }, [map, city]);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude
        });
        marker
          .setIcon(
            currentOffer !== undefined && offer.id === currentOffer.id
              ? currentCustomIcon
              : defaultCustomIcon
          )
          .addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, currentOffer]);

  return (<div style={{ height: '100%', width: '100%' }} ref={mapRef}></div>);
};

export default Map;
