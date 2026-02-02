'use client';

import {
    TrendingUp,
    MapPin,
    Clock,
    Fuel,
    AlertTriangle,
    BarChart3
} from 'lucide-react';

interface ReportTemplate {
    id: string;
    name: string;
    icon: React.ReactNode;
}

interface ReportTemplatesProps {
    selectedTemplate: string;
    onSelectTemplate: (templateId: string) => void;
}

const templates: ReportTemplate[] = [
    { id: 'mileage', name: 'Пробег и расход топлива', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'fuel', name: 'Заправки и сливы', icon: <Fuel className="w-4 h-4" /> },
    { id: 'violations', name: 'Нарушения', icon: <AlertTriangle className="w-4 h-4" /> },
];

export default function ReportTemplates({ selectedTemplate, onSelectTemplate }: ReportTemplatesProps) {
    return (
        <div className="p-4 border-b">
            <h3 className="font-semibold text-sm text-gray-700 mb-3">Шаблоны отчётов</h3>
            <div className="space-y-1">
                {templates.map(template => (
                    <button
                        key={template.id}
                        onClick={() => onSelectTemplate(template.id)}
                        className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors cursor-pointer ${
                            selectedTemplate === template.id
                                ? 'bg-green-800 text-white font-medium'
                                : 'text-gray-700 hover:bg-gray-50'
                        }`}
                    >
                        {template.icon}
                        {template.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export { templates };