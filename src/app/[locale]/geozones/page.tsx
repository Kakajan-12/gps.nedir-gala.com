'use client';
import { useState, useEffect } from 'react';
import GeozoneList from '@/src/components/Geozones/GeozoneList';
import GeozoneForm from "@/src/components/Geozones/GeozoneForm";
import GeozoneMapWrapper from "@/src/components/Geozones/GeozoneMapWrapper";
import { useGeozoneStore } from '@/src/store/geozoneStore';

export default function Geozones() {
    const [drawMode, setDrawMode] = useState<'none' | 'circle' | 'polygon' | 'line'>('none');
    const { addGeozone, loadGeozones, isLoading } = useGeozoneStore();
    const [pendingGeozone, setPendingGeozone] = useState<{ name: string; color: string } | null>(null);

    useEffect(() => {
        if (typeof loadGeozones === 'function') {
            loadGeozones();
        }
    }, []);

    const handleStartDrawing = (type: 'circle' | 'polygon' | 'line', name: string, color: string) => {
        setPendingGeozone({ name, color });
        setDrawMode(type);
    };

    const handleDrawComplete = (data:
                                    { type: 'circle'; center: [number, number]; radius: number } |
                                    { type: 'polygon'; points: [number, number][] } |
                                    { type: 'line'; points: [number, number][] }
    ) => {
        if (!pendingGeozone) {
            console.error('No pending geozone data');
            return;
        }

        const baseGeozone = {
            id: `geozone-${Date.now()}`,
            name: pendingGeozone.name,
            color: pendingGeozone.color,
        };

        if (data.type === 'circle') {
            addGeozone({
                ...baseGeozone,
                type: 'circle',
                center: data.center,
                radius: data.radius,
            });
            console.log('Circle geozone added:', baseGeozone.name);
        } else if (data.type === 'polygon') {
            addGeozone({
                ...baseGeozone,
                type: 'polygon',
                points: data.points,
            });
            console.log('Polygon geozone added:', baseGeozone.name);
        } else if (data.type === 'line') {
            addGeozone({
                ...baseGeozone,
                type: 'line',
                points: data.points,
            });
            console.log('Line geozone added:', baseGeozone.name);
        }

        setDrawMode('none');
        setPendingGeozone(null);
    };

    const handleDrawCancel = () => {
        console.log('Drawing cancelled');
        setDrawMode('none');
        setPendingGeozone(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent mb-4"></div>
                    <p className="text-gray-600">Загрузка геозон...</p>
                </div>
            </div>
        );
    }
    return (
        <div className="grid grid-cols-3 h-[calc(100vh-90px)] gap-4">
            <div className="col-span-2 min-h-0">
                <GeozoneMapWrapper
                    drawMode={drawMode}
                    onDrawComplete={handleDrawComplete}
                    onDrawCancel={handleDrawCancel}
                />
            </div>
            <div className="col-span-1 min-h-0 overflow-auto">
                <GeozoneForm
                    onStartDrawing={handleStartDrawing}
                    onCancel={handleDrawCancel}
                    drawMode={drawMode}
                />
                <GeozoneList />
            </div>
        </div>
    );
}
