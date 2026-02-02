import {useTranslations} from "next-intl";

const CircleDiagram = ({value, max, label, color}: {
    value: number;
    max: number;
    label: string;
    color: string;
}) => {
    const percentage = Math.min((value / max) * 100, 100);
    const circumference = 2 * Math.PI * 40;
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
        <div className="flex flex-col items-center">
            <div className="relative w-24 h-24">
                <svg className="w-full h-full transform -rotate-90">
                    <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="#e5e7eb"
                        strokeWidth="8"
                        fill="none"
                    />
                    <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke={color}
                        strokeWidth="8"
                        fill="none"
                        strokeDasharray={circumference}
                        strokeDashoffset={strokeDashoffset}
                        strokeLinecap="round"
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <div className="text-2xl font-bold">{value}</div>
                        <div className="text-xs text-gray-500">/ {max}</div>
                    </div>
                </div>
            </div>
            <div className="mt-2 text-sm text-gray-700">{label}</div>
        </div>
    );
};

export default function OnlineCard ({connectedCount = 8,
                                    disconnectedCount = 5}){
    const t = useTranslations("Dashboard")
    return (
        <div className="bg-white rounded-xl shadow flex flex-col">
            <div
                className="flex items-center justify-between mb-4 bg-[#065F46] rounded-tr-xl rounded-tl-xl px-4 py-1">
                <h3 className="text-lg font-semibold text-white">{t('gps-status')}</h3>
                <p className="text-sm text-white">{t('online-data')}</p>
            </div>

            <div className="flex-1 flex items-center justify-center">
                <div className="flex justify-center space-x-8">
                    <CircleDiagram
                        value={connectedCount}
                        max={connectedCount + disconnectedCount}
                        label={t('connected')}
                        color="#10b981"
                    />
                </div>
            </div>
        </div>
    )
}