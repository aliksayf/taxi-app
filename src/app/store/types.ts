import { Coords } from "google-map-react"

export type TypeLocation = {
    location: Coords
    description: string
}

export type TypeInitialState = {
    from: TypeLocation
    to: TypeLocation
    travelTime: number
    selectedOption: string
}