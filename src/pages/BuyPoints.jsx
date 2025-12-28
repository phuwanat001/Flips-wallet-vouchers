import React, { useState } from "react";
import { useVoucher } from "../context/VoucherContext";
import toast from "react-hot-toast";
import { Wallet, Check, ChevronRight, Sparkles, Zap } from "lucide-react";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";

// Package configurations
const packages = [
  {
    id: "pkg-1",
    flips: 10000,
    price: 99,
    bonus: 0,
    label: "Starter",
  },
  {
    id: "pkg-2",
    flips: 50000,
    price: 449,
    bonus: 10,
    label: "Popular",
    recommended: true,
  },
  {
    id: "pkg-3",
    flips: 100000,
    price: 799,
    bonus: 20,
    label: "Best Value",
  },
  {
    id: "pkg-4",
    flips: 500000,
    price: 3499,
    bonus: 30,
    label: "Premium",
  },
];

const BuyPoints = () => {
  const { investments, addPoints } = useVoucher();
  const [selectedToken, setSelectedToken] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Filter only Movies and Yarth (exclude Ctrl G)
  const purchasableTokens = investments.filter(
    (inv) => inv.categoryId === "movies" || inv.categoryId === "yarth"
  );

  const handlePurchase = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmPurchase = async () => {
    if (!selectedToken || !selectedPackage) return;

    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      // Calculate total flips including bonus
      const totalFlips = selectedPackage.flips;
      const bonusFlips = Math.floor(
        (selectedPackage.flips * selectedPackage.bonus) / 100
      );
      const finalFlips = totalFlips + bonusFlips;

      // Add points to selected token
      addPoints(selectedToken.id, finalFlips);

      // Show success message
      toast.success(
        `เติม ${finalFlips.toLocaleString()} Flips ให้ ${
          selectedToken.title
        } สำเร็จ!`,
        { duration: 4000 }
      );

      // Reset states
      setIsProcessing(false);
      setShowConfirmModal(false);
      setSelectedPackage(null);
    }, 1500);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-4 md:p-6 text-white shadow-lg">
        <div className="flex items-center gap-3 mb-2">
          <Wallet className="w-6 h-6" />
          <h1 className="text-xl md:text-2xl font-bold">Buy Flips Points</h1>
        </div>
        <p className="text-white/80 text-sm">
          เติม Flips Points เพื่อแลกของรางวัลสุดพิเศษ
        </p>
      </div>

      {/* Token Selection */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
        <h2 className="font-semibold text-gray-900 mb-3 md:mb-4">
          1. เลือก Token ที่ต้องการเติม
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {purchasableTokens.map((token) => (
            <button
              key={token.id}
              onClick={() => setSelectedToken(token)}
              className={`p-4 rounded-xl border-2 transition-all text-left ${
                selectedToken?.id === token.id
                  ? "border-primary bg-primary/5"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">{token.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">
                    {token.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    ยอดคงเหลือ: {token.flipsBalance.toLocaleString()} Flips
                  </div>
                </div>
                {selectedToken?.id === token.id && (
                  <div className="text-primary">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </div>
            </button>
          ))}
        </div>

        {purchasableTokens.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>ไม่พบ Token ที่สามารถซื้อได้</p>
          </div>
        )}
      </div>

      {/* Package Selection */}
      {selectedToken && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <h2 className="font-semibold text-gray-900 mb-3 md:mb-4">
            2. เลือกแพ็กเกจ
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {packages.map((pkg) => (
              <button
                key={pkg.id}
                onClick={() => setSelectedPackage(pkg)}
                className={`relative p-4 rounded-xl border-2 transition-all ${
                  selectedPackage?.id === pkg.id
                    ? "border-primary bg-primary/5"
                    : "border-gray-200 hover:border-primary/50"
                }`}
              >
                {/* Recommended Badge */}
                {pkg.recommended && (
                  <div className="absolute -top-2 -right-2 bg-gradient-to-r from-amber-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    Popular
                  </div>
                )}

                <div className="text-center space-y-2">
                  <div className="text-xs font-medium text-primary">
                    {pkg.label}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">
                    {pkg.flips.toLocaleString()}
                  </div>
                  <div className="text-xs text-gray-500">Flips</div>

                  {pkg.bonus > 0 && (
                    <div className="bg-green-50 text-green-700 text-xs font-semibold py-1 px-2 rounded-full inline-flex items-center gap-1">
                      <Zap className="w-3 h-3" />+{pkg.bonus}% Bonus
                    </div>
                  )}

                  <div className="pt-2 border-t border-gray-100">
                    <div className="text-xl font-bold text-primary">
                      ฿{pkg.price}
                    </div>
                  </div>
                </div>

                {selectedPackage?.id === pkg.id && (
                  <div className="absolute top-2 left-2 text-primary">
                    <Check className="w-5 h-5" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Purchase Button */}
      {selectedToken && selectedPackage && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 md:p-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <div className="text-sm text-gray-500">ยอดรวม</div>
              <div className="text-2xl font-bold text-gray-900">
                ฿{selectedPackage.price}
              </div>
              {selectedPackage.bonus > 0 && (
                <div className="text-xs text-green-600 font-medium">
                  รวม Bonus +{selectedPackage.bonus}% ={" "}
                  {(
                    selectedPackage.flips +
                    Math.floor(
                      (selectedPackage.flips * selectedPackage.bonus) / 100
                    )
                  ).toLocaleString()}{" "}
                  Flips
                </div>
              )}
            </div>
            <Button
              onClick={handlePurchase}
              size="lg"
              className="w-full md:w-auto"
            >
              <Wallet className="w-5 h-5 mr-2" />
              ดำเนินการชำระเงิน
            </Button>
          </div>
        </div>
      )}

      {/* Confirmation Modal */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => !isProcessing && setShowConfirmModal(false)}
        title="ยืนยันการซื้อ"
      >
        {selectedToken && selectedPackage && (
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Token:</span>
                <span className="font-semibold">{selectedToken.title}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Package:</span>
                <span className="font-semibold">{selectedPackage.label}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Flips:</span>
                <span className="font-semibold">
                  {selectedPackage.flips.toLocaleString()}
                </span>
              </div>
              {selectedPackage.bonus > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Bonus (+{selectedPackage.bonus}%):</span>
                  <span className="font-semibold">
                    +
                    {Math.floor(
                      (selectedPackage.flips * selectedPackage.bonus) / 100
                    ).toLocaleString()}
                  </span>
                </div>
              )}
              <div className="border-t border-gray-200 pt-3 flex justify-between text-lg">
                <span className="font-semibold">ยอดรวม:</span>
                <span className="font-bold text-primary">
                  ฿{selectedPackage.price}
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowConfirmModal(false)}
                disabled={isProcessing}
              >
                ยกเลิก
              </Button>
              <Button
                fullWidth
                onClick={handleConfirmPurchase}
                disabled={isProcessing}
              >
                {isProcessing ? "กำลังประมวลผล..." : "ยืนยันการชำระเงิน"}
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default BuyPoints;
