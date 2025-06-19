
import { Routes, Route} from "react-router-dom"

import { PageLanding } from "../LandingPage"
import { Login } from "../Auth"


export const Landing = () => {
    return (
        <Routes>
            <Route>
                <Route path="/" element={<PageLanding />} />
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    )
}
