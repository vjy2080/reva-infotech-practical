import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
    MDBNavbar,
    MDBContainer,
    MDBIcon,
    MDBNavbarToggler,
    MDBNavbarBrand,
    MDBCollapse
} from 'mdb-react-ui-kit';

export default function App() {
    const navigate = useNavigate();

    const [openNavColor, setOpenNavColor] = useState(false);
    const [loginStatus, setLoginStatus] = useState("Login");
    const logout = () => {
        localStorage.clear();
        console.log('Logeed out successfully');
        navigate('/');

    };
    useEffect(() => {
        const storedCurrentUser = localStorage.getItem('data');
        if (storedCurrentUser) {
            // console.log(storedCurrentUser.length > 0);
            setLoginStatus("Logout")
        } else {
            setLoginStatus("Login")

        }

    }, [logout])
    // else {
    //     console.log("no user found");
    // }

    return (
        <>
            <MDBNavbar expand='lg' dark bgColor='dark'>
                <MDBContainer fluid>
                    <MDBNavbarBrand className='me-5 ms-3'>Practical</MDBNavbarBrand>
                    <MDBNavbarToggler
                        type='button'
                        data-target='#navbarColor02'
                        aria-controls='navbarColor02'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                        onClick={() => setOpenNavColor(!openNavColor)}
                    >
                        <MDBIcon icon='bars' fas />
                    </MDBNavbarToggler>
                    <MDBCollapse open={openNavColor} navbar>

                        {(loginStatus === "Login") ? (<div><Link to='/' className='text-light mx-3'>Login</Link>
                            <Link to='/signUp' className='text-light mx-3'>Sign-Up</Link></div>) : ""}
                    </MDBCollapse>
                    <button className='btn btn-danger' onClick={logout}>{loginStatus}</button>
                </MDBContainer>
            </MDBNavbar>
        </>
    );
}