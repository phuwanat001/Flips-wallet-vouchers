import React from 'react';
import { ArrowUpRight, ArrowDownLeft, Wallet, RefreshCw } from 'lucide-react';

export const TransactionItem = ({ transaction, onClick }) => {
    const getIcon = () => {
        switch (transaction.type) {
            case 'Transfer': return <ArrowUpRight className="w-5 h-5 text-gray-600" />;
            case 'Receive': return <ArrowDownLeft className="w-5 h-5 text-primary" />;
            case 'Deposit': return <ArrowDownLeft className="w-5 h-5 text-green-600" />;
            case 'Withdraw': return <ArrowUpRight className="w-5 h-5 text-red-600" />;
            default: return <RefreshCw className="w-5 h-5 text-gray-600" />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'Success': return 'text-green-500';
            case 'Pending': return 'text-blue-500';
            case 'Failed': return 'text-red-500';
            default: return 'text-gray-500';
        }
    };

    return (
        <div
            className="flex items-center justify-between p-4 bg-blue-50/50 hover:bg-blue-50 rounded-xl transition-colors cursor-pointer mb-2 last:mb-0"
            onClick={onClick}
        >
            <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm">
                    {getIcon()}
                </div>
                <div>
                    <h4 className="font-semibold text-sm text-gray-900">{transaction.title}</h4>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                </div>
            </div>

            <div className="text-right">
                <p className={`font-bold text-sm ${transaction.amount > 0 ? 'text-gray-900' : 'text-gray-900'}`}>
                    {transaction.amount > 0 ? '+' : ''}{transaction.amount} {transaction.currency}
                </p>
                <div className="flex items-center justify-end gap-1">
                    <div className={`w-1.5 h-1.5 rounded-full ${transaction.status === 'Success' ? 'bg-green-500' : transaction.status === 'Pending' ? 'bg-blue-500' : 'bg-red-500'}`} />
                    <span className={`text-[10px] font-medium ${getStatusColor(transaction.status)}`}>
                        {transaction.status}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default TransactionItem;
