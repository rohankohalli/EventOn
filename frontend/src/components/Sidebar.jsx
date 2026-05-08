import { NavLink, Link } from "react-router-dom";
import { Pin, PinOff } from "lucide-react";
import Button from "./Button";

const Sidebar = ({ subtitle, items, isPinned, isHovered, setIsHovered, onTogglePin }) => {
    const isExpanded = isPinned || isHovered;

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
     ${isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"}`

    return (
        <aside onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            className={`bg-white border-r flex flex-col transition-all duration-300 dark:bg-gray-900 dark:border-gray-700
                ${isExpanded ? "w-56" : "w-14"}`}>
            <div className="px-4 py-4 border-b flex items-center justify-between">
                {isExpanded && (
                    <div>
                        <h1 className="text-xl font-bold text-indigo-600">
                            <Link to="/home">EventOn</Link>
                        </h1>
                        <p className="text-xs text-gray-500 dark:text-gray-600">{subtitle}</p>
                    </div>
                )}

                <Button onClick={onTogglePin} className="p-1 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700">
                    {isPinned ? <PinOff size={16} /> : <Pin size={16} />}
                </Button>
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1">
                {items.map(item => (
                    <NavLink key={item.path} to={item.path} className={linkClass}>
                        <item.icon size={18} />
                        {isExpanded && item.label}
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
