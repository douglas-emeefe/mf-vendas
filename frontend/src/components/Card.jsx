export default function Card({ title, value, extra }) {
    return (
        <div className="bg-white p-4 rounded-lg shadow-sm w-full">
            <div className="text-sm text-gray-500">{title}</div>
            <div className="text-2xl font-bold mt-2">{value}</div>
            <div className="text-green-500 text-sm mt-1">{extra}</div>
        </div>
    );
}