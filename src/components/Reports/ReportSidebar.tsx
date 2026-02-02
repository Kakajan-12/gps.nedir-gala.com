'use client';

import { Play } from 'lucide-react';
import ReportTemplates from './ReportTemplates';
import VehicleSelector from './VehicleSelector';
import DateRangePicker from './DateRangePicker';

interface DateRange {
    start: string;
    end: string;
}

interface VehicleGroup {
    id: string;
    name: string;
    vehicles: { id: string; name: string; group: string }[];
}

interface ReportSidebarProps {
    selectedTemplate: string;
    onSelectTemplate: (templateId: string) => void;
    vehicleGroups: VehicleGroup[];
    selectedVehicles: string[];
    expandedGroups: string[];
    onToggleGroup: (groupId: string) => void;
    onToggleVehicle: (vehicleId: string) => void;
    dateRange: DateRange;
    onDateRangeChange: (dateRange: DateRange) => void;
    onGenerateReport: () => void;
    isLoading: boolean;
}

export default function ReportSidebar({
                                          selectedTemplate,
                                          onSelectTemplate,
                                          vehicleGroups,
                                          selectedVehicles,
                                          expandedGroups,
                                          onToggleGroup,
                                          onToggleVehicle,
                                          dateRange,
                                          onDateRangeChange,
                                          onGenerateReport,
                                          isLoading,
                                      }: ReportSidebarProps) {
    return (
        <div className="w-80 bg-white border-r main-border overflow-y-auto">
            <ReportTemplates
                selectedTemplate={selectedTemplate}
                onSelectTemplate={onSelectTemplate}
            />

            <VehicleSelector
                vehicleGroups={vehicleGroups}
                selectedVehicles={selectedVehicles}
                expandedGroups={expandedGroups}
                onToggleGroup={onToggleGroup}
                onToggleVehicle={onToggleVehicle}
            />

            <DateRangePicker
                dateRange={dateRange}
                onDateRangeChange={onDateRangeChange}
            />

            <div className="p-4">
                <button
                    onClick={onGenerateReport}
                    disabled={isLoading || selectedVehicles.length === 0}
                    className="w-full bg-green-800 text-white py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium disabled:bg-gray-300 disabled:cursor-not-allowed cursor-pointer"
                >
                    {isLoading ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Формирование...
                        </>
                    ) : (
                        <>
                            <Play className="w-5 h-5" />
                            Выполнить отчёт
                        </>
                    )}
                </button>
            </div>
        </div>
    );
}