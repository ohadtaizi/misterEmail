import { NavLink, Outlet } from "react-router-dom";

export function About() {
    return <div className="about">
        <h1>We are all about robots</h1>

        <nav>
            <NavLink to="/about">Team</NavLink>
            <NavLink to="/about">Vision</NavLink>
        </nav>

        <Outlet />   
    </div>
}
