import { Navbar } from 'react-bootstrap'
import brand from '@/assets/svg/light-brand.svg'

export const AppNavbar = () => {
    return (
        <Navbar bg="primary" className="px-3 d-flex justify-content-center flex-wrap" fixed="top">
            <Navbar.Brand className="d-flex align-items-center gap-3 text-light me-0">
                <img src={brand} alt="Nueve 09" style={{ height: '1.75rem' }} />
                Baja Nueve09
            </Navbar.Brand>
        </Navbar>
    )
}