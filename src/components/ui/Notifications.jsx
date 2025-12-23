import React, { useState } from 'react';
import { Check, AlertTriangle, DollarSign } from 'lucide-react';
import { notifications } from '../../data/mockData';

const Notifications = () => {
    const [filter, setFilter] = useState('All'); // 'All', 'Unread', 'Read'

    const filteredNotifications = notifications.filter(n => {
        if (filter === 'All') return true;
        if (filter === 'Unread') return !n.read;
        if (filter === 'Read') return n.read;
        return true;
    });

    const getIcon = (type) => {
        switch (type) {
            case 'success':
                return <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center"><Check className="w-5 h-5 text-green-600" /></div>;
            case 'warning':
                return <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center"><AlertTriangle className="w-5 h-5 text-orange-600" /></div>;
            case 'info':
                return <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><DollarSign className="w-5 h-5 text-blue-600" /></div>;
            default:
                return <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center"><Check className="w-5 h-5 text-gray-600" /></div>;
        }
    };

    return (
        <div className="absolute top-16 right-6 w-96 bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden z-50">
            {/* Header */}
            <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                <h3 className="text-gray-900 font-bold text-lg">Notifications</h3>
            </div>

            {/* Filter */}
            <div className="flex items-center bg-gray-50 p-1 gap-1 m-2 rounded-lg">
                {['All', 'Unread', 'Read'].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-colors ${filter === f ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-900'
                            }`}
                    >
                        {f}
                    </button>
                ))}
            </div>
            <div className="px-4 pb-2 text-right">
                <button className="text-xs text-primary font-medium hover:text-blue-700">Mark all as read</button>
            </div>

            {/* List */}
            <div className="max-h-[400px] overflow-y-auto">
                {filteredNotifications.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 text-sm">No notifications found</div>
                ) : (
                    <div className="divide-y divide-gray-100">
                        {filteredNotifications.map((notif) => (
                            <div key={notif.id} className={`p-4 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}>
                                <div className="flex gap-4">
                                    <div className="flex-shrink-0 pt-1">
                                        {getIcon(notif.type)}
                                    </div>
                                    <div className="flex-1 space-y-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-gray-900 font-bold text-sm">{notif.title}</h4>
                                            <span className="text-xs text-gray-400 whitespace-nowrap ml-2">{notif.time}</span>
                                        </div>
                                        <p className="text-gray-600 text-xs leading-relaxed">{notif.description}</p>

                                        <div className="flex gap-2 pt-2">
                                            <button className="px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 text-xs font-bold rounded shadow-sm transition-colors border border-yellow-200">
                                                View details
                                            </button>
                                            <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 text-xs font-medium rounded transition-colors">
                                                Dismiss
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;
