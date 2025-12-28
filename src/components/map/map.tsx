import React, { useRef, useEffect, useMemo } from 'react';
import { Marker, layerGroup, LayerGroup } from 'leaflet';
import { CityType, OfferInMap } from '../../types/offer';
import useMap from '../../hooks/use-map/use-map';
import { defaultCustomIcon, currentCustomIcon } from './map-icons';
import 'leaflet/dist/leaflet.css';

type MapProps = {
  city: CityType;
  offers: OfferInMap[];
  currentOffer: OfferInMap | undefined;
};

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
    if (!map) {
      return;
    }

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

const MemoizedMapComponent = React.memo(MapComponent);
export default MemoizedMapComponent;
