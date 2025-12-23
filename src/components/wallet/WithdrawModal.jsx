import React, { useState } from 'react';
import Modal from '../ui/Modal';
import { Button } from '../ui/Button';
import { CheckCircle, Building } from 'lucide-react';

const WithdrawModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [amount, setAmount] = useState('');

    const handleWithdraw = () => {
        setStep(2);
    };

    const reset = () => {
        setStep(1);
        setAmount('');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={reset} title={step === 2 ? "" : "Withdraw Funds"}>
            {step === 1 ? (
                <div className="space-y-6">
                    <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">
                        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center border border-gray-200">
                            <Building className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                            <p className="text-xs text-gray-500 font-bold uppercase">Withdraw to Bank Account</p>
                            <p className="text-sm font-medium text-gray-900">SCB •••• 1234</p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto text-primary">Change</Button>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-700 mb-1 block">AMOUNT TO WITHDRAW (USD)</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none text-lg font-medium"
                            placeholder="0.00"
                        />
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Available: $12,450.00</span>
                            <button className="text-primary font-medium" onClick={() => setAmount('12450')}>Max</button>
                        </div>
                    </div>

                    <div className="space-y-2 border-t border-gray-100 pt-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Withdrawal Amount</span>
                            <span className="font-medium text-gray-900">${amount || '0.00'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Fee (1%)</span>
                            <span className="font-medium text-gray-900">${amount ? (parseFloat(amount) * 0.01).toFixed(2) : '0.00'}</span>
                        </div>
                        <div className="flex justify-between text-lg font-bold border-t border-gray-100 pt-2">
                            <span className="text-gray-900">Total Recieve</span>
                            <span className="text-primary">${amount ? (parseFloat(amount) * 0.99).toFixed(2) : '0.00'}</span>
                        </div>
                    </div>

                    <Button fullWidth disabled={!amount} onClick={handleWithdraw}>Confirm Withdrawal</Button>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-6 text-center py-4">
                    <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center animate-in zoom-in">
                        <CheckCircle className="w-10 h-10 text-yellow-600" />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Withdrawal Pending</h3>
                        <p className="text-sm text-gray-500 mt-1">Your request is being processed (1-3 Business Days)</p>
                    </div>

                    <div className="w-full bg-gray-50 rounded-xl p-4 space-y-3 text-sm text-left">
                        <div className="flex justify-between">
                            <span className="text-gray-500">Bank Account</span>
                            <span className="font-medium text-gray-900">SCB •••• 1234</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Amount</span>
                            <span className="font-bold text-gray-900 text-lg">${amount}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Transaction ID</span>
                            <span className="font-mono text-gray-900 text-xs">WD_8829102</span>
                        </div>
                    </div>

                    <Button fullWidth variant="primary" onClick={reset}>Done</Button>
                </div>
            )}
        </Modal>
    );
};

export default WithdrawModal;
