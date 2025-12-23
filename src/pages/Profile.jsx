import React from 'react';
import { useNavigate } from 'react-router-dom';
import { userProfile, walletBalance, transactions, investments, investmentStats } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import InvestmentCard from '../components/profile/InvestmentCard';
import { Coins, CheckCircle, Wallet, History, AlertCircle, ArrowUpRight } from 'lucide-react';

const Profile = () => {
    const navigate = useNavigate();

    const handleClaim = (investment) => {
        alert(`Claiming rewards for ${investment.name}`);
    };

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            {/* Top Section: Profile Info and Wallet Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* Profile Card (Left) */}
                <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm">
                        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-white shadow-sm">
                            <img src={userProfile.avatar} alt="Profile" className="w-full h-full object-cover" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-900">{userProfile.name}</h2>
                            <div className="flex gap-2 mt-1">
                                <Badge variant="primary" className="flex items-center gap-1">
                                    <CheckCircle className="w-3 h-3" /> KYC Verified
                                </Badge>
                                <Badge variant="default" className="flex items-center gap-1">
                                    <Wallet className="w-3 h-3" /> Wallet Connected
                                </Badge>
                            </div>
                            <p className="text-xs text-gray-400 mt-1">Investing since 2020</p>
                        </div>
                        <div className="ml-auto">
                            <Button size="sm" variant="primary" onClick={() => navigate('/profile/edit')}>Edit Profile</Button>
                        </div>
                    </div>

                    <Card className="divide-y divide-gray-100">
                        <h3 className="font-bold text-gray-900 mb-4">Personal Information</h3>

                        <div className="grid grid-cols-1 gap-y-4">
                            {[
                                { label: 'Full Name', value: userProfile.name },
                                { label: 'Date of Birth', value: userProfile.dob },
                                { label: 'Age', value: `${userProfile.age} Years` },
                                { label: 'Email', value: userProfile.email },
                                { label: 'Address', value: userProfile.address },
                                { label: 'Phone', value: userProfile.phone },
                            ].map((item, i) => (
                                <div key={i} className="flex justify-between py-2 items-center">
                                    <span className="text-gray-400 text-sm">{item.label}</span>
                                    <span className="text-gray-900 font-medium text-right text-sm">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </Card>
                </div>

                {/* Wallet & Transactions (Right) */}
                <div className="lg:col-span-5 space-y-6">

                    {/* Main Balance Card */}
                    <Card>
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 bg-yellow-100 rounded-full">
                                <Coins className="w-6 h-6 text-yellow-600" />
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 font-medium">FLIPS Balance</p>
                                <h3 className="text-xl font-bold text-gray-900">88 Coins</h3>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-400">Total Balance</p>
                                <p className="font-bold text-gray-900">10,000</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-400">Available</p>
                                <p className="font-bold text-gray-900">5,000</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-400">Asset Value</p>
                                <p className="font-bold text-gray-900">15,000</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-xl">
                                <p className="text-xs text-gray-400">ROI</p>
                                <p className="font-bold text-gray-900">12%...</p>
                            </div>
                        </div>

                        <div className="border-t border-gray-100 pt-4">
                            <div className="flex justify-between items-center mb-3">
                                <h4 className="font-bold text-sm text-gray-900">Recent Transactions</h4>
                                <button className="text-xs text-primary font-medium">View All</button>
                            </div>
                            <div className="space-y-3">
                                {transactions.slice(0, 3).map(tx => (
                                    <div key={tx.id} className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center ${tx.status === 'Success' ? 'bg-green-100 text-green-600' :
                                                tx.status === 'Pending' ? 'bg-orange-100 text-orange-600' : 'bg-red-100 text-red-600'
                                                }`}>
                                                {tx.status === 'Success' ? <CheckCircle className="w-4 h-4" /> :
                                                    tx.status === 'Pending' ? <History className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-gray-900">{tx.title}</p>
                                                <p className="text-[10px] text-gray-400">{tx.amount} USD</p>
                                            </div>
                                        </div>
                                        <span className={`text-xs font-semibold ${tx.status === 'Success' ? 'text-green-600' :
                                            tx.status === 'Pending' ? 'text-orange-600' : 'text-red-600'
                                            }`}>{tx.status}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Investment Summary Banner */}
            {/* Investment Summary Banner - Redesigned */}
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#0B1739] to-[#1a2b5e] shadow-xl text-white">
                {/* Decorative Background Elements */}
                <div className="absolute top-0 right-0 -mt-16 -mr-16 w-64 h-64 bg-primary/30 rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 -mb-16 -ml-16 w-64 h-64 bg-purple-500/20 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 p-8 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                    {/* Total Value Section */}
                    <div className="space-y-2">
                        <div className="flex items-center gap-2 mb-1">
                            <div className="p-1.5 bg-white/10 rounded-lg">
                                <Wallet className="w-4 h-4 text-primary" />
                            </div>
                            <span className="text-sm font-medium text-blue-100">Total Investment Value</span>
                        </div>
                        <h2 className="text-4xl font-bold tracking-tight">฿125,000,000</h2>
                        <div className="flex items-center gap-2 text-sm text-blue-200/80 font-medium">
                            <span>≈ $3,620,000 USD</span>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                            <p className="text-xs text-blue-200 mb-1.5">Average ROI</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-green-400">185%</span>
                                <ArrowUpRight className="w-4 h-4 text-green-400" />
                            </div>
                        </div>
                        <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4">
                            <p className="text-xs text-blue-200 mb-1.5">Active Projects</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-2xl font-bold text-white">8</span>
                                <span className="text-xs text-blue-200">Active</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Section */}
                    <div className="flex flex-col items-start md:items-end justify-center gap-3">
                        <div className="text-right hidden md:block">
                            <p className="text-sm font-medium text-green-400">+ ฿231,250,000</p>
                            <p className="text-xs text-blue-300">Total Profit Generated</p>
                        </div>
                        <Button
                            variant="primary"
                            className="bg-primary hover:bg-primary-dark text-white border-0 shadow-lg shadow-primary/25 w-full md:w-auto"
                            onClick={() => navigate('/investments/report')}
                        >
                            View Analytics Report
                        </Button>
                    </div>
                </div>
            </div>

            {/* Investment Portfolio Teaser */}
            <div className="bg-primary rounded-2xl p-8 shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-white font-bold text-xl">Investment Portfolio</h3>
                    <Button variant="white" size="sm" onClick={() => navigate('/investments/portfolio')}>View All Assets</Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {investments.slice(0, 4).map(item => (
                        <InvestmentCard key={item.id} investment={item} onClaim={handleClaim} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Profile;
