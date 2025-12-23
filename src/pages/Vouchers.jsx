import React, { useState } from 'react';
import { vouchers } from '../data/mockData';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import Modal from '../components/ui/Modal';
import { QrCode, Tag, Clock, Building } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const Vouchers = () => {
    const [selectedVoucher, setSelectedVoucher] = useState(null);

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Voucher Marketplace</h2>
                <p className="text-gray-500 text-sm">Browse and redeem your exclusive rewards</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vouchers.map((voucher) => (
                    <Card key={voucher.id} padding="p-0" className="overflow-hidden flex flex-col">
                        <div className="relative h-48">
                            <img src={voucher.image} alt={voucher.title} className="w-full h-full object-cover" />
                            <div className="absolute top-2 right-2">
                                <Badge variant="info" className="bg-white/90 backdrop-blur-sm shadow-sm">{voucher.tier}</Badge>
                            </div>
                        </div>
                        <div className="p-4 flex flex-col flex-1">
                            <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-lg text-gray-900">{voucher.title}</h3>
                            </div>

                            <div className="space-y-2 mb-4 flex-1">
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Tag className="w-4 h-4" /> {voucher.type}
                                </div>
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Building className="w-4 h-4" /> Asset: {voucher.asset}
                                </div>
                            </div>

                            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                                <span className="font-bold text-primary text-lg">฿{voucher.price.toLocaleString()}</span>
                                <Button size="sm" onClick={() => setSelectedVoucher(voucher)}>
                                    Redeem
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            <Modal
                isOpen={!!selectedVoucher}
                onClose={() => setSelectedVoucher(null)}
                title="Redeem Voucher"
            >
                {selectedVoucher && (
                    <div className="flex flex-col items-center space-y-6 text-center">
                        <div className="bg-white p-4 border border-gray-100 rounded-xl shadow-sm">
                            <QRCodeCanvas value={`redeem:${selectedVoucher.id}:${Date.now()}`} size={200} />
                        </div>

                        <div>
                            <h3 className="font-bold text-lg text-gray-900">{selectedVoucher.title}</h3>
                            <p className="text-sm text-gray-500">Show this QR code to the staff to redeem</p>
                        </div>

                        <div className="w-full bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-500">Voucher Type</span>
                                <span className="font-medium text-gray-900">{selectedVoucher.type}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Asset Value</span>
                                <span className="font-medium text-gray-900">{selectedVoucher.asset}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-500">Expires In</span>
                                <span className="font-bold text-orange-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> 24 Hours
                                </span>
                            </div>
                        </div>

                        <Button fullWidth onClick={() => setSelectedVoucher(null)}>Close</Button>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Vouchers;
