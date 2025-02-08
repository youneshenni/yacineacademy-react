interface KPIProps {
    label: string;
    count: number;
}

export default function KPI({label, count}: KPIProps) {
    return (
        <div className=" bg-white rounded-md shadow-md p-4 h-fit">
        <div className="text-lg font-semibold">{label}</div>
        <div className="text-3xl font-semibold">{count}</div>
        </div>
    );
}