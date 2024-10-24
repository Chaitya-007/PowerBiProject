// src/components/Dashboard/BikeSalesDashboard.jsx
import React, { useState, useEffect } from "react";
import { Card, CardTitle } from "./ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts";

const MetricsCard = ({ title, value }) => (
  <div className="bg-white rounded-lg shadow p-6 text-center">
    <h3 className="text-gray-600 text-sm font-medium mb-2">{title}</h3>
    <p className="text-2xl font-bold text-gray-800">{value}</p>
  </div>
);

const BikeSalesDashboard = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({
    city: "all",
    brand: "all",
    power: "all",
  });

  const COLORS = [
    "#FF6384",
    "#36A2EB",
    "#FFCE56",
    "#4BC0C0",
    "#9966FF",
    "#FF9F40",
    "#4BC0C0",
    "#36A2EB",
    "#FF6384",
    "#FFB1C1",
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await fetch("/data/bikes.csv");
        const csvText = await response.text();
        const parsedData = parseCSV(csvText);
        setData(parsedData);
        setFilteredData(parsedData);
      } catch (error) {
        console.error("Error loading data:", error);
        // Set sample data as fallback
        const sampleData = [
          /* your sample data */
        ];
        setData(sampleData);
        setFilteredData(sampleData);
      }
    };

    loadData();
  }, []);

  const parseCSV = (csvText) => {
    const rows = csvText.split("\n");
    const headers = rows[0].split(",").map((h) => h.trim());

    return rows.slice(1).map((row) => {
      const values = row.split(",");
      return headers.reduce((obj, header, index) => {
        obj[header] = values[index]?.trim();
        return obj;
      }, {});
    });
  };

  useEffect(() => {
    const newFilteredData = data.filter((item) => {
      return (
        (filters.city === "all" || item.city === filters.city) &&
        (filters.brand === "all" || item.brand === filters.brand) &&
        (filters.power === "all" || item.power === filters.power)
      );
    });
    setFilteredData(newFilteredData);
  }, [filters, data]);

  const getDistribution = (key) => {
    const distribution = filteredData.reduce((acc, item) => {
      acc[item[key]] = (acc[item[key]] || 0) + 1;
      return acc;
    }, {});

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getMetrics = () => {
    const avgPrice =
      filteredData.reduce((sum, item) => sum + parseFloat(item.price), 0) /
      filteredData.length;
    const totalBrands = new Set(filteredData.map((item) => item.brand)).size;

    return {
      averagePrice: new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: "INR",
      }).format(avgPrice),
      totalBrands,
      totalBikes: filteredData.length,
    };
  };

  const metrics = getMetrics();

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Bike Sales Dashboard
        </h1>

        {/* Filters */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {["city", "brand", "power"].map((filterType) => (
            <Select
              key={filterType}
              value={filters[filterType]}
              onValueChange={(value) =>
                setFilters((prev) => ({ ...prev, [filterType]: value }))
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={`Select ${filterType}`} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All {filterType}s</SelectItem>
                {[...new Set(data.map((item) => item[filterType]))].map(
                  (value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          ))}
        </div>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetricsCard title="Average Price" value={metrics.averagePrice} />
          <MetricsCard title="Total Brands" value={metrics.totalBrands} />
          <MetricsCard title="Total Bikes" value={metrics.totalBikes} />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Power Distribution Pie Chart */}
          <Card className="p-4">
            <CardTitle className="mb-4">Power Distribution</CardTitle>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getDistribution("power")}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {getDistribution("power").map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Owner Distribution Pie Chart */}
          <Card className="p-4">
            <CardTitle className="mb-4">Owner Distribution</CardTitle>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={getDistribution("owner")}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label
                  >
                    {getDistribution("owner").map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* City Brand Distribution */}
          <Card className="p-4">
            <CardTitle className="mb-4">Cities by Brand</CardTitle>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={getDistribution("brand")}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#36A2EB" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          {/* Brand City Area Chart */}
          <Card className="p-4">
            <CardTitle className="mb-4">Brand by City Distribution</CardTitle>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={getDistribution("city")}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    fill="#8884d8"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BikeSalesDashboard;
