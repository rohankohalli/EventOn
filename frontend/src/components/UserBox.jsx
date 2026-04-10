import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import Button from "./Button";
import { Avatars } from "../constants/avatars";
import { Navigate } from "react-router-dom";

export default function UserBox({ user }) {
    const { logout } = useAuth();
    const [open, setOpen] = useState(false);
    const dropdownRef = useRef(null);

    const handleLogout = () => {
        logout();
        Navigate("/login");
    }

    useEffect(() => {
        const close = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", close);
        return () => document.removeEventListener("mousedown", close);
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <div className="relative" onClick={() => setOpen(!open)}>
                <Button className="flex items-center hover:bg-gray-200 p-2 gap-3 rounded-lg cursor-pointer">
                    <img src={Avatars[user.avatar]} className="w-9 h-9 rounded-full object-cover" />
                    
                    <span className="text-sm font-semibold cursor-pointer dark:text-slate-500">
                        {user.name}
                    </span>
                </Button>
            </div>


            {open && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg p-4 z-50">
                    <div className="border-b pb-3 mb-3">
                        <p className="font-semibold">{user?.name}</p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                        <p className="text-sm mt-1 text-blue-600 font-semibold">{user?.role}</p>
                    </div>

                    <a href="/profile" className="block py-2 hover:text-blue-600">
                        My Profile
                    </a>

                    <button onClick={handleLogout} className="w-full text-left py-2 text-red-600 hover:text-red-700 cursor-pointer">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
