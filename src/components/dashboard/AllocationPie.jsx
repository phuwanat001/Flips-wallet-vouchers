import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { Card } from '../ui/Card';

const data = [
    { name: 'Real Estate', value: 400, color: '#4FC3F7' },
    { name: 'Movies', value: 300, color: '#8BC34A' },
    { name: 'Yachts', value: 300, color: '#FF9800' },
    { name: 'Hotel', value: 200, color: '#9C27B0' },
];

const AllocationPie = () => {
    return (
        <Card className="h-[400px] w-full">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Portfolio Allocation</h3>
            <ResponsiveContainer width="100%" height="85%">
                <PieChart>
                    <Pie
                        data={data}
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" height={36} />
                </PieChart>
            </ResponsiveContainer>
        </Card>
    );
};

export default AllocationPie;
