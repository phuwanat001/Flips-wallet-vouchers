import React, { useState } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Shield, Smartphone, Key, History, Mail, Lock, Monitor, Smartphone as PhoneIcon, Check } from 'lucide-react';
import { loginActivity } from '../data/mockData';

const Security = () => {
    const [is2FAEnabled, setIs2FAEnabled] = useState(true);
    const [selected2FAMethod, setSelected2FAMethod] = useState('sms'); // 'sms', 'email', 'app'

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Security Settings</h2>
                <p className="text-gray-500 text-sm">Manage your account security and privacy settings</p>
            </div>

            {/* Change Password */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Key className="w-5 h-5 text-yellow-500" /> Change Password
                </h3>
                <Card className="space-y-4 p-6">
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Current Password</label>
                        <input type="password" placeholder="Enter current password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">New Password</label>
                        <input type="password" placeholder="Enter new password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div className="space-y-1">
                        <label className="text-sm font-medium text-gray-700">Confirm New Password</label>
                        <input type="password" placeholder="Confirm new password" className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none" />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm font-medium text-gray-900 mb-2">Password Requirements:</p>
                        <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
                            <li>Minimum 8 characters</li>
                            <li>At least one uppercase letter</li>
                            <li>At least one lowercase letter</li>
                            <li>At least one number</li>
                            <li>At least one special symbol (!@#$%^&*)</li>
                        </ul>
                    </div>

                    <div className="pt-2">
                        <Button className="w-40">Save Changes</Button>
                    </div>
                </Card>
            </div>

            {/* 2FA */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-yellow-500" /> Two-Factor Authentication
                </h3>
                <p className="text-gray-500 text-sm">Enable an extra layer of security for your account</p>

                <div className="flex items-center gap-3">
                    <div
                        className={`w-14 h-8 rounded-full p-1 cursor-pointer transition-colors ${is2FAEnabled ? 'bg-blue-500' : 'bg-gray-300'}`}
                        onClick={() => setIs2FAEnabled(!is2FAEnabled)}
                    >
                        <div className={`bg-white w-6 h-6 rounded-full shadow-sm transition-transform ${is2FAEnabled ? 'translate-x-6' : 'translate-x-0'}`} />
                    </div>
                </div>

                <div className={`space-y-3 transition-opacity ${is2FAEnabled ? 'opacity-100' : 'opacity-50 pointer-events-none'}`}>
                    {[
                        { id: 'sms', label: 'SMS OTP', sub: 'Receive codes via text message', icon: Smartphone },
                        { id: 'email', label: 'Email OTP', sub: 'Receive codes via email', icon: Mail },
                        { id: 'app', label: 'Authenticator App', sub: 'Google Auth / Microsoft Auth', icon: Lock },
                    ].map((method) => (
                        <div
                            key={method.id}
                            onClick={() => setSelected2FAMethod(method.id)}
                            className={`flex items-center p-4 border rounded-xl cursor-pointer transition-all ${selected2FAMethod === method.id ? 'border-gray-400 bg-gray-50 shadow-sm ring-1 ring-gray-400' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                            <div className={`w-5 h-5 rounded-full border flex items-center justify-center mr-4 ${selected2FAMethod === method.id ? 'border-gray-900' : 'border-gray-300'}`}>
                                {selected2FAMethod === method.id && <div className="w-2.5 h-2.5 rounded-full bg-gray-900" />}
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center gap-2">
                                    <method.icon className="w-4 h-4 text-gray-600" />
                                    <p className="font-semibold text-gray-900">{method.label}</p>
                                </div>
                                <p className="text-sm text-gray-500 ml-6">{method.sub}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="flex gap-4 pt-2">
                    <Button className="bg-brand-dark hover:bg-brand-navy">Setup 2FA</Button>
                    <Button variant="outline" className="bg-black text-white hover:bg-gray-800 border-none">backup code</Button>
                </div>
            </div>

            {/* Device Activity */}
            <div className="space-y-4">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <Monitor className="w-5 h-5 text-gray-900" /> Device & Login Activity
                </h3>

                <div className="bg-gray-50 rounded-xl overflow-hidden">
                    <div className="grid grid-cols-4 p-4 bg-gray-200 text-sm font-bold text-gray-700">
                        <div>Device</div>
                        <div>Location</div>
                        <div>Last Login</div>
                        <div className="text-right">Action</div>
                    </div>
                    <div className="divide-y divide-gray-200">
                        {loginActivity.map((activity) => (
                            <div key={activity.id} className="grid grid-cols-4 p-4 items-center text-sm">
                                <div className="font-medium flex items-center gap-2">
                                    {activity.device.includes('iPhone') ? <Smartphone className="w-4 h-4" /> : <Monitor className="w-4 h-4" />}
                                    {activity.device}
                                </div>
                                <div className="text-gray-600 font-medium">{activity.location}</div>
                                <div className="text-gray-600 font-medium">{activity.lastLogin}</div>
                                <div className="text-right">
                                    <button className="bg-red-500 hover:bg-red-600 text-white text-xs px-3 py-1.5 rounded-md transition-colors">
                                        Log Out
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex justify-center pt-4">
                    <Button className="bg-brand-dark hover:bg-brand-navy w-48">Log Out All Device</Button>
                </div>
            </div>
        </div>
    );
};

export default Security;
