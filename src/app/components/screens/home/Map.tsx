"use client"
// import GoogleMapReact from "google-map-react";
import { useState, useCallback, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { useTypedSelector } from '@/app/hooks/useTypedSelector';

const containerStyle = {
    width: '100%',
    height: '100%'
  };
const center = {
    lat: 33.55, 
    lng: -117.109,
  };

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: String(process.env.MAP_API_KEY),
        libraries: ["places"]
      })
    
      const [map, setMap] = useState<google.maps.Map | null>(null)
      const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null)
      const { from, to } = useTypedSelector(store => store.taxi)

      useEffect(() => {
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
          origin: new google.maps.LatLng(from.location),
          destination: new google.maps.LatLng(to.location),
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      },[from, to])
    
      const onLoad = useCallback(function callback(map: google.maps.Map) {
        // This is just an example of getting and using the map instance!!! don't just blindly copy!
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
    
        setMap(map)
      }, [])

      const onUnmount = useCallback(function callback(map: google.maps.Map) {
        setMap(null)
      }, [])


    return isLoaded ? (
        <div className='h-screen w-full'>
            {/* <GoogleMapReact
                bootstrapURLKeys={{key: ''}}
                defaultCenter={{
                    lat:33.55, 
                    lng: 117.10,
                }}
                defaultZoom={13}
                options={{}}
            /> */}
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={from.location?.lat 
              ? {
                  lat: from.location.lat,
                  lng: from.location.lng,
                }
              : center}
            zoom={13}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
                clickableIcons: false,
                disableDefaultUI: true,
                streetViewControl: false,
                zoom: 13,
                keyboardShortcuts: false,
              }}
        >
        { /* Child components, such as markers, info windows, etc. */ }
        {directions && <DirectionsRenderer directions={directions} />}
      </GoogleMap>
        </div>
    ) : null
}

export default Map;