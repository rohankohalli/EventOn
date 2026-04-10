const AppIcon = ({ size = 28 }) => (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
        
        <path d="M50 8 A42 42 0 0 1 82 32" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />

        {/* Middle arc */}
        <path d="M18 56 A36 36 0 0 1 42 22" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.85" />

        {/* Inner arc */}
        <path d="M64 88 A30 30 0 0 1 34 74" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity="0.7" />

        {/* Center circle */}
        <circle cx="50" cy="50" r="9" fill="currentColor" />

    </svg>
)

export default AppIcon;
