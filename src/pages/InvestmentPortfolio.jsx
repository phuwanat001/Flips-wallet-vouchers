import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Filter, Search } from 'lucide-react';
import { investments } from '../data/mockData';
import InvestmentCard from '../components/profile/InvestmentCard';

const InvestmentPortfolio = () => {
    const navigate = useNavigate();
    const [filter, setFilter] = useState('All');

    const handleClaim = (investment) => {
        alert(`Claiming rewards for ${investment.name}`);
    };

    const filteredInvestments = filter === 'All'
        ? investments
        : investments.filter(item => item.type === filter);

    return (
        <div className="space-y-6 max-w-7xl mx-auto pb-10">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                    <Button variant="ghost" size="icon" onClick={() => navigate('/')}>
                        <ArrowLeft className="w-5 h-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Investment Portfolio</h1>
                        <p className="text-sm text-gray-500">Manage your assets and claim rewards</p>
                    </div>
                </div>

                <div className="flex gap-3">
                    <div className="relative hidden md:block">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search projects..."
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary"
                        />
                    </div>
                    <Button variant="outline" className="flex items-center gap-2">
                        <Filter className="w-4 h-4" /> Filter
                    </Button>
                </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['All', 'Movie', 'Real Estate', 'Yacht'].map(type => (
                    <button
                        key={type}
                        onClick={() => setFilter(type)}
                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${filter === type
                                ? 'bg-primary text-white shadow-lg shadow-blue-500/30'
                                : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-100'
                            }`}
                    >
                        {type}
                    </button>
                ))}
            </div>

            {/* Portfolio Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredInvestments.map(item => (
                    <InvestmentCard key={item.id} investment={item} onClaim={handleClaim} />
                ))}
            </div>
        </div>
    );
};

export default InvestmentPortfolio;
