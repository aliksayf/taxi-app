import { useTypedSelector } from "@/app/hooks/useTypedSelector"
import { Button } from "../../ui/Button"
import { optionsList } from "./data"

export const OrderButton = () => {

    const { travelTime , selectedOption} = useTypedSelector(state => state.taxi)

    const orderHandler = () => {
        alert(`Thanks for your order! You ordered ${
            optionsList.find(option => option._id === selectedOption)?.title
        }!`)
    }

    return (
        <Button 
            title='Order' 
            bgColor="#ffe847" 
            color="#111" 
            callBack={orderHandler} 
            isDisabled={!travelTime && !selectedOption} 
        />
    )
}