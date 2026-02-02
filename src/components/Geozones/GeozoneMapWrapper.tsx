'use client';
import dynamic from 'next/dynamic';

interface GeozoneMapProps {
    drawMode?: 'none' | 'circle' | 'polygon' | 'line';
    onDrawComplete?: (data:
                          { type: 'circle'; center: [number, number]; radius: number } |
                          { type: 'polygon'; points: [number, number][] } |
                          { type: 'line'; points: [number, number][] }
    ) => void;
    onDrawCancel?: () => void;
}

const GeozoneMap = dynamic<GeozoneMapProps>(
    () => import('./GeozoneMap'),
    {
        ssr: false,
        loading: () => (
            <div className="w-full h-full min-h-[400px] flex items-center justify-center bg-gray-100 rounded-lg">
                <div className="text-center">
                    <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
                    <p className="mt-4 text-gray-600">Загрузка карты...</p>
                </div>
            </div>
        ),
    }
);

export default function GeozoneMapWrapper(props: GeozoneMapProps) {
    return <GeozoneMap {...props} />;
}