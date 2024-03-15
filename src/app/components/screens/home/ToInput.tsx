"use client"

import { useActions } from "@/app/hooks/useActions";
import { InputPlaces } from "../../ui/InputPlaces"
import { Coords} from 'google-map-react';

export const ToInput = () => {
    const { setTo} = useActions();

    const callbackSuccess = (address: string, location: Coords) => {
        setTo({location, description: address})
    }

    return (
        <InputPlaces callbackSuccess={callbackSuccess} type='to' />
    )
}