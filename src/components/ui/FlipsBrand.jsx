import React from 'react';

const FlipsBrand = ({ className }) => {
    return (
        <div className={`flex items-center ${className} select-none`}>
            {/* Using an SVG for pixel-perfect control over the '!' alignment */}
            <svg
                height="32"
                viewBox="0 0 100 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-auto"
            >
                {/* Text 'fl' */}
                <text x="0" y="24" fontFamily="sans-serif" fontWeight="bold" fontSize="32" fill="#0F172A" letterSpacing="-1">fl</text>

                {/* Custom '!' */}
                {/* Top bar of ! */}
                <rect x="25" y="4" width="6" height="15" rx="3" fill="#38BDF8" />
                {/* Bottom dot of ! */}
                <circle cx="28" cy="24" r="3" fill="#38BDF8" />

                {/* Text 'ps' */}
                <text x="36" y="24" fontFamily="sans-serif" fontWeight="bold" fontSize="32" fill="#0F172A" letterSpacing="-1">ps</text>
            </svg>
        </div>
    );
};

export default FlipsBrand;
