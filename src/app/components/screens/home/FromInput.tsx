"use client"

import { InputPlaces } from "../../ui/InputPlaces"

export const FromInput = () => {
    const callbackSuccess = () => {
        console.log('success')
    }
    return (
        <InputPlaces callbackSuccess={callbackSuccess} type='from' />
    )
}