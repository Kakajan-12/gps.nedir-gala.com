'use client'

import { useState, useEffect } from "react";
import WaterManagementMap from "@/src/components/Monitoring/WaterManagementMap";
import EquipmentList from "@/src/components/Monitoring/EquipmentList";
import StatusSummary from "@/src/components/Monitoring/StatusSummary";
import { WaterEquipment } from "@/src/types/waterEquipment";

export default function MonitoringPage() {
    const [equipment, setEquipment] = useState<WaterEquipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedEquipment, setSelectedEquipment] = useState<string | null>(null);

    useEffect(() => {
        loadEquipmentData();
        const interval = setInterval(loadEquipmentData, 30000); // Каждые 30 сек
        return () => clearInterval(interval);
    }, []);

    const loadEquipmentData = async () => {
        try {
            const response = await fetch('/api/monitoring/water-equipment');
            const data = await response.json();
            setEquipment(data);
        } catch (error) {
            console.error('Ошибка загрузки:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-gray-50 p-4">
            <div className="mx-auto">

                <StatusSummary equipment={equipment} />

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-lg shadow p-4 h-[600px]">
                            <WaterManagementMap
                                equipment={equipment}
                                onSelect={setSelectedEquipment}
                                selectedId={selectedEquipment}
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-lg shadow p-4 h-[600px] overflow-y-auto">
                            <EquipmentList
                                equipment={equipment}
                                selectedId={selectedEquipment}
                                onSelect={setSelectedEquipment}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}