import { useEffect, useState } from "react";
import api from "../api/api";
import { useNavigate, useLocation } from "react-router-dom";

function Navbar({ setMessage }) {
    const [isAdmin, setIsAdmin] = useState(false);
    const [selectedLink, setSelectedLink] = useState('home');

    const location = useLocation();
    const showNavbar = !(location.pathname === "/" || location.pathname === "/signup");

    const navigate = useNavigate();
    const role = localStorage.getItem('role');
    const username = localStorage.getItem('username')
    useEffect(() => {
        setIsAdmin(role === "admin");
    }, [role]);

    useEffect(() => {
        // Set selected link based on current location pathname
        if (location.pathname === '/admin/listadmin') {
            setSelectedLink('listAdmins');
        } else if (location.pathname === '/admin/listuser') {
            setSelectedLink('listUsers');
        } else if (location.pathname === '/admin') {
            setSelectedLink('dashboard');
        } else if (location.pathname === '/gaming') {
            setSelectedLink('dashboard');
        } else if (location.pathname === '/gaming/list') {
            setSelectedLink('discoverGames');
        } else if (location.pathname === '/gaming/manage') {
            setSelectedLink('manageGames');
        } else {
            setSelectedLink('home'); // default link
        }
    }, [location.pathname]);

    const handleSignOut = async () => {
        const token = localStorage.getItem('token');

        try {
            const response = await api.post("signout", {}, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.status === 200) {
                setMessage(response.data.message);
                navigate("/");
                localStorage.clear();
            }
        } catch (error) {
            console.error("Error during sign out:", error);
            setMessage("Failed to sign out. Please try again.");
        }
    };

    // Function to determine if a link is active
    const isActive = (linkName) => selectedLink === linkName;

    return (
        showNavbar && (
            <nav className="navbar navbar-expand-lg sticky-top bg-primary navbar-dark">
                <div className="container">
                    <span
                        className="navbar-brand"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                            isAdmin ? navigate("/admin") : navigate("/gaming")
                            setSelectedLink('home');
                        }}
                    >
                        {isAdmin ? "Administrator Portal" : "Gaming Portal"}
                    </span>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {isAdmin ? (
                            <>
                                <li className="nav-item">
                                    <span
                                        className={`nav-link px-2 rounded ${isActive('listAdmins') ? 'bg-dark text-white' : ''}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate("/admin/listadmin");
                                            setSelectedLink('listAdmins');
                                        }}
                                    >
                                        List Admins
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span
                                        className={`nav-link px-2 rounded ${isActive('listUsers') ? 'bg-dark text-white' : ''}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate("/admin/listuser");
                                            setSelectedLink('listUsers');
                                        }}
                                    >
                                        List Users
                                    </span>
                                </li>
                            </>
                        ) : (
                            <>
                                <li className="nav-item">
                                    <span
                                        className={`nav-link px-2 rounded ${isActive('discoverGames') ? 'bg-dark text-white' : ''}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate("/gaming/list");
                                            setSelectedLink('discoverGames');
                                        }}
                                    >
                                        Discover Games
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span
                                        className={`nav-link px-2 rounded ${isActive('manageGames') ? 'bg-dark text-white' : ''}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate("/gaming/manage");
                                            setSelectedLink('manageGames');
                                        }}
                                    >
                                        Manage Games
                                    </span>
                                </li>
                                <li className="nav-item">
                                    <span
                                        className={`nav-link px-2 rounded ${isActive('profile') ? 'bg-dark text-white' : ''}`}
                                        style={{ cursor: "pointer" }}
                                        onClick={() => {
                                            navigate("/profile");
                                            setSelectedLink('profile');
                                        }}
                                    >
                                        User Profile
                                    </span>
                                </li>

                            </>
                        )}
                        <li className="nav-item">
                            <span className={`nav-link ${isActive('home') ? 'bg-dark' : ''} `}>
                                Welcome, {username}
                            </span>
                        </li>
                        <li className="nav-item">
                            <button
                                onClick={handleSignOut}
                                className="btn bg-white text-primary ms-4"
                            >
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    );
}

export default Navbar;
