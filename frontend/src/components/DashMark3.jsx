import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Sample data
const initialSalesByCategory = [
  { name: "Mountain Bikes", value: 4000 },
  { name: "Road Bikes", value: 3000 },
  { name: "Hybrid Bikes", value: 2000 },
  { name: "Electric Bikes", value: 2800 },
];

const initialSalesByRegion = [
  { name: "North", value: 3500 },
  { name: "South", value: 2800 },
  { name: "East", value: 3200 },
  { name: "West", value: 4100 },
];

const initialMonthlyData = [
  { month: "Jan", mountain: 400, road: 240, hybrid: 200, electric: 280 },
  { month: "Feb", mountain: 300, road: 380, hybrid: 250, electric: 300 },
  { month: "Mar", mountain: 600, road: 420, hybrid: 210, electric: 380 },
  { month: "Apr", mountain: 550, road: 380, hybrid: 260, electric: 420 },
  { month: "May", mountain: 700, road: 490, hybrid: 280, electric: 460 },
  { month: "Jun", mountain: 750, road: 540, hybrid: 300, electric: 490 },
];

const initialTrendData = [
  { month: "Jan", sales: 1120, service: 400, accessories: 200 },
  { month: "Feb", sales: 1230, service: 420, accessories: 210 },
  { month: "Mar", sales: 1610, service: 460, accessories: 230 },
  { month: "Apr", sales: 1610, service: 480, accessories: 250 },
  { month: "May", sales: 1930, service: 500, accessories: 270 },
  { month: "Jun", sales: 2080, service: 520, accessories: 290 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

const MetricCard = ({ title, value }) => (
  <Card className="shadow-lg">
    <CardHeader>
      <CardTitle className="text-lg text-gray-700">{title}</CardTitle>
    </CardHeader>
    <CardContent>
      <p className="text-3xl font-bold text-blue-600">{value}</p>
    </CardContent>
  </Card>
);

const DashMark3 = () => {
  // State for filters
  const [timeRange, setTimeRange] = useState("6m");
  const [region, setRegion] = useState("all");
  const [category, setCategory] = useState("all");

  // State for chart data
  const [salesByCategory, setSalesByCategory] = useState(
    initialSalesByCategory
  );
  const [salesByRegion, setSalesByRegion] = useState(initialSalesByRegion);
  const [monthlyData, setMonthlyData] = useState(initialMonthlyData);
  const [trendData, setTrendData] = useState(initialTrendData);

  // Filter options
  const timeRangeOptions = [
    { value: "3m", label: "Last 3 Months" },
    { value: "6m", label: "Last 6 Months" },
    { value: "1y", label: "Last Year" },
  ];

  const regionOptions = [
    { value: "all", label: "All Regions" },
    { value: "north", label: "North" },
    { value: "south", label: "South" },
    { value: "east", label: "East" },
    { value: "west", label: "West" },
  ];

  const categoryOptions = [
    { value: "all", label: "All Categories" },
    { value: "mountain", label: "Mountain Bikes" },
    { value: "road", label: "Road Bikes" },
    { value: "hybrid", label: "Hybrid Bikes" },
    { value: "electric", label: "Electric Bikes" },
  ];

  // Handle filter changes
  const handleTimeRangeChange = (value) => {
    setTimeRange(value);
    // Example: Filter monthly data based on time range
    if (value === "3m") {
      setMonthlyData(initialMonthlyData.slice(3)); // Last 3 months
    } else if (value === "6m") {
      setMonthlyData(initialMonthlyData); // Last 6 months (default)
    } else if (value === "1y") {
      // Example logic if you had data for the whole year
      setMonthlyData(initialMonthlyData); // Extend to the whole year if available
    }
  };

  const handleRegionChange = (value) => {
    setRegion(value);
    // Example: Filter sales by region
    if (value === "north") {
      setSalesByRegion([initialSalesByRegion[0]]);
    } else if (value === "south") {
      setSalesByRegion([initialSalesByRegion[1]]);
    } else if (value === "east") {
      setSalesByRegion([initialSalesByRegion[2]]);
    } else if (value === "west") {
      setSalesByRegion([initialSalesByRegion[3]]);
    } else {
      setSalesByRegion(initialSalesByRegion); // All regions
    }
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    // Example: Filter sales by category
    if (value === "mountain") {
      setSalesByCategory([initialSalesByCategory[0]]);
    } else if (value === "road") {
      setSalesByCategory([initialSalesByCategory[1]]);
    } else if (value === "hybrid") {
      setSalesByCategory([initialSalesByCategory[2]]);
    } else if (value === "electric") {
      setSalesByCategory([initialSalesByCategory[3]]);
    } else {
      setSalesByCategory(initialSalesByCategory); // All categories
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      {/* Dashboard Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 text-center">
          Bike Sales Dashboard
        </h1>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <Select onValueChange={handleTimeRangeChange} defaultValue={timeRange}>
          <SelectTrigger>
            <SelectValue placeholder="Select Time Range" />
          </SelectTrigger>
          <SelectContent>
            {timeRangeOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleRegionChange} defaultValue={region}>
          <SelectTrigger>
            <SelectValue placeholder="Select Region" />
          </SelectTrigger>
          <SelectContent>
            {regionOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select onValueChange={handleCategoryChange} defaultValue={category}>
          <SelectTrigger>
            <SelectValue placeholder="Select Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <MetricCard title="Cities we distribute" value="45+" />
        <MetricCard title="Average Price" value="$1,250" />
        <MetricCard title="Brands we offer" value="12" />
        <MetricCard title="Total no. of bikes" value="2,500+" />
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-2 gap-4">
        {/* Pie Chart: Sales by Category */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByCategory}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                  dataKey="value"
                >
                  {salesByCategory.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Bar Chart: Sales by Region */}
        <Card>
          <CardHeader>
            <CardTitle>Sales by Region</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByRegion}>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Area Chart: Monthly Sales */}
        <Card>
          <CardHeader>
            <CardTitle>Monthly Sales (Bikes)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient
                    id="colorMountain"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorRoad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="mountain"
                  stroke="#8884d8"
                  fillOpacity={1}
                  fill="url(#colorMountain)"
                />
                <Area
                  type="monotone"
                  dataKey="road"
                  stroke="#82ca9d"
                  fillOpacity={1}
                  fill="url(#colorRoad)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Line Chart: Sales Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Trends</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={trendData}>
                <XAxis dataKey="month" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#8884d8" />
                <Bar dataKey="service" fill="#82ca9d" />
                <Bar dataKey="accessories" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashMark3;
