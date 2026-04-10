const DotLoader = ({ dotSize = 6, gap = 10, speed = "1.2s" }) => {
    const dots = 5

    return (
        <svg width={dots * (dotSize + gap)} height="30" viewBox="0 0 120 30" fill="currentColor" role="status">
            {Array.from({ length: dots }).map((_, i) => (
                <circle key={i} cx={i * 24 + 12} cy="15" r={dotSize}>
                    <animate attributeName="cy"
                        values="15;5;15"
                        dur={speed}
                        begin={`${i * 0.1}s`}
                        repeatCount="indefinite" />
                </circle>
            ))}
        </svg>
    )
}

export default DotLoader
