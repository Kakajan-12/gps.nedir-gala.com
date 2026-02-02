// src/types/waterEquipment.ts
export interface WaterEquipment {
    id: string;
    name: string;
    type: WaterEquipmentType;
    status: EquipmentStatus;
    location: {
        lat: number;
        lng: number;
        address?: string;
    };
    metrics: {
        fuelLevel?: number;      // Уровень топлива в %
        engineHours?: number;    // Наработка моточасов
        temperature?: number;    // Температура (для двигателя)
        speed?: number;          // Скорость (км/ч)
    };
    lastUpdate: Date;
    assignedTo?: {
        driver?: string;        // Водитель/оператор
        task?: string;          // Текущее задание
    };
}

// Типы водохозяйственной техники
export type WaterEquipmentType =
    | 'water_truck'      // Водовоз
    | 'excavator'        // Экскаватор для каналов
    | 'dredger'          // Земснаряд
    | 'pump_station'     // Насосная станция (мобильная)
    | 'pipe_layer'       // Трубоукладчик
    | 'canal_cleaner'    // Очиститель каналов
    | 'irrigation';      // Поливная установка

export type EquipmentStatus =
    | 'active'           // Работает
    | 'idle'             // Простаивает
    | 'maintenance'      // На обслуживании
    | 'broken'           // Сломана
    | 'transporting';    // В транспортировке