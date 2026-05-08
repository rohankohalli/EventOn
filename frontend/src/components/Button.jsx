export default function Button({ children, className = "", variant = "primary", ...props }) {
    const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";
    
    const variants = {
        primary: "bg-primary-600 hover:bg-primary-700 text-white shadow-md shadow-primary-500/30 hover:shadow-lg focus:ring-primary-500",
        secondary: "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 focus:ring-gray-200",
        ghost: "bg-transparent text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:ring-gray-200",
        danger: "bg-red-500 hover:bg-red-600 text-white shadow-md shadow-red-500/30 focus:ring-red-500"
    };
    
    // Combine base styles, the selected variant, and any custom classes passed in.
    // If a custom class contains background/text colors, they might override depending on the build order, but standardizing here is good.
    const combinedClasses = `${baseStyles} ${variants[variant]} ${className}`;

    return (
        <button className={combinedClasses} {...props}>
            {children}
        </button>
    );
}
