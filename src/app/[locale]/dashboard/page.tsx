'use client';
import DashboardStats from "@/src/components/Dashboard/DashboardStats";
import DashboardFilter from "@/src/components/Dashboard/DashboardFilter/DashboardFilter";

export default function DashboardPage() {


    return (
        <div className="p-6">
            <DashboardFilter />
            <DashboardStats/>
        </div>
    );
}