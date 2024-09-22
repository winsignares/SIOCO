import { Routes, Route} from "react-router-dom"
import { LandingPage } from "../pages"
import { Login } from "../components"

export const Landing = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<LandingPage />} />
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    )
}
