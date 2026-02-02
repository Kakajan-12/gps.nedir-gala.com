'use client';
import { MapContainer, TileLayer, Circle, Polygon, Polyline, useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useRef, useState } from 'react';
import { useGeozoneStore } from '@/src/store/geozoneStore';
import type { Map as LeafletMap, Icon } from 'leaflet';
import Modal from './Modal';
import 'leaflet/dist/leaflet.css';
import { useTranslations } from "next-intl";

interface CircleGeozone {
    id: string;
    name: string;
    type: 'circle';
    center: [number, number];
    radius: number;
    color: string;
}

interface PolygonGeozone {
    id: string;
    name: string;
    type: 'polygon';
    points: [number, number][];
    color: string;
}

interface LineGeozone {
    id: string;
    name: string;
    type: 'line';
    points: [number, number][];
    color: string;
}

type Geozone = CircleGeozone | PolygonGeozone | LineGeozone;

function MapResizer() {
    const map = useMap();

    useEffect(() => {
        const timer = setTimeout(() => {
            map.invalidateSize();
        }, 100);

        const handleResize = () => {
            map.invalidateSize();
        };

        window.addEventListener('resize', handleResize);

        const resizeObserver = new ResizeObserver(() => {
            map.invalidateSize();
        });

        const container = map.getContainer();
        if (container) {
            resizeObserver.observe(container);
        }

        return () => {
            clearTimeout(timer);
            window.removeEventListener('resize', handleResize);
            resizeObserver.disconnect();
        };
    }, [map]);

    return null;
}

function FixLeafletIcons() {
    useEffect(() => {
        if (typeof window !== 'undefined') {
            import('leaflet').then((L) => {
                const DefaultIconPrototype = L.Icon.Default.prototype as Partial<Icon.Default> & {
                    _getIconUrl?: unknown;
                };

                if ('_getIconUrl' in DefaultIconPrototype) {
                    delete DefaultIconPrototype._getIconUrl;
                }

                L.Icon.Default.mergeOptions({
                    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
                    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                });
            });
        }
    }, []);

    return null;
}

interface DrawingToolsProps {
    drawMode: 'none' | 'circle' | 'polygon' | 'line';
    onComplete: (data:
                     { type: 'circle'; center: [number, number]; radius: number } |
                     { type: 'polygon'; points: [number, number][] } |
                     { type: 'line'; points: [number, number][] }
    ) => void;
    onCancel: () => void;
    onShowModal: (message: string) => void;
}

function DrawingTools({ drawMode, onComplete, onCancel, onShowModal }: DrawingToolsProps) {
    const [circleCenter, setCircleCenter] = useState<[number, number] | null>(null);
    const [circleRadius, setCircleRadius] = useState<number>(0);
    const [polygonPoints, setPolygonPoints] = useState<[number, number][]>([]);
    const [linePoints, setLinePoints] = useState<[number, number][]>([]);
    const map = useMap();
    const t = useTranslations('Geozones');

    useMapEvents({
        click(e) {
            if (drawMode === 'circle') {
                if (!circleCenter) {
                    const center: [number, number] = [e.latlng.lat, e.latlng.lng];
                    setCircleCenter(center);
                } else {
                    const center = circleCenter;
                    const radius = map.distance(center, [e.latlng.lat, e.latlng.lng]);
                    onComplete({ type: 'circle', center, radius });
                    setCircleCenter(null);
                    setCircleRadius(0);
                }
            } else if (drawMode === 'polygon') {
                const newPoint: [number, number] = [e.latlng.lat, e.latlng.lng];
                setPolygonPoints([...polygonPoints, newPoint]);
            } else if (drawMode === 'line') {
                const newPoint: [number, number] = [e.latlng.lat, e.latlng.lng];
                setLinePoints([...linePoints, newPoint]);
            }
        },
        contextmenu(e) {
            e.originalEvent.preventDefault();
            if (drawMode === 'polygon' && polygonPoints.length >= 3) {
                onComplete({ type: 'polygon', points: polygonPoints });
                setPolygonPoints([]);
            } else if (drawMode === 'polygon' && polygonPoints.length < 3) {
                onShowModal(t('modal-polygon-min-points'));
            } else if (drawMode === 'line' && linePoints.length >= 2) {
                onComplete({ type: 'line', points: linePoints });
                setLinePoints([]);
            } else if (drawMode === 'line' && linePoints.length < 2) {
                onShowModal(t('modal-line-min-points'));
            }
        },
        mousemove(e) {
            if (drawMode === 'circle' && circleCenter) {
                const radius = map.distance(circleCenter, [e.latlng.lat, e.latlng.lng]);
                setCircleRadius(radius);
            }
        }
    });

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onCancel();
                setCircleCenter(null);
                setCircleRadius(0);
                setPolygonPoints([]);
                setLinePoints([]);
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [onCancel]);

    return (
        <>
            {circleCenter && drawMode === 'circle' && (
                <Circle
                    center={circleCenter}
                    radius={circleRadius || 100}
                    pathOptions={{
                        color: '#3b82f6',
                        fillColor: '#3b82f6',
                        fillOpacity: 0.3,
                        dashArray: '10, 10',
                        weight: 2
                    }}
                />
            )}
            {polygonPoints.length > 0 && drawMode === 'polygon' && (
                <Polygon
                    positions={polygonPoints}
                    pathOptions={{
                        color: '#ef4444',
                        fillColor: '#ef4444',
                        fillOpacity: 0.3,
                        dashArray: '10, 10',
                        weight: 2
                    }}
                />
            )}
            {linePoints.length > 0 && drawMode === 'line' && (
                <Polyline
                    positions={linePoints}
                    pathOptions={{
                        color: '#10b981',
                        dashArray: '10, 10',
                        weight: 3
                    }}
                />
            )}
        </>
    );
}

interface GeozoneMapProps {
    drawMode?: 'none' | 'circle' | 'polygon' | 'line';
    onDrawComplete?: (data:
                          { type: 'circle'; center: [number, number]; radius: number } |
                          { type: 'polygon'; points: [number, number][] } |
                          { type: 'line'; points: [number, number][] }
    ) => void;
    onDrawCancel?: () => void;
}

export default function GeozoneMap({ drawMode = 'none', onDrawComplete, onDrawCancel }: GeozoneMapProps) {
    const { geozones, selectedId, select } = useGeozoneStore();
    const mapContainerRef = useRef<HTMLDivElement>(null);
    const mapRef = useRef<LeafletMap | null>(null);
    const [modalMessage, setModalMessage] = useState<string>('');
    const [showModal, setShowModal] = useState(false);
    const t = useTranslations('Geozones');

    const handleShowModal = (message: string) => {
        setModalMessage(message);
        setShowModal(true);
    };

    return (
        <>
            <div
                ref={mapContainerRef}
                className="w-full h-full min-h-[400px] relative"
            >
                {drawMode !== 'none' && (
                    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-[1000] bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg">
                        <p className="text-sm font-medium">
                            {drawMode === 'circle' && t('instruction-circle')}
                            {drawMode === 'polygon' && t('instruction-polygon')}
                            {drawMode === 'line' && t('instruction-line')}
                        </p>
                        <p className="text-xs mt-1 opacity-90">{t('instruction-cancel')}</p>
                    </div>
                )}

                <MapContainer
                    center={[55.7558, 37.6173]}
                    zoom={10}
                    className="h-full w-full z-0"
                    scrollWheelZoom={true}
                    ref={mapRef}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />

                    <MapResizer />
                    <FixLeafletIcons />

                    {onDrawComplete && onDrawCancel && (
                        <DrawingTools
                            drawMode={drawMode}
                            onComplete={onDrawComplete}
                            onCancel={onDrawCancel}
                            onShowModal={handleShowModal}
                        />
                    )}

                    {geozones.map((z: Geozone) => {
                        const isSelected = selectedId === z.id;

                        if (z.type === 'circle' && 'center' in z && 'radius' in z && z.center && z.radius) {
                            return (
                                <Circle
                                    key={z.id}
                                    center={z.center}
                                    radius={z.radius}
                                    pathOptions={{
                                        color: z.color,
                                        fillColor: z.color,
                                        fillOpacity: isSelected ? 0.4 : 0.2,
                                        weight: isSelected ? 3 : 2
                                    }}
                                    eventHandlers={{
                                        click: () => {
                                            if (drawMode === 'none') {
                                                select(z.id);
                                            }
                                        }
                                    }}
                                />
                            );
                        }

                        if (z.type === 'polygon' && 'points' in z && z.points) {
                            return (
                                <Polygon
                                    key={z.id}
                                    positions={z.points}
                                    pathOptions={{
                                        color: z.color,
                                        fillColor: z.color,
                                        fillOpacity: isSelected ? 0.4 : 0.2,
                                        weight: isSelected ? 3 : 2
                                    }}
                                    eventHandlers={{
                                        click: () => {
                                            if (drawMode === 'none') {
                                                select(z.id);
                                            }
                                        }
                                    }}
                                />
                            );
                        }

                        if (z.type === 'line' && 'points' in z && z.points) {
                            return (
                                <Polyline
                                    key={z.id}
                                    positions={z.points}
                                    pathOptions={{
                                        color: z.color,
                                        weight: isSelected ? 5 : 3,
                                        opacity: isSelected ? 1 : 0.8
                                    }}
                                    eventHandlers={{
                                        click: () => {
                                            if (drawMode === 'none') {
                                                select(z.id);
                                            }
                                        }
                                    }}
                                />
                            );
                        }

                        return null;
                    })}
                </MapContainer>
            </div>

            <Modal
                isOpen={showModal}
                onClose={() => setShowModal(false)}
                title={t('modal-attention-title')}
                message={modalMessage}
                type="alert"
                confirmText={t('modal-confirm')}
            />
        </>
    );
}