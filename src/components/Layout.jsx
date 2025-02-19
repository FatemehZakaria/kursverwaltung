import { Outlet } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import '../styles/Layout.css'
import backgroundVideo from '../assets/9694230-hd_1920_1080_25fps.mp4' // Import the video file

const Layout = () => {
    return (
        <>
            <video src={backgroundVideo} autoPlay loop muted></video>
            
            {/* Video by cottonbro studio: https://www.pexels.com/video/close-up-footage-of-white-smoke-9694230/ */}

            <Header />
            <main>
                <Outlet />
            </main>
            <Footer />
        </>
    )
}

export default Layout