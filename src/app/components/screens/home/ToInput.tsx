"use client"

import { useActions } from "@/app/hooks/useActions";
import { InputPlaces } from "../../ui/InputPlaces"
import { Coords} from 'google-map-react';
import { useTypedSelector } from "@/app/hooks/useTypedSelector";

export const ToInput = () => {
    const { setTo } = useActions();
    const { to } = useTypedSelector(store => store.taxi);

    const callbackSuccess = (address: string, location: Coords) => {
        setTo({location, description: address})
    }

    return (
        <InputPlaces callbackSuccess={callbackSuccess} type='to' place={to.description || ''}/>
    )
}