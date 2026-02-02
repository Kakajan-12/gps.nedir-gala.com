'use client';

import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
} from 'chart.js';
import SpeedingCard from "@/src/components/Dashboard/SpeedingCard/SpeedingCard";
import OnlineCard from "@/src/components/Dashboard/OnlineCard/OnlineCard";
import TopFuel from "@/src/components/Dashboard/TopFuel/TopFuel";
import TopMileage from "@/src/components/Dashboard/TopMileage/TopMileage";
import DeviceStatus from "@/src/components/Dashboard/DeviceStatus/DeviceStatus";
import FuelChart from "@/src/components/Dashboard/FuelChart/FuelChart";


ChartJS.register(
    LineElement,
    PointElement,
    LinearScale,
    CategoryScale,
    Tooltip,
    Legend,
);

export default function DashboardStats() {
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4 pt-6">
                <OnlineCard/>
                <TopFuel/>
                <SpeedingCard/>
                <TopMileage/>
                <DeviceStatus/>
            </div>
            <FuelChart/>
        </div>
    );
}