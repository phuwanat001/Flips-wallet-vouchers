import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Award } from 'lucide-react';

export const InvestmentCard = ({ investment, onClaim }) => {
    return (
        <Card padding="p-0" className="overflow-hidden flex flex-col h-full bg-[#0B1739] border border-gray-800 transition-shadow hover:shadow-lg hover:shadow-primary/20 group">
            <div className="relative h-40 overflow-hidden">
                <img
                    src={investment.image}
                    alt={investment.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-3 right-3 bg-white text-gray-900 text-xs font-bold px-3 py-1 rounded-full shadow-md">
                    {investment.roi}% ROI
                </div>
            </div>

            <div className="p-5 flex flex-col flex-1">
                <div className="mb-4">
                    <h3 className="font-bold text-lg text-white line-clamp-1 mb-1">{investment.name}</h3>
                    <p className="text-xs text-gray-400 capitalize">{investment.type}</p>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Invested</span>
                        <span className="font-bold text-sky-400">{investment.invested.toLocaleString()} THB</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-400">Value</span>
                        <span className="font-bold text-green-400">+{investment.returnVal.toLocaleString()} THB</span>
                    </div>
                </div>

                <div className="mt-auto flex items-center justify-between border-t border-gray-800 pt-4">
                    <span className={`text-xs font-medium ${investment.status === 'Completed' ? 'text-green-400' :
                            investment.status === 'Sold Out' ? 'text-gray-400' :
                                'text-yellow-400'
                        }`}>
                        {investment.status}
                    </span>

                    <button
                        onClick={() => onClaim(investment)}
                        className="flex items-center gap-1.5 text-xs font-bold text-white hover:text-primary transition-colors"
                    >
                        <Award className="w-3.5 h-3.5" />
                        Claim Rewards
                    </button>
                </div>
            </div>
        </Card>
    );
};

export default InvestmentCard;
