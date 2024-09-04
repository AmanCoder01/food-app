import { Outlet } from 'react-router-dom'
import { Navbar } from '../Navbar'
import Footer from '../Footer'

export const MainLayout = () => {
    return (
        <div className='flex flex-col min-h-screen md:m-0'>
            <header>
                <Navbar />
            </header>

            <div className='flex-1'>
                <Outlet />
            </div>

            <footer>
                <Footer />
            </footer>
        </div>
    )
}
