//yehia soliman
//5.2.2024
import React from "react";
import {
    Nav,
    NavLink,
    Bars,
    NavMenu,
} from "./navbarElements";

const Navbar = () => {//sets up the navigation bar on the top of each of the pages
    return (
        <>
            <Nav>
                <Bars />
                
                <NavMenu>
                    <NavLink to="/Home" >
                        Home
                    </NavLink>
                    <NavLink to="/compare-players" activeStyle>
                        Compare Stats
                    </NavLink>
                    <NavLink to="/graphs" activeStyle>
                        Graphs
                    </NavLink>
                    <NavLink to="/player-search" activeStyle>
                        Player Search
                    </NavLink>
                    {}
                    {}
                </NavMenu>
            </Nav>
        </>
    );
};

export default Navbar;
