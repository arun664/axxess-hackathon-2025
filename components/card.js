export function Card({ children, className = "" }) {
    return (
        <div className={`bg-white rounded-2xl shadow-md border border-gray-200 p-4 ${className}`}>
            {children}
        </div>
    );
}

export function CardContent({ children }) {
    return <div className="p-2">{children}</div>;
}