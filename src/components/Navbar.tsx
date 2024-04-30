import React from "react";
import styled from "styled-components";
import { NavLink as Link } from "react-router-dom";

//creates the header buttons that allows navigation between the pages
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
                </NavMenu>
            </Nav>
        </>
    );
};

const Nav = styled.nav`
    background: #51624F;
    min-height: 10vh;
    display: flex;
    justify-content: center;
    padding: 0.2rem calc((100vw - 1000px) / 2);
    z-index: 12;
`;
 
const NavLink = styled(Link)`
    background-color: #AFBEA2;
    color: #000000;
    text-decoration: none;
    &.active {
        color: #4d4dff;
    }
    border-radius: 15px;
    width: 150px;
    height: inherit - 6vh;
    text-align: center;
    margin-bottom: 3vh;
    margin-top: 3vh;
    margin-left: 10px;
    margin-right: 10px;
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