import Image from 'next/image';
import {FC} from 'react';

type PreloaderImageType = {
    src: string
}
const preloaderImage: PreloaderImageType = {src: ''};

const Loader: FC =() => {
    return (
        <div className='w-screen h-screen'>
            <Image src={preloaderImage.src} alt='plreloader' layout='fill' priority={true} />
            ...Loading
        </div>
    )
}

export default Loader;