import { NextResponse } from 'next/server';
import { WaterEquipment } from '@/src/types/waterEquipment';

export async function GET() {
    const mockEquipment: WaterEquipment[] = [
        {
            id: 'wt-001',
            name: 'Водовоз КАМАЗ-43118',
            type: 'water_truck',
            status: 'active',
            location: {
                lat: 51.1694,
                lng: 71.4491,
            },
            metrics: {
                fuelLevel: 65,
                engineHours: 1245,
                temperature: 75,
                speed: 45
            },
            lastUpdate: new Date(),
            assignedTo: {
                driver: 'Иванов А.С.',
            }
        },
        {
            id: 'exc-001',
            name: 'Экскаватор JCB 220',
            type: 'excavator',
            status: 'active',
            location: {
                lat: 51.1800,
                lng: 71.4600,
                address: 'Канал "Северный", участок 5'
            },
            metrics: {
                fuelLevel: 30,
                engineHours: 890,
                temperature: 40,
                speed: 0
            },
            lastUpdate: new Date(Date.now() - 3600000), // 1 час назад
            assignedTo: {
                driver: 'Петров В.И.',
                task: 'Расчистка канала'
            }
        },
        {
            id: 'pump-001',
            name: 'Насосная станция Grundfos',
            type: 'pump_station',
            status: 'active',
            location: {
                lat: 51.1750,
                lng: 71.4550,
            },
            metrics: {
                fuelLevel: 100,
                engineHours: 2450,
                temperature: 55
            },
            lastUpdate: new Date(Date.now() - 7200000),
            assignedTo: {
                driver: 'Сидоров М.П.',
                task: 'Техобслуживание'
            }
        },
        {
            id: 'dr-001',
            name: 'Земснаряд "Волгарь-300"',
            type: 'dredger',
            status: 'active',
            location: {
                lat: 51.1600,
                lng: 71.4400,
                address: 'Река Есиль, углубление дна'
            },
            metrics: {
                fuelLevel: 80,
                engineHours: 5670,
                temperature: 85,
                speed: 2
            },
            lastUpdate: new Date(),
            assignedTo: {
                driver: 'Козлов Д.А.',
                task: 'Углубление русла'
            }
        }
    ];

    const randomized = mockEquipment.map(item => ({
        ...item,
        lastUpdate: new Date(Date.now() - Math.random() * 7200000),
        metrics: {
            ...item.metrics,
            fuelLevel: Math.max(10, Math.min(100, (item.metrics.fuelLevel || 50) + (Math.random() * 40 - 20)))
        }
    }));

    return NextResponse.json(randomized);
}