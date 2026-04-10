export default function Input({ label, type = "", error, className = "", ...props }) {
    return (
        <div className="flex items-center gap-4">
            {label && (<label className="text-sm font-medium w-32 text-right"> {label} </label>)}
            <div className="flex-1">
                <input type={type} className={`w-full border rounded-lg px-2 py-1 ${className}`} {...props} />
                {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
            </div>
        </div>
    );
}
