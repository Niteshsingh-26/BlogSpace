import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { useAppContext } from '../context/UseAppContext';

const Signup = () => {
    const { axios } = useAppContext();
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/blog/signup', { name, email, password });

            if (data.success) {
                toast.success('Account created! You can now log in.');
                navigate('/login');
            } else {
                toast.error(data.message || 'Signup failed');
            }
        } catch (error) {
            console.error(error.message);
            toast.error('Something went wrong');
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow-sm p-4" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-3 text-primary">Admin Signup</h3>
                <p className="text-center text-muted small">
                    Create an account to access the admin panel
                </p>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                        Sign up
                    </button>
                </form>
                <div className="text-center mt-3">
                    <small className="text-muted">Already have an account?</small>{' '}
                    <Link to="/login" className="text-decoration-none text-primary fw-medium">
                        Log in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Signup;
