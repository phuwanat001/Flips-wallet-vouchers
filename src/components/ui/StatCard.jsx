import React from 'react';
import { Card } from './Card';
import { TrendingUp, TrendingDown } from 'lucide-react';

export const StatCard = ({ label, value, subValue, trend, trendValue, icon: Icon, dark = false }) => {
    return (
        <Card className={`flex flex-col justify-between ${dark ? 'bg-primary text-white border-primary' : ''}`}>
            <div className="flex justify-between items-start">
                <div>
                    <p className={`text-sm font-medium ${dark ? 'text-gray-300' : 'text-gray-500'} mb-1`}>{label}</p>
                    <h3 className={`text-2xl font-bold ${dark ? 'text-white' : 'text-gray-900'}`}>{value}</h3>
                </div>
                {Icon && <Icon className={`w-5 h-5 ${dark ? 'text-gray-400' : 'text-gray-400'}`} />}
            </div>

            {(subValue || trendValue) && (
                <div className="mt-4 flex items-center gap-2">
                    {trend && (
                        <span className={`flex items-center text-xs font-semibold ${trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                            {trend === 'up' ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                            {trendValue}
                        </span>
                    )}
                    {subValue && (
                        <span className={`text-xs ${dark ? 'text-gray-400' : 'text-gray-400'}`}>
                            {subValue}
                        </span>
                    )}
                </div>
            )}
        </Card>
    );
};

export default StatCard;
