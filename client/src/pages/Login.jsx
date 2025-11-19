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
        <div className="container mt-5">
            <h2 className="text-center">Admin Login</h2>

            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="Enter password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
            </form>

            <p className="text-center mt-3">
                Don't have an account?{" "}
                <Link to="/signup">Sign up</Link>
            </p>
        </div>

    );
};

export default Login;
