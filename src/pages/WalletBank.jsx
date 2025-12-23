import React, { useState } from 'react';
import { walletBalance, transactions } from '../data/mockData';
import { Card } from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import ActionButton from '../components/ui/ActionButton';
import TransactionItem from '../components/ui/TransactionItem';
import TransferModal from '../components/wallet/TransferModal';
import ReceiveModal from '../components/wallet/ReceiveModal';
import DepositModal from '../components/wallet/DepositModal';
import WithdrawModal from '../components/wallet/WithdrawModal';
import { ArrowUpRight, ArrowDownLeft, Plus, Download, DollarSign, Bitcoin, PieChart, TrendingUp } from 'lucide-react';

const WalletBank = () => {
    const [modal, setModal] = useState(null); // 'transfer' | 'receive' | 'deposit' | 'withdraw'

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Wallet & Bank</h2>
                <p className="text-gray-500 text-sm">Manage your digital assets and transactions</p>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <ActionButton icon={ArrowUpRight} label="Transfer coins" onClick={() => setModal('transfer')} />
                <ActionButton icon={ArrowDownLeft} label="Get coins" onClick={() => setModal('receive')} />
                <ActionButton icon={Plus} label="Deposit coins" onClick={() => setModal('deposit')} />
                <ActionButton icon={Download} label="Withdraw" onClick={() => setModal('withdraw')} />
            </div>

            {/* Main Balance */}
            <Card className="flex flex-col md:flex-row items-center justify-between">
                <div>
                    <p className="text-sm font-bold text-gray-400 uppercase tracking-wide">Total Balance</p>
                    <h2 className="text-4xl font-bold text-gray-900 my-2">${walletBalance.totalUsd.toLocaleString()}</h2>
                    <p className="text-green-500 font-medium text-sm flex items-center">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        +{walletBalance.growth}% this week
                    </p>
                </div>
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mt-4 md:mt-0">
                    <Bitcoin className="w-8 h-8 text-gray-300" />
                </div>
            </Card>

            {/* Asset Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <StatCard
                    label="FIAT BALANCE"
                    value={`$${walletBalance.fiat.amount.toLocaleString()}`}
                    trend="up"
                    trendValue={`${walletBalance.fiat.growth}%`}
                    icon={DollarSign}
                    dark
                />
                <StatCard
                    label="CRYPTO ASSETS"
                    value={`$${walletBalance.crypto.amount.toLocaleString()}`}
                    trend="up"
                    trendValue={`${walletBalance.crypto.growth}%`}
                    icon={Bitcoin}
                    dark
                />
                <StatCard
                    label="ASSET VALUE"
                    value={`$${walletBalance.assets.amount.toLocaleString()}`}
                    trend="up"
                    trendValue={`${walletBalance.assets.growth}%`}
                    icon={PieChart}
                    dark
                />
                <StatCard
                    label="ROI (YTD)"
                    value={`+${walletBalance.roi.percentage}%`}
                    subValue={walletBalance.roi.details}
                    icon={TrendingUp}
                    dark
                />
            </div>



            {/* Transaction History */}
            <div>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="font-bold text-lg text-gray-900">Recent Transactions</h3>
                    <button className="text-primary text-sm font-medium hover:underline">View All &gt;</button>
                </div>
                <div className="space-y-3">
                    {transactions.map(tx => (
                        <TransactionItem key={tx.id} transaction={tx} />
                    ))}
                </div>
            </div>

            {/* Modals */}
            <TransferModal isOpen={modal === 'transfer'} onClose={() => setModal(null)} />
            <ReceiveModal isOpen={modal === 'receive'} onClose={() => setModal(null)} />
            <DepositModal isOpen={modal === 'deposit'} onClose={() => setModal(null)} />
            <WithdrawModal isOpen={modal === 'withdraw'} onClose={() => setModal(null)} />


        </div>
    );
};

export default WalletBank;
