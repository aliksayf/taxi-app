"use client"
// import GoogleMapReact from "google-map-react";
import { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const containerStyle = {
    width: '400px',
    height: '600px'
  };
const center = {
    lat: 33.55, 
    lng: -117.109,
  };

const Map = () => {
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: ""
      })
    
      const [map, setMap] = useState<google.maps.Map | null>(null)
    
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
            center={center}
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
        <>MAP</>
      </GoogleMap>
        </div>
    ) : null
}

export default Map;