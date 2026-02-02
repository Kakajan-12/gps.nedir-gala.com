'use client'

import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { WaterEquipment } from '@/src/types/waterEquipment';
import L from 'leaflet';
import {useTranslations} from "next-intl";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: '/leaflet/marker-icon-2x.png',
    iconUrl: '/leaflet/marker-icon.png',
    shadowUrl: '/leaflet/marker-shadow.png',
});

const createEquipmentIcon = (type: string, status: string) => {
    const color = status === 'active' ? 'blue' :
        status === 'maintenance' ? 'orange' : 'gray';

    return L.divIcon({
        html: `
      <div style="
        width:32px;
        height:32px;
        border-radius:50%;
        background:${color};
        display:flex;
        align-items:center;
        justify-content:center;
        color:white;
        font-size:16px;
      ">
        ${getTypeIcon(type)}
      </div>
    `,
        className: '',
        iconSize: [32, 32],
        iconAnchor: [16, 16],
    });
};

export default function WaterManagementMapClient({
                                                     equipment,
                                                     onSelect,
                                                     selectedId,
                                                 }: {
    equipment: WaterEquipment[];
    onSelect: (id: string | null) => void;
    selectedId: string | null;
}) {
    const t = useTranslations('Monitoring');

    return (
        <MapContainer
            center={[38.97, 59.56]} // Туркменистан
            zoom={6}
            className="h-full w-full rounded-lg"
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap contributors"
            />

            {equipment.map((item) => (
                <Marker
                    key={item.id}
                    position={[item.location.lat, item.location.lng]}
                    icon={createEquipmentIcon(item.type, item.status)}
                    eventHandlers={{
                        click: () => onSelect(item.id),
                    }}
                >
                    <Popup>
                        <strong>{item.name}</strong>
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
}

const getTypeIcon = (type: string) => {
    const icons: Record<string, string> = {
        water_truck: '🚛',
        excavator: '🏗️',
        dredger: '🚢',
        pump_station: '💧',
        pipe_layer: '🛠️',
        canal_cleaner: '🧹',
        irrigation: '🌊',
    };
    return icons[type] || '🚜';
};

const getTypeName = (type: string): string => {
    const names: Record<string, string> = {
        water_truck: 'Водовоз',
        excavator: 'Экскаватор',
        dredger: 'Земснаряд',
        pump_station: 'Насосная станция',
        pipe_layer: 'Трубоукладчик',
        canal_cleaner: 'Очиститель каналов',
        irrigation: 'Поливная установка'
    };
    return names[type] || type;
};

const getStatusText = (status: string): string => {
    const statuses: Record<string, string> = {
        active: '🟢 Работает',
        idle: '🟡 Простаивает',
        maintenance: '🟠 На ремонте',
        broken: '🔴 Неисправна',
        transporting: '🔵 В пути'
    };
    return statuses[status] || status;
};