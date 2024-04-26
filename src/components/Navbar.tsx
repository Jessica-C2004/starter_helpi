import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";


export const Navbar = () => {
    return (
        <>
            <Nav>
                <NavMenu>
                    <NavLink to="/home">
                        Home
                    </NavLink>
                    <NavLink to="/basic-Questions">
                        Basic Questions
                    </NavLink>
                    <NavLink to="/detailed-Questions">
                        Detailed Questions
                    </NavLink>
                    {/* <NavLink to="/report">
                        Report
                    </NavLink> */}
                </NavMenu>
            </Nav>
        </>
    );
};

const Nav = styled.nav`
    background: #ffb3ff;
    height: 85px;
    display: flex;
    justify-content: space-between;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
`;
 
const NavLink = styled(Link)`
    color: #808080;
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0 1rem;
    height: 100%;
    cursor: pointer;
    &.active {
        color: #4d4dff;
    }
`;
 
const NavMenu = styled.div`
    display: flex;
    align-items: center;
    margin-right: -24px;
    /* Second Nav */
    /* margin-right: 24px; */
    /* Third Nav */
    /* width: 100vw;
white-space: nowrap; */
    @media screen and (max-width: 768px) {
        display: none;
    }
`;