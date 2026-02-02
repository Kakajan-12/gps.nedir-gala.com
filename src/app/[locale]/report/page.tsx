'use client';

import { useState } from 'react';
import ReportSidebar from '@/src/components/Reports/ReportSidebar';
import ReportContent from '@/src/components/Reports/ReportContent';
import { templates } from '@/src/components/Reports/ReportTemplates';

export default function ReportsPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<string>('mileage');
    const [selectedVehicles, setSelectedVehicles] = useState<string[]>(['vehicle1']);
    const [dateRange, setDateRange] = useState({ start: '2024-01-01', end: '2024-01-31' });
    const [expandedGroups, setExpandedGroups] = useState<string[]>(['group1']);
    const [isLoading, setIsLoading] = useState(false);
    const [reportGenerated, setReportGenerated] = useState(false);

    const vehicleGroups = [
        {
            id: 'group1',
            name: 'Легковые автомобили',
            vehicles: [
                { id: 'vehicle1', name: 'Toyota Camry #A123BC', group: 'group1' },
                { id: 'vehicle2', name: 'Honda Accord #B456CD', group: 'group1' },
            ]
        },
        {
            id: 'group2',
            name: 'Грузовые автомобили',
            vehicles: [
                { id: 'vehicle3', name: 'Volvo FH16 #C789DE', group: 'group2' },
                { id: 'vehicle4', name: 'MAN TGX #D012EF', group: 'group2' },
            ]
        }
    ];

    const reportData = [
        { date: '01.01.2024', distance: 245, fuel: 23.5, time: '5ч 30м', trips: 8 },
        { date: '02.01.2024', distance: 189, fuel: 18.2, time: '4ч 15м', trips: 6 },
        { date: '03.01.2024', distance: 312, fuel: 29.8, time: '7ч 45м', trips: 10 },
        { date: '04.01.2024', distance: 156, fuel: 15.1, time: '3ч 20м', trips: 5 },
        { date: '05.01.2024', distance: 278, fuel: 26.4, time: '6ч 10м', trips: 9 },
    ];

    const totalStats = {
        distance: reportData.reduce((sum, item) => sum + item.distance, 0),
        fuel: reportData.reduce((sum, item) => sum + item.fuel, 0),
        trips: reportData.reduce((sum, item) => sum + item.trips, 0),
    };

    const handleGenerateReport = () => {
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            setReportGenerated(true);
        }, 1500);
    };

    const toggleGroup = (groupId: string) => {
        setExpandedGroups(prev =>
            prev.includes(groupId)
                ? prev.filter(id => id !== groupId)
                : [...prev, groupId]
        );
    };

    const toggleVehicle = (vehicleId: string) => {
        setSelectedVehicles(prev =>
            prev.includes(vehicleId)
                ? prev.filter(id => id !== vehicleId)
                : [...prev, vehicleId]
        );
    };

    const selectedTemplateName = templates.find(t => t.id === selectedTemplate)?.name || '';

    return (
        <div className="bg-gray-50">
            <div className="flex">
                <ReportSidebar
                    selectedTemplate={selectedTemplate}
                    onSelectTemplate={setSelectedTemplate}
                    vehicleGroups={vehicleGroups}
                    selectedVehicles={selectedVehicles}
                    expandedGroups={expandedGroups}
                    onToggleGroup={toggleGroup}
                    onToggleVehicle={toggleVehicle}
                    dateRange={dateRange}
                    onDateRangeChange={setDateRange}
                    onGenerateReport={handleGenerateReport}
                    isLoading={isLoading}
                />

                <div className="flex-1 overflow-y-auto">
                    <ReportContent
                        reportGenerated={reportGenerated}
                        templateName={selectedTemplateName}
                        vehicleCount={selectedVehicles.length}
                        dateRange={dateRange}
                        data={reportData}
                        totalStats={totalStats}
                    />
                </div>
            </div>
        </div>
    );
}