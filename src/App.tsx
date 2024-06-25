import { DeleteAccountPage } from './pages'
import { AppNavbar } from './components'

export const App = () => {
    return (
        <>
            <AppNavbar />
            <div className="p-3" style={{ marginTop: '5.75rem' }}>
                <DeleteAccountPage />
            </div>
        </>
    )
}