import React, { useRef, useEffect, useMemo } from 'react';
import { Icon, Marker, layerGroup, LayerGroup } from 'leaflet';
import { CityType, OfferInMap } from '../../types/offer';
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
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const MapComponent: React.FC<MapProps> = ({ city, offers, currentOffer }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const markerLayerRef = useRef<LayerGroup | null>(null);

  const map = useMap(mapRef, city);

  const cityPosition = useMemo(
    () => ({
      lat: city.location.latitude,
      lng: city.location.longitude,
      zoom: city.location.zoom,
    }),
    [city]
  );

  const memoizedMarkers = useMemo(
    () =>
      offers.map((offer) => ({
        id: offer.id,
        lat: offer.location.latitude,
        lng: offer.location.longitude,
        isActive: currentOffer?.id === offer.id,
      })),
    [offers, currentOffer]
  );

  useEffect(() => {
    if (map) {
      map.setView(
        { lat: cityPosition.lat, lng: cityPosition.lng },
        cityPosition.zoom
      );
    }
  }, [map, cityPosition]);

  useEffect(() => {
    if (!map) return;

    if (!markerLayerRef.current) {
      markerLayerRef.current = layerGroup().addTo(map);
    }

    const markerLayer = markerLayerRef.current;
    markerLayer.clearLayers();

    memoizedMarkers.forEach((markerInfo) => {
      const marker = new Marker({
        lat: markerInfo.lat,
        lng: markerInfo.lng,
      });

      marker.setIcon(
        markerInfo.isActive ? currentCustomIcon : defaultCustomIcon
      );

      marker.addTo(markerLayer);
    });
  }, [map, memoizedMarkers]);

  return <div style={{ height: '100%', width: '100%' }} ref={mapRef}></div>;
};

export default React.memo(MapComponent);
