import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { loginUser, registerUser } from "../slices/authSlice";
import { NavLink, useNavigate } from "react-router-dom";

export function Register() {
    const dispatch = useDispatch();
    const { loading, error } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        try {
            dispatch(registerUser({ firstName, lastName, email, password }));
            navigate('/auth/login');
        } catch (err) {
            console.error(err.message)
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center items-center w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
            >
                <h2 className="text-2xl font-semibold text-gray-900 text-center">Register</h2>
    
                <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
                    <div className="flex space-x-4">
                        <div className="w-1/2">
                            <label htmlFor="firstName" className="block text-gray-700 font-medium">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="Enter your first name"
                                value={firstName}
                                onChange={(e) => setFirstName(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                        <div className="w-1/2">
                            <label htmlFor="lastName" className="block text-gray-700 font-medium">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Enter your last name"
                                value={lastName}
                                onChange={(e) => setLastName(e.target.value)}
                                className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                    >
                        {loading ? "Processing..." : "Sign Up"}
                    </button>

                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>

                <p className="mt-4 text-center text-gray-600">
                    Already have an account?{" "}
                    <NavLink to="/auth/login" className="text-green-500 font-semibold">
                        Sign In
                    </NavLink>
                </p>
            </motion.div>
        </div>
    );
}


export function Login() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            await dispatch(loginUser({ email, password })).unwrap();
            navigate("/");
        } catch (err) {
            console.error(err.message)
        }
    };

    return (
        <div className="h-screen flex items-center justify-center bg-gray-100 px-4">
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col justify-center items-center w-full max-w-md p-8 bg-white shadow-lg rounded-lg"
            >
                <h2 className="text-2xl font-semibold text-gray-900 text-center">Login</h2>
    
                <form onSubmit={handleSubmit} className="mt-6 w-full space-y-4">
                    {/* Email Input */}
                    <div>
                        <label htmlFor="email" className="block text-gray-700 font-medium">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
    
                    {/* Password Input */}
                    <div>
                        <label htmlFor="password" className="block text-gray-700 font-medium">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            required
                        />
                    </div>
    
                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full p-3 text-white bg-green-500 rounded-lg hover:bg-green-600 transition"
                    >
                        {loading ? "Processing..." : "Login"}
                    </button>
    
                    {/* Error Message */}
                    {error && <p className="text-red-500 text-center">{error}</p>}
                </form>
    
                {/* Register Link */}
                <p className="mt-4 text-center text-gray-600">
                    Don't have an account?{" "}
                    <NavLink to="/auth/register" className="text-green-500 font-semibold">
                        Register
                    </NavLink>
                </p>
            </motion.div>
        </div>
    );
    
}