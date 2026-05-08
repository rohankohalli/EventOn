import { NavLink, Link } from "react-router-dom";
import { Pin, PinOff } from "lucide-react";
import Button from "./Button";
import AppIcon from "./Icon";

const Sidebar = ({ subtitle, items, isPinned, isHovered, setIsHovered, onTogglePin }) => {
    const isExpanded = isPinned || isHovered;

    const linkClass = ({ isActive }) =>
        `flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition
     ${isActive ? "bg-indigo-600 text-white" : "text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"}`

    return (
        <aside onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
            className={`bg-white border-r flex flex-col transition-all duration-300 dark:bg-gray-900 dark:border-gray-700 z-10
                ${isExpanded ? "w-56" : "w-16"}`}>
            <div className={`px-4 py-4 border-b flex items-center ${isExpanded ? 'justify-between' : 'justify-center'} overflow-hidden`}>
                <div className="flex items-center gap-2">
                    <div className="text-indigo-600 shrink-0">
                        <AppIcon size={isExpanded ? 24 : 28} />
                    </div>
                    {isExpanded && (
                        <div className="flex flex-col justify-center">
                            <h1 className="text-lg font-bold text-indigo-600 leading-tight">
                                <Link to="/home">EventOn</Link>
                            </h1>
                            <p className="text-[10px] text-gray-500 dark:text-gray-600 leading-tight">{subtitle}</p>
                        </div>
                    )}
                </div>

                {isExpanded && (
                    <Button onClick={onTogglePin} className="p-1 hover:bg-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 shrink-0">
                        {isPinned ? <PinOff size={16} /> : <Pin size={16} />}
                    </Button>
                )}
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
