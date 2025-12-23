import React from 'react';
import { Card } from './Card';

export const ActionButton = ({ icon: Icon, label, onClick }) => {
    return (
        <Card
            onClick={onClick}
            className="p-4 flex flex-col items-center justify-center gap-3 cursor-pointer hover:shadow-md transition-shadow group flex-1 min-w-[120px]"
        >
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-gray-700">
                <Icon strokeWidth={1.5} className="w-6 h-6" />
            </div>
            <span className="text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">{label}</span>
        </Card>
    );
};

export default ActionButton;
