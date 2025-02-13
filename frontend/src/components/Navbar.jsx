import React from 'react';
import { Sun, Moon } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { toggleMode } from '../slices/modeSlice';

function Navbar() {
    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.mode.darkMode);

    return (
        <header className={`flex justify-between items-center p-6 shadow-md transition-colors duration-300 
            ${darkMode ? "bg-gray-900 text-white" : "bg-white text-gray-900"}`}>
            
            <div className="flex items-center gap-2">
                <img src="/task.svg" alt="Task Icon" className="w-8 h-8" />
                <h1 className="text-2xl font-bold">PeakPlanner</h1>
            </div>

            <div className="flex items-center gap-4">
                <button 
                    onClick={() => dispatch(toggleMode())} 
                    className={`p-2 rounded-md border transition-all duration-300 ${darkMode ? "bg-gray-800 border-gray-600 hover:bg-gray-700" : "bg-gray-200 border-gray-400 hover:bg-gray-300"}`}
                >
                    {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>

                <NavLink to="/auth/login">
                    <button className="px-4 py-2 border rounded-md transition-all duration-300
                        hover:bg-gray-200 dark:hover:bg-gray-700">
                        Login
                    </button>
                </NavLink>
                <NavLink to="/auth/register">
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-md transition-all duration-300
                        hover:bg-blue-700">
                        Get Started
                    </button>
                </NavLink>
            </div>
        </header>
    );
}

export default Navbar;
