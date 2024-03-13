import { FC } from "react"
import Layout from "../../layout/Layout";
import Map from "./Map"

const Home: FC = () => {

    return (
        <Layout title='Order taxi'>
            <Map />
            <div>Map</div>
        </Layout>
    )
}

export default Home;