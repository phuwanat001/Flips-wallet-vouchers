import React from 'react';
import { Card } from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import BalanceChart from '../components/dashboard/BalanceChart';
import AllocationPie from '../components/dashboard/AllocationPie';
import RevenueBar from '../components/dashboard/RevenueBar';
import { DollarSign, PieChart, TrendingUp, Layers } from 'lucide-react';
import { walletBalance, investmentStats } from '../data/mockData';

const Dashboard = () => {
    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Analytics Dashboard</h2>
                <p className="text-gray-500 text-sm">Track your investments and portfolio performance</p>
            </div>

            {/* Summary Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard label="Total Balance" value={`$${walletBalance.totalUsd.toLocaleString()}`} icon={DollarSign} dark />
                <StatCard label="Portfolio Value" value={`$${walletBalance.assets.amount.toLocaleString()}`} icon={PieChart} dark />
                <StatCard label="Total Investments" value={investmentStats.activeProjects} icon={Layers} dark />
                <StatCard label="Average ROI" value={`+${walletBalance.roi.percentage}%`} icon={TrendingUp} dark />
            </div>

            {/* Charts Row 1 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <RevenueBar />
                <AllocationPie />
            </div>

            {/* Charts Row 2 */}
            <div>
                <BalanceChart />
            </div>

            {/* Investment Performance Bar Chart (Placeholder for simplicity, re-using revenue structure if needed or creating new) */}
            {/* Note: The reference image showed more charts, but these 3 cover the main types. Adding simpler placeholder for bottom section. */}

            <Card>
                <h3 className="text-lg font-bold text-gray-900 mb-4">Investment Performance by Sector</h3>
                <div className="space-y-4">
                    {[
                        { name: 'Tech Innovation', val: 85, color: 'bg-green-500' },
                        { name: 'Green Energy', val: 65, color: 'bg-green-400' },
                        { name: 'Real Estate', val: 40, color: 'bg-blue-500' },
                        { name: 'Crypto Fund', val: 20, color: 'bg-yellow-500' },
                        { name: 'Emerging Markets', val: 10, color: 'bg-red-500', negative: true }
                    ].map((item) => (
                        <div key={item.name} className="flex items-center gap-4">
                            <span className="text-sm font-medium w-32 text-gray-500">{item.name}</span>
                            <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden flex">
                                {item.negative ? (
                                    <div className="w-1/2 flex justify-end">
                                        <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                                    </div>
                                ) : (
                                    <div className="w-1/2"></div>
                                )}
                                {!item.negative && (
                                    <div className={`h-full ${item.color}`} style={{ width: `${item.val}%` }}></div>
                                )}
                            </div>
                            <span className="text-sm font-bold w-12 text-right">{item.negative ? '-' : '+'}{item.val}%</span>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Dashboard;
