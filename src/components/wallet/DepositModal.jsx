import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { Button } from '../ui/Button';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { QRCodeCanvas } from 'qrcode.react';

const DepositModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState('');
    const [agreed, setAgreed] = useState(false);

    const handleNext = () => {
        if (step === 1 && amount && agreed) setStep(2);
        else if (step === 2) setStep(3);
        else if (step === 3) {
            setStep(1);
            setAmount('');
            setAgreed(false);
            onClose();
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={step === 3 ? "Deposit Successful" : "Deposit"}
        >
            {step === 1 && (
                <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl flex gap-3">
                        <div className="bg-blue-100 p-2 rounded-lg h-fit">
                            <AlertCircle className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-sm text-blue-800 space-y-1">
                            <p className="font-bold">Deposit Terms & Conditions</p>
                            <ul className="list-disc pl-4 text-xs space-y-1 opacity-80">
                                <li>Account must match your registered name.</li>
                                <li>Deposit the exact specified amount.</li>
                                <li>Avoid transactions between 11:30 PM - 12:10 AM ICT.</li>
                            </ul>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-700 mb-1 block">AMOUNT TO DEPOSIT (THB)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-primary outline-none text-lg font-medium"
                            placeholder="Min 40.00 THB"
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Minimum: 40.00 THB</span>
                            <span>Daily Limit: 2,000,000 THB</span>
                        </div>
                    </div>

                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary"
                        />
                        <span className="text-xs text-gray-600">I have read and agree to all terms for THB deposits</span>
                    </label>

                    <Button
                        fullWidth
                        disabled={!amount || !agreed}
                        onClick={handleNext}
                    >
                        Next
                    </Button>
                </div>
            )}

            {step === 2 && (
                <div className="flex flex-col items-center space-y-6 text-center">
                    <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg flex items-center gap-2 w-full text-left">
                        <AlertCircle className="w-4 h-4 text-yellow-600" />
                        <p className="text-xs text-yellow-700">Detailed instructions: Your deposit will be rejected if conditions are not met.</p>
                    </div>

                    <div className="p-4 bg-white border-2 border-primary/10 rounded-xl shadow-sm">
                        <QRCodeCanvas value={`promptpay:${amount}`} size={180} />
                        <p className="text-xs text-gray-500 mt-2 font-mono">EXPIRES IN 15:00</p>
                    </div>

                    <div className="w-full space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Beneficiary Account</span>
                            <span className="font-bold text-gray-900">James Angle</span>
                        </div>
                        <div className="flex justify-between text-lg border-t border-gray-100 pt-2">
                            <span className="text-gray-500">Total Amount</span>
                            <span className="font-bold text-primary">{parseFloat(amount).toFixed(2)} THB</span>
                        </div>
                    </div>

                    <div className="w-full space-y-3">
                        <Button fullWidth onClick={handleNext}>Simulate Payment Detect</Button>
                        <button onClick={() => setStep(1)} className="text-xs text-gray-500 hover:text-gray-700 underline">Cancel & Change Amount</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div className="flex flex-col items-center space-y-6 text-center py-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Deposit Successful</h3>
                        <p className="text-sm text-gray-500 mt-1">Your funds have been received and are processing.</p>
                    </div>

                    <div className="w-full bg-gray-50 rounded-xl p-4 space-y-3 text-sm">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Status</span>
                            <span className="font-bold text-green-600">COMPLETED</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Method</span>
                            <span className="font-medium text-gray-900">QR PromptPay</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-bold text-gray-900">{parseFloat(amount).toFixed(2)} THB</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Transaction ID</span>
                            <span className="font-medium text-gray-900 text-xs">TXN_993817265</span>
                        </div>
                    </div>

                    <Button fullWidth variant="primary" onClick={handleNext}>Back to Home</Button>
                </div>
            )}
        </Modal>
    );
};

export default DepositModal;
