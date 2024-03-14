import { FC } from "react"
import Layout from "../../layout/Layout";
import Map from "./Map"
import { FromInput } from "./FromInput";

const Home: FC = () => {

    return (
        <Layout title='Order taxi'>
            <Map />
            <div className="absolute z-10 left-5 w-11/12 bottom-60">
                <FromInput />
            </div>
        </Layout>
    )
}

export default Home;