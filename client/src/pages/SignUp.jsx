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
        <div className="container mt-5">
            <h2 className="text-center">Admin Signup</h2>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

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
                    Sign Up
                </button>
            </form>

            <p className="text-center mt-3">
                Already have an account?{" "}
                <Link to="/login">Login</Link>
            </p>
        </div>

    );
};

export default Signup;
