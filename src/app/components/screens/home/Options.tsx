'use client'

import Image from 'next/image'
import { useActions } from "@/app/hooks/useActions"
import { useTypedSelector } from "@/app/hooks/useTypedSelector"
import { optionsList } from "./data"
import cn from 'classnames';

export const Options = () => {

    const { selectedOption, travelTime } = useTypedSelector(state => state.taxi)

    const { setSelectedOption } = useActions()


    return (
        <div className="flex overflow-x-scroll hide-scroll-bar my-5">
            <div className=" flex flex-nowrap">
                {optionsList.map(option => (
                    <button 
                        key={option._id} 
                        onClick={() => travelTime && setSelectedOption(option._id)}
                        className="iline-block rounded-xl py-2 px-4 outline-none mr-4 bg-white overflow-hidden"
                        style={{ minWidth: 105 }}
                    >
                        <div className={cn('text-left transition-opacity duration-300 ease-in-out', {
                            'opacity-100': option._id === selectedOption,
                            'opacity-30': option._id !== selectedOption
                        })} >
                            <Image className='m-auto' src={option.img} alt={option.title} width={50} height={50} />
                            <div className='text-sm' style={{ color: '#222' }}>{option.title}</div>
                            <div className='text-md font-medium'style={{ color: '#222' }}>
                               {travelTime 
                               ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', currencyDisplay: 'narrowSymbol'})
                                    .format(travelTime * option.multiplier) 
                               : '- $'}
                            </div>

                           

                        </div>
                    </button>
                ))}
            </div>
        </div>
    )
}