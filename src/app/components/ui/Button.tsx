import { ButtonHTMLAttributes, FC } from 'react'
import cn from 'classnames';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement>{
    title: string
    color: string
    bgColor: string
    callBack: () => void
    isDisabled: boolean
}

export const Button:FC<IButton> = (props) => {
    const { title, color, bgColor, callBack, isDisabled, ...rest} = props;

    return (
        <button 
            {...rest}
            className={cn('rounded-2x1 block w-2/3 p-3 text-lg font-medium mx-auto shadow-md transition-colors duration-300 ease-in-out',
            {
                'cursor-not-allowed': isDisabled,
            })}
            style={{
                backgroundColor: isDisabled ? 'rgb(229, 231, 235)' : bgColor,
                color,
            }}
            onClick={callBack}
            disabled={isDisabled}
        >
            {title}
        </button>
    )
}