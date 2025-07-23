"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useState, useEffect, useMemo } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertCircle, ArrowUpRight, CreditCard, Users } from "lucide-react";
import { useRouter } from "next/navigation";

const BRANCH = {
  name: "Sunshine PG",
  address: "123 Main Street, Bangalore",
  occupied: 42,
  vacant: 8,
  totalCapacity: 50,
  facilities: ["WiFi", "AC", "Laundry", "Gym"],
  rules: "No smoking, No loud music after 10 PM",
  createdAt: "2024-01-01T00:00:00.000Z",
  monthlyRent: 8000
};

const ALERTS_DATA = [
  {
    title: "Water Leakage",
    severity: "High",
    location: "Room 302, Sunshine PG",
    time: "2 hours ago"
  },
  {
    title: "Electrical Issue",
    severity: "Medium",
    location: "Room 105, Sunshine PG",
    time: "5 hours ago"
  }
];

export default function ManagerDashboard() {
  const router = useRouter();
  const [branch, setBranch] = useState(BRANCH);

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      residents: branch.occupied,
      totalRooms: branch.occupied + branch.vacant,
      revenue: branch.occupied * (branch.monthlyRent || 8000),
      occupancyRate: ((branch.occupied / (branch.occupied + branch.vacant)) * 100).toFixed(1),
      complaints: Math.floor(Math.random() * 20)
    };
  }, [branch]);

  // Generate payment data
  const paymentData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const baseRevenue = stats.revenue;
    return months.map((month, index) => ({
      name: month,
      amount: Math.floor(baseRevenue * (0.95 + (index * 0.01))),
      occupied: stats.residents - Math.floor(Math.random() * 5)
    }));
  }, [stats.revenue, stats.residents]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const renderStatCard = (title, value, icon) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
      </CardContent>
    </Card>
  );

  const renderAlert = (title, severity, location, time) => (
    <div className="flex items-start gap-4 rounded-lg border p-3">
      <AlertCircle className={`mt-0.5 h-5 w-5 ${
        severity === 'High' ? 'text-red-500' : 'text-amber-500'
      }`} />
      <div>
        <div className="flex items-center gap-2">
          <h4 className="font-semibold">{title}</h4>
          <Badge variant={severity === 'High' ? "destructive" : "outline"}>{severity}</Badge>
        </div>
        <p className="text-sm text-muted-foreground">{location}</p>
        <p className="text-xs text-muted-foreground">{time}</p>
      </div>
    </div>
  );

  return (
    <div className="p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Branch Manager Dashboard</h1>
          <p className="text-muted-foreground">Overview of your branch: {branch.name}</p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {renderStatCard(
          "Total Residents",
          stats.residents.toString(),
          <Users className="h-4 w-4 text-muted-foreground" />
        )}
        {renderStatCard(
          "Occupancy Rate",
          `${stats.occupancyRate}%`,
          <Badge className="h-4 w-4 text-muted-foreground">%</Badge>
        )}
        {renderStatCard(
          "Monthly Revenue",
          formatCurrency(stats.revenue),
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        )}
        {renderStatCard(
          "Active Complaints",
          stats.complaints.toString(),
          <AlertCircle className="h-4 w-4 text-amber-500" />
        )}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Residents</CardTitle>
            <CardDescription>Manage residents in your branch</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/manager/residents")}>View Residents</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Complaints</CardTitle>
            <CardDescription>View and resolve complaints</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/manager/complaints")}>Manage Complaints</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payments</CardTitle>
            <CardDescription>View payment status and history</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/manager/payments")}>View Payments</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Analytics</CardTitle>
            <CardDescription>Branch analytics and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => router.push("/manager/analytics")}>View Analytics</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Emergency Alerts</CardTitle>
            <CardDescription>View and manage branch alerts</CardDescription>
          </CardHeader>
          <CardContent>
            {ALERTS_DATA.map((alert, idx) => renderAlert(alert.title, alert.severity, alert.location, alert.time))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 