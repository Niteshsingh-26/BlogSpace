import { useState } from 'react';
import { useAppContext } from '../context/UseAppContext';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const { axios, setUser } = useAppContext();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                '/api/blog/login',
                { email, password },
                { withCredentials: true }
            );

            if (data.success) {
                setUser(data.user);
                toast.success("Login successful!");
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Something went wrong!");
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-3 text-primary">Admin Login</h3>
                <p className="text-center text-muted small">
                    Enter your credentials to access the admin panel
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">
                        Login
                    </button>
                </form>
                <div className="text-center mt-3">
                    <small className="text-muted">Don't have an account?</small>{' '}
                    <Link to="/signup" className="text-decoration-none text-primary fw-medium">
                        Sign up
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;
