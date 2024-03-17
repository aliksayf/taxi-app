"use client"

import { useActions } from "@/app/hooks/useActions";
import { InputPlaces } from "../../ui/InputPlaces"
import { Coords} from 'google-map-react';
import { useTypedSelector } from "@/app/hooks/useTypedSelector";

export const FromInput = () => {
    const { setFrom, setTo} = useActions();
    const { from } = useTypedSelector(store => store.taxi)
    
    const callbackSuccess = (address: string, location: Coords) => {
        setFrom({location, description: address})
        setTo('')
    }

    return (
        <InputPlaces callbackSuccess={callbackSuccess} type='from' place={from.description} />
    )
}