"use client"

import { FC, useEffect, useRef, useState } from "react"
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import {FiSearch} from  'react-icons/fi';
import cn from 'classnames';

interface IInputPlaces {
    callbackSuccess: () => void;
    type: 'from' | 'to';
}
export const InputPlaces: FC<IInputPlaces> = ({ callbackSuccess, type }) => {
    
    const isFrom = type === 'from';
    const inputRef = useRef<HTMLInputElement>(null);

    const [address, setAddress] = useState('');

    const handleSelect = (address: string) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(location => {
                    callbackSuccess
                })
    }

    const setFocus = () => inputRef?.current?.focus()

    useEffect(() => {
        if(isFrom) setFocus();
    }, [isFrom])


    return (
        <PlacesAutocomplete 
            value={address} 
            onChange={setAddress} 
            onSelect={handleSelect}
            onError={err => console.log('Error', err)}
        >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading}) => (
                <div className={cn('shadow-lg', {
                    'mb-5': isFrom
                })}>
                    <div className='py-4 px-5 bg-white rounded-lg flex items-center' 
                        style={
                            suggestions.length ? {
                                borderBottomLeftRadius: 0,
                                borderBottomRightRadius: 0,
                            } : {}
                        }
                        onClick={setFocus}
                    >
                        <FiSearch color={isFrom ? '#ffbc00' : '#615F5D'} className="mr-3" size={26} />
                        <input 
                            {...getInputProps({
                                ref: inputRef,
                                placeholder: isFrom ? 'From' : 'To',
                                className: 'outline-none w-full text-gray-800'
                            })}
                        />
                        {
                            !isFrom && (
                                <div className='absolute right-5 text-sm text-gray-400'>
                                    -min.
                                </div>
                            )}
                    </div>
                    <div className={cn('absolute w-full h-0 overflow-y-auto rounded-b-lg z-10',
                        {'h-48' : suggestions.length || loading})}
                    >

                        {loading && <div className='p-2 bg-white'>Loading...</div>}

                        {suggestions.map(suggestion => 
                            <div 
                            {...getSuggestionItemProps(suggestion, {
                                    key: suggestion.id,
                                    className: cn('cursor-pointer p-3 text-gray-400', {
                                        'bg-gray-100': suggestion.active,
                                        'bg-white': !suggestion.active
                                 })
                            })}>
                                <span>{suggestion.description}</span>
                            </div>
                        )}
                    </div>
                </div>
            )}

        </PlacesAutocomplete>
    )
}