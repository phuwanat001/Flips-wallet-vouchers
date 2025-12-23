import React from 'react';
import { Card } from '../components/ui/Card';
import { Globe, Bell, Moon, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';

const System = () => {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">System Settings</h2>
                <p className="text-gray-500 text-sm">Customize your platform experience</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        <Globe className="w-5 h-5 text-gray-500" />
                        <span className="font-medium text-gray-900">Language</span>
                    </div>
                    <span className="text-sm text-gray-500">English (US)</span>
                </Card>

                <Card className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        <Bell className="w-5 h-5 text-gray-500" />
                        <span className="font-medium text-gray-900">Notifications</span>
                    </div>
                    <span className="text-sm text-green-600 font-medium">On</span>
                </Card>

                <Card className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        <Moon className="w-5 h-5 text-gray-500" />
                        <span className="font-medium text-gray-900">Theme</span>
                    </div>
                    <span className="text-sm text-gray-500">Light</span>
                </Card>

                <Card className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                        <HelpCircle className="w-5 h-5 text-gray-500" />
                        <span className="font-medium text-gray-900">Help & Support</span>
                    </div>
                </Card>
            </div>

            <div className="flex justify-center pt-8">
                <p className="text-xs text-gray-400">FLIPS Platform v1.2.0 • Build 2024.12.23</p>
            </div>
        </div>
    );
};

export default System;
