// "use client"

import Head from 'next/head';
import Script from 'next/script';
import { FC, useState, useEffect, ReactNode } from "react";
import Loader from '../ui/Loader';
// todo: create favicon

interface ILayout {
    title: string
    children: ReactNode
}
type FavIcon = {
    src: string
}
const FavIcon: FavIcon = {src: ''};

const Layout:FC<ILayout> = ({children, title}) => {
    // const [isLoading, setIsLoading] = useState(false)

    // useEffect(() => {
    //     setIsLoading(true)

    //     const timeout = setTimeout(() => {setIsLoading(false)}, 4000)

    //     return () => {clearTimeout(timeout)}
    // }, [])

    return (
        <div>
            <Head>
                <title>{title} | Yandex Taxi</title>
                <meta itemProp='description' content='Taxi app' />
                <link rel='shortcut icon' href={FavIcon.src} type='image/png' />
                <meta name='theme-color' content='#FFbc00' />
            </Head>

            <Script
                strategy='beforeInteractive'
                src={`https://maps.googleapis.com/maps/api/js?key=${process.env.MAP_API_KEY}&libraries=places`}
            />
            <div style={{maxWidth: 480}} className='mx-auto relative overflow-hidden'>
                {children}
            </div>
        </div>
    )
}

export default Layout;