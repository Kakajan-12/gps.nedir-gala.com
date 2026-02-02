'use client';
import { useEffect, useRef, useState } from 'react';
import { Marker, MapContainer, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import carImg from '@/public/car.png';

const positionInitial: [number, number] = [38.9697, 59.5563];
const TARGET_IMEI = "864636068530621";

const carIcon = new L.Icon({
    iconUrl: carImg.src,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
});

const RealtimeMarker = ({ position }: { position: [number, number] }) => {
    const markerRef = useRef<L.Marker>(null);
    const map = useMap();

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.setLatLng(position);
            map.panTo(position);
        }
    }, [position, map]);

    return <Marker ref={markerRef} position={position} icon={carIcon} />;
};

export default function MapOffline() {
    const [position, setPosition] = useState(positionInitial);
    const [connectionStatus, setConnectionStatus] = useState('connecting');

    useEffect(() => {
        let ws: WebSocket;
        let reconnectTimeout: NodeJS.Timeout;

        const connectWebSocket = () => {
            setConnectionStatus('connecting');

            ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_URL}`);

            ws.onopen = () => {
                console.log('✅ WebSocket подключен');
                setConnectionStatus('connected');
            };

            ws.onmessage = (event) => {
                try {
                    const msg = JSON.parse(event.data);

                    if (msg.imei === TARGET_IMEI && msg.type === 'location') {
                        const lat = msg.data.latitude;
                        const lng = msg.data.longitude;

                        if (typeof lat === 'number' && typeof lng === 'number' &&
                            lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
                            setPosition([lat, lng]);
                        }
                    }
                } catch (error) {
                    console.error('Ошибка обработки WebSocket сообщения:', error);
                }
            };

            ws.onerror = (error) => {
                console.error('❌ WebSocket ошибка:', error);
                setConnectionStatus('error');
            };

            ws.onclose = (event) => {
                console.log(`🔌 WebSocket отключен. Код: ${event.code}, причина: ${event.reason}`);
                setConnectionStatus('disconnected');

                if (event.code !== 1000) {
                    reconnectTimeout = setTimeout(() => {
                        connectWebSocket();
                    }, 3000);
                }
            };
        };

        connectWebSocket();

        return () => {
            if (reconnectTimeout) {
                clearTimeout(reconnectTimeout);
            }

            if (ws && ws.readyState === WebSocket.OPEN) {
                ws.close(1000, 'Component unmounting');
            }
        };
    }, []);

    return (
        <div className="w-full relative" style={{ height: 'calc(100vh - 90px)' }}>
            <div className="absolute top-4 right-4 z-[1000]">
                <div className={`
                    px-3 py-1 rounded-full text-white text-sm font-medium
                    ${connectionStatus === 'connected' ? 'bg-green-500' :
                    connectionStatus === 'connecting' ? 'bg-yellow-500' :
                        connectionStatus === 'error' ? 'bg-red-500' :
                            'bg-gray-500'}
                `}>
                    {connectionStatus === 'connected' ? 'Подключено' :
                        connectionStatus === 'connecting' ? 'Подключение...' :
                            connectionStatus === 'error' ? 'Ошибка' :
                                'Отключено'}
                </div>
            </div>

            <MapContainer
                center={position}
                zoom={13}
                style={{ width: '100%', height: '100%' }}
                zoomControl={true}
                minZoom={5}
                attributionControl={false}
            >
                <TileLayer
                    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
                    maxZoom={19}
                    attribution="© Esri"
                />

                <RealtimeMarker position={position} />
            </MapContainer>
        </div>
    );
}