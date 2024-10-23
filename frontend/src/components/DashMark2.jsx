import React, { useState } from "react";
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

const DashMark2 = () => {
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
    // Update chart data based on time range
    // This is where you would typically fetch new data or filter existing data
  };

  const handleRegionChange = (value) => {
    setRegion(value);
    // Update chart data based on region
  };

  const handleCategoryChange = (value) => {
    setCategory(value);
    // Update chart data based on category
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
      <div className="grid grid-cols-2 gap-6">
        {/* Sales by Category Pie Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">
              Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByCategory}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
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
            </div>
          </CardContent>
        </Card>

        {/* Sales by Region Pie Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">
              Sales by Region
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesByRegion}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                  >
                    {salesByRegion.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Sales by Category - Clustered Column Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">
              Monthly Sales by Category
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="mountain" fill="#0088FE" name="Mountain" />
                  <Bar dataKey="road" fill="#00C49F" name="Road" />
                  <Bar dataKey="hybrid" fill="#FFBB28" name="Hybrid" />
                  <Bar dataKey="electric" fill="#FF8042" name="Electric" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Trend - Stacked Area Chart */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg text-gray-700">
              Revenue Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Area
                    type="monotone"
                    dataKey="sales"
                    stackId="1"
                    stroke="#0088FE"
                    fill="#0088FE"
                    name="Bike Sales"
                  />
                  <Area
                    type="monotone"
                    dataKey="service"
                    stackId="1"
                    stroke="#00C49F"
                    fill="#00C49F"
                    name="Service Revenue"
                  />
                  <Area
                    type="monotone"
                    dataKey="accessories"
                    stackId="1"
                    stroke="#FFBB28"
                    fill="#FFBB28"
                    name="Accessories"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashMark2;