import React, { useState, useMemo } from 'react';
import { walletBalance, tokens } from '../../data/mockData';
import Modal from '../ui/Modal';
import { Button } from '../ui/Button';
import { CheckCircle, ArrowRight, ScanLine, ChevronDown } from 'lucide-react';

const TransferModal = ({ isOpen, onClose }) => {
    const [step, setStep] = useState(1);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const [selectedTokenId, setSelectedTokenId] = useState('trx');

    // Combine TRX with other tokens for the dropdown list
    const availableTokens = useMemo(() => [
        {
            id: 'trx',
            name: 'Tron',
            symbol: 'TRX',
            balance: walletBalance.trx.amount,
            type: 'Network'
        },
        ...tokens.map(t => ({
            id: t.id,
            name: t.name,
            symbol: t.symbol,
            balance: t.balance,
            type: t.type
        }))
    ], []);

    const selectedToken = availableTokens.find(t => t.id === selectedTokenId) || availableTokens[0];

    const handleSend = () => {
        setStep(2);
    };

    const handleScan = () => {
        alert("Camera permission required to scan QR code.");
    };

    const reset = () => {
        setStep(1);
        setAddress('');
        setAmount('');
        setSelectedTokenId('trx');
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={reset} title={step === 2 ? "" : "Transfer Coins"}>
            {step === 1 ? (
                <div className="space-y-6">
                    {/* Token Selection */}
                    <div>
                        <label className="text-xs font-bold text-gray-700 mb-1 block">SELECT ASSET</label>
                        <div className="relative">
                            <select
                                value={selectedTokenId}
                                onChange={(e) => setSelectedTokenId(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm font-medium appearance-none bg-white"
                            >
                                {availableTokens.map(token => (
                                    <option key={token.id} value={token.id}>
                                        {token.symbol} - {token.name} ({token.type})
                                    </option>
                                ))}
                            </select>
                            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-700 mb-1 block">RECIPIENT ADDRESS</label>
                        <div className="relative">
                            <input
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none text-sm font-mono pr-12"
                                placeholder="Enter TRC20 Address"
                            />
                            <button
                                onClick={handleScan}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-primary hover:bg-blue-50 p-1.5 rounded-lg transition-colors"
                            >
                                <ScanLine className="w-5 h-5" />
                            </button>
                        </div>
                    </div>

                    <div>
                        <label className="text-xs font-bold text-gray-700 mb-1 block">AMOUNT ({selectedToken.symbol})</label>
                        <div className="relative">
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary outline-none text-lg font-medium pr-16"
                                placeholder="0.00"
                            />
                            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">{selectedToken.symbol}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 text-right">
                            Balance: {selectedToken.balance.toLocaleString()} {selectedToken.symbol}
                        </p>
                    </div>

                    <div className="bg-gray-50 p-4 rounded-xl space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Network Fee</span>
                            <span className="font-medium text-gray-900">1.00 TRX</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Total</span>
                            <span className="font-bold text-primary">
                                {amount ? amount : '0.00'} {selectedToken.symbol}
                            </span>
                        </div>
                    </div>

                    <Button fullWidth disabled={!address || !amount} onClick={handleSend}>Confirm Transfer</Button>
                </div>
            ) : (
                <div className="flex flex-col items-center space-y-6 text-center py-4">
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center animate-in zoom-in">
                        <CheckCircle className="w-10 h-10 text-green-600" />
                    </div>

                    <div>
                        <h3 className="text-xl font-bold text-gray-900">Transaction Successful</h3>
                        <p className="text-sm text-gray-500 mt-1">Your {selectedToken.symbol} has been sent successfully</p>
                    </div>

                    <div className="text-center">
                        <p className="text-xs text-gray-500 uppercase">Amount Sent</p>
                        <h2 className="text-3xl font-bold text-primary my-1">{amount} {selectedToken.symbol}</h2>
                        {selectedToken.price && (
                            <p className="text-xs text-gray-400">≈ ${(parseFloat(amount) * selectedToken.price).toFixed(2)} USD</p>
                        )}
                    </div>

                    <div className="w-full bg-gray-50 rounded-xl p-4 space-y-3 text-sm text-left">
                        <div className="flex justify-between">
                            <span className="text-gray-500">To Address</span>
                            <span className="font-mono text-gray-900 truncate max-w-[150px]">{address}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Asset</span>
                            <span className="font-medium text-gray-900">{selectedToken.name}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Transaction ID</span>
                            <span className="font-mono text-gray-900 text-xs">TRX_958...F2E</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-gray-500">Status</span>
                            <span className="font-bold text-green-600">Success</span>
                        </div>
                    </div>

                    <Button fullWidth variant="primary" onClick={reset}>Done</Button>
                </div>
            )}
        </Modal>
    );
};

export default TransferModal;
