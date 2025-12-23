import React from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Download, PieChart, TrendingUp, BarChart3 } from 'lucide-react';
import { investments } from '../data/mockData';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    PieChart as RePieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const InvestmentReport = () => {
    const navigate = useNavigate();

    // Mock data for charts
    const performanceData = [
        { name: 'Jan', value: 1000 },
        { name: 'Feb', value: 3500 },
        { name: 'Mar', value: 8000 },
        { name: 'Apr', value: 12000 },
        { name: 'May', value: 18000 },
        { name: 'Jun', value: 24000 },
    ];

    const sectorData = [
        { name: 'Movie', value: 60, color: '#0a1929' },
        { name: 'Real Estate', value: 30, color: '#4FC3F7' },
        { name: 'Yacht', value: 10, color: '#8BC34A' },
    ];

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Investment Report</h1>
                        <p className="text-sm text-gray-500">Detailed analytics and performance metrics</p>
                    </div>
                </div>
                <Button variant="outline" className="flex items-center gap-2">
                    <Download className="w-4 h-4" /> Export PDF
                </Button>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-[#0B1739] border-gray-800 text-white">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-500/20 rounded-lg">
                            <TrendingUp className="w-5 h-5 text-blue-400" />
                        </div>
                        <span className="text-gray-400 text-sm">Total ROI</span>
                    </div>
                    <h3 className="text-3xl font-bold mb-1">185%</h3>
                    <p className="text-sm text-green-400">+231,250,000 THB</p>
                </Card>

                <Card>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-sky-100 rounded-lg">
                            <PieChart className="w-5 h-5 text-sky-600" />
                        </div>
                        <span className="text-gray-500 text-sm">Active Projects</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">8</h3>
                    <p className="text-sm text-gray-500">Across 3 Sectors</p>
                </Card>

                <Card>
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-100 rounded-lg">
                            <BarChart3 className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="text-gray-500 text-sm">Total Invested</span>
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1">฿125M</h3>
                    <p className="text-sm text-gray-500">Since Jan 2024</p>
                </Card>
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                    <h3 className="font-bold text-gray-900 mb-6">Portfolio Growth</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4FC3F7" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#4FC3F7" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 12 }} />
                                <Tooltip />
                                <Area type="monotone" dataKey="value" stroke="#0288D1" fillOpacity={1} fill="url(#colorValue)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </Card>

                <Card>
                    <h3 className="font-bold text-gray-900 mb-6">Allocation by Sector</h3>
                    <div className="h-64 flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={sectorData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {sectorData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </RePieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        {sectorData.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                <span className="text-sm text-gray-600">{item.name} ({item.value}%)</span>
                            </div>
                        ))}
                    </div>
                </Card>
            </div>

            {/* Detailed Table */}
            <Card className="overflow-hidden">
                <h3 className="font-bold text-gray-900 mb-6">Investment Performance Detail</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="bg-gray-50 text-left">
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Project Name</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Type</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Invested</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Current Value</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">ROI</th>
                                <th className="p-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-center">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {investments.map((item) => (
                                <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="p-4 font-medium text-gray-900">{item.name}</td>
                                    <td className="p-4 text-sm text-gray-500">{item.type}</td>
                                    <td className="p-4 text-sm text-gray-900 text-right">{item.invested.toLocaleString()} THB</td>
                                    <td className="p-4 text-sm font-bold text-green-600 text-right">+{item.returnVal.toLocaleString()} THB</td>
                                    <td className="p-4 text-sm font-bold text-primary text-right">{item.roi}%</td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${item.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                item.status === 'Sold Out' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default InvestmentReport;
