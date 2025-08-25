import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAppContext } from "../context/UseAppContext";
import { useEffect } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { axios, user, setUser } = useAppContext();
    axios.defaults.withCredentials = true;

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/blog/profile');
                await setUser(response.data);
            } catch (error) {
                console.error('Error fetching profile:', error.message);
                await setUser(null);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.post('api/blog/logout');
            await setUser(null);
            toast.success("Logout successful");
            navigate(`/`);
        } catch (error) {
            toast.error(`Logout failed: ${error.message}`);
            console.error('Logout error:', error.message);
        }
    };

    const userId = user?.userId;

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm">
            <div className="container px-4 d-flex justify-content-between align-items-center">
                {/* Span card for app name on left side*/}
                <span
                    className="navbar-brand fw-bold fs-2 text-dark"
                    onClick={() => navigate("/")}
                    style={{ cursor: "pointer" }}
                >
                    BlogSpace
                </span>
                {/* Navbar links */}
                <div className="d-flex align-items-center gap-4 fs-5">
                    {userId ? (
                        <>
                            <Link
                                to="/addBlog"
                                className={`nav-link-custom ${location.pathname === "/addBlog" ? "active-link" : ""}`}
                            >
                                Create Blog
                            </Link>
                            <Link
                                to="/myBlog"
                                className={`nav-link-custom ${location.pathname === "/myBlog" ? "active-link" : ""}`}
                            >
                                My Blogs
                            </Link>
                            <span
                                onClick={handleLogout}
                                className="nav-link-custom text-danger"
                                style={{ cursor: "pointer" }}
                            >
                                Logout
                            </span>
                        </>
                    ) : (
                        <Link
                            to="/login"
                            className={`nav-link-custom ${location.pathname === "/login" ? "active-link" : ""}`}
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
