export default function Card({ title, children, className = "" }) {
    return (
        <div className={`bg-white rounded-2xl shadow-sm border p-6 ${className}`}>
            {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
            {children}
        </div>
    );
}
