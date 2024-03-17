"use client"
// import GoogleMapReact from "google-map-react";
import { useState, useRef, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';
import { useTypedSelector } from '@/app/hooks/useTypedSelector';
import { useActions } from '@/app/hooks/useActions';
import { optionsList } from './data';

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
      const { setTravelTime, setSelectedOption } = useActions()
      const [directionsKey, setDirectionsKey] = useState(0);


      const renderRoute = () => {
        const DirectionsService = new google.maps.DirectionsService();

        DirectionsService.route({
          origin: new google.maps.LatLng(from.location),
          destination: new google.maps.LatLng(to.location),
          travelMode: google.maps.TravelMode.DRIVING,
        }, (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            setDirections(result);
            setDirectionsKey((prevKey) => prevKey + 1)

            const durationSec = result?.routes[0].legs[0].duration?.value
            if(durationSec){
              setTravelTime(Math.ceil(durationSec / 60))
              // set the first option from the list as default
              setSelectedOption(optionsList[0]._id)
              setMap(map)
              setDirectionsKey((prevKey) => prevKey + 1)
            }
          } else {
            console.error(`error fetching directions ${result}`);
          }
        });
      }


      useEffect(() => {
        if(from.location?.lat && to.location?.lat && map) {
          renderRoute()
        } else {

          setDirections(null);
        }
      },[from, to, map])
    

      console.log('direction', directions)
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
                onLoad={(map) => setMap(map)}
                onUnmount={() => setMap(null)}
                options={{
                    clickableIcons: false,
                    disableDefaultUI: true,
                    streetViewControl: false,
                    zoom: 13,
                    keyboardShortcuts: false,
                  }}
            >
            {directions ? <DirectionsRenderer directions={directions} key={directionsKey}/> : null}
          </GoogleMap>
        </div>
    ) : null
}

export default Map;