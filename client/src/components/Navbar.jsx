import logo from '../images/server6.svg';
import { useEffect, useState } from 'react';
import UserService from '../services/userService';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled, { useTheme } from 'styled-components';
import { FaSun, FaMoon } from 'react-icons/fa';
import '../styles/NavbarStyles.css';

const NavbarWrapper = styled.nav`
    background-color: ${props => props.theme.navbarBackgroundColor};
    color: ${props => props.theme.textColor};
`;

const ToggleButton = styled.button`
    background: ${props => props.theme.buttonBackground};
    border: none;
    border-radius: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 1rem;
    margin: 15px;
    color: ${props => props.theme.buttonTextColor};
    font-size: 1.2rem;
    transition: background 0.3s ease;

    &:focus {
        outline: none;
    }
`;

function Navbar({ toggleTheme }) {
    const [showSidebar, setShowSidebar] = useState(false);
    const userService = new UserService();
    const navigate = useNavigate();
    const theme = useTheme();
    const [data, setData] = useState({
        username: "",
        email: "",
    });

    async function getUser() {
        const user = await userService.getCurrentUser();
        setData({
            username: user.body.username,
            email: user.body.email,
        });
    }

    useEffect(() => {
        getUser();
    }, []);

    function logout() {
        localStorage.removeItem('token');
        setData({
            username: "",
            email: "",
        });
        navigate('/');
        window.location.reload();
    }

    const handleSidebarToggle = () => {
        setShowSidebar(!showSidebar);
    }

    const linkStyle = {
        color: theme.textColor,
        fontSize: '1.3rem',
        fontWeight: 'bold',
        letterSpacing: '2px',
    }

    const subPages = [
        { name: 'Home', path: '/' },
        ...(data.username
            ? [{ name: 'Warehouses', path: '/warehouses' }]
            : [
                { name: 'Login', path: '/login', loggedIn: false },
                { name: 'Register', path: '/register', loggedIn: false },
            ]
        ),
    ];

    return (
        <NavbarWrapper className="navbar fixed-top navbar-expand-lg navbar-dark">
            <Link className="navbar-brand" to="/">
                <img src={logo} width="70" height="70" alt=""/>
            </Link>
            <h3><span>ServerRoomWatch</span></h3>
            <button className="navbar-toggler" type="button" style={{margin: '0.4rem 2rem'}}
                    onClick={handleSidebarToggle} aria-controls="navbarNav" aria-expanded="false"
                    aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className={`offcanvas offcanvas-end${showSidebar ? ' show' : ''}`} tabIndex="-1" id="sidebar">
                <div className="offcanvas-header">
                    <button type="button" className="btn-close text-reset" onClick={handleSidebarToggle}></button>
                </div>
                <div className="offcanvas-body d-flex justify-content-end">
                    <ul className="navbar-nav" style={{gap: '2rem', margin: '0.4rem 2rem'}}>
                        {subPages.map((page) => (
                            (!page.loggedIn || data.username) && (
                                <motion.li
                                    whileHover={{scale: 1.2}}
                                    whileTap={{scale: 0.9}}
                                    className="nav-item"
                                    key={page.name}
                                >
                                    <Link className="nav-link link-with-underline" style={linkStyle} to={page.path}
                                          onClick={handleSidebarToggle}>
                                        {page.name}
                                    </Link>
                                </motion.li>
                            )
                        ))}
                        {data.username && (
                            <motion.li whileHover={{scale: 1.2}}
                                       whileTap={{scale: 0.9}} className="nav-item">
                                <Link className="nav-link link-with-underline" onClick={() => logout()}
                                      style={linkStyle} to="/">Logout</Link>
                            </motion.li>
                        )}
                        <ToggleButton onClick={toggleTheme}>
                            {theme.theme === 'dark' ? <FaMoon/> : <FaSun/>}
                        </ToggleButton>
                    </ul>
                </div>
            </div>
        </NavbarWrapper>
    );
}

export default Navbar;
