import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({ children, variant = 'default', className }) => {
    const variants = {
        default: "bg-gray-100 text-gray-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-orange-100 text-orange-700",
        error: "bg-red-100 text-red-700",
        info: "bg-blue-100 text-blue-700",
        primary: "bg-primary/10 text-primary",
    };

    return (
        <span className={twMerge(
            "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide",
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};

export default Badge;
