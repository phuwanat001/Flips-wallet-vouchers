import React from 'react';
import { Bell, Search, Menu } from 'lucide-react';
import { useLocation } from 'react-router-dom';

import Notifications from '../ui/Notifications';

const Header = ({ onMenuClick }) => {
    const location = useLocation();
    const [showNotifications, setShowNotifications] = React.useState(false);

    const getPageTitle = () => {
        switch (location.pathname) {
            case '/': return 'Profile';
            case '/wallet': return 'Wallet & Bank';
            case '/dashboard': return 'Analytics Dashboard';
            case '/security': return 'Security';
            case '/system': return 'System Settings';
            default: return 'Profile';
        }
    };

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-10 md:ml-64 relative">
            <div className="flex items-center gap-4">
                <button onClick={onMenuClick} className="md:hidden text-gray-600 hover:text-primary">
                    <Menu className="w-6 h-6" />
                </button>
                <h1 className="text-xl font-bold text-gray-900">{getPageTitle()}</h1>
            </div>

            <div className="flex items-center gap-6">


                <div className="flex items-center gap-4">
                    <div className="relative">
                        <button
                            onClick={() => setShowNotifications(!showNotifications)}
                            className="text-gray-400 hover:text-primary relative"
                        >
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                    </div>

                    <div className="relative">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search in site"
                            className="pl-9 pr-4 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 w-48"
                        />
                    </div>
                </div>
            </div>

            {showNotifications && <Notifications />}
        </header>
    );
};

export default Header;
