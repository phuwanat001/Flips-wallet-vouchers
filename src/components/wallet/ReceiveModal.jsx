import React from 'react';
import Modal from '../ui/Modal';
import { Button } from '../ui/Button';
import { Copy, Download, Share2, AlertTriangle } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const ReceiveModal = ({ isOpen, onClose }) => {
    const address = "TQdsPrdhNuQKZkw2pAoocpEABPgYZs9ULa";

    const handleCopy = () => {
        navigator.clipboard.writeText(address);
        // Could add toast here
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Receive TRX" maxWidth="max-w-md">
            <div className="flex flex-col items-center space-y-6">
                <div className="text-center">
                    <p className="text-sm text-gray-500">Scan the QR code or copy the address to receive TRX</p>
                </div>

                <div className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                    <QRCodeCanvas value={address} size={200} />
                </div>

                <div className="w-full text-center">
                    <p className="text-xs font-bold text-gray-900 uppercase mb-2">Your TRX Address (TRC20)</p>
                    <div className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                        <span className="text-xs font-mono text-gray-600 truncate">{address}</span>
                        <button onClick={handleCopy} className="p-1 hover:bg-gray-200 rounded text-gray-500">
                            <Copy className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="bg-orange-50 border border-orange-100 p-3 rounded-lg flex items-start gap-3 text-left w-full">
                    <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />
                    <div>
                        <p className="text-xs font-bold text-orange-700">IMPORTANT NOTICE</p>
                        <p className="text-[10px] text-orange-600 mt-1">
                            Send only TRX to this address. Sending any other asset may result in
                            permanent loss of funds. Ensure you use the TRON (TRC20) network.
                        </p>
                    </div>
                </div>

                <div className="flex w-full gap-4 pt-2">
                    <Button variant="outline" fullWidth className="gap-2">
                        <Download className="w-4 h-4" /> Download
                    </Button>
                    <Button variant="outline" fullWidth className="gap-2">
                        <Share2 className="w-4 h-4" /> Share
                    </Button>
                </div>
            </div>
        </Modal>
    );
};

export default ReceiveModal;
