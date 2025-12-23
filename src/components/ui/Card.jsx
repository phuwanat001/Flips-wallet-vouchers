import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({ children, className, padding = "p-6", onClick }) => {
    return (
        <div
            className={twMerge("bg-white rounded-2xl border border-gray-100 shadow-sm", padding, className)}
            onClick={onClick}
        >
            {children}
        </div>
    );
};

export default Card;
