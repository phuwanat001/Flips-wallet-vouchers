import React, { createContext, useContext, useState, useEffect } from "react";
import {
  userInvestments,
  myVouchers as initialVouchers,
} from "../data/mockDataVoucher";

// Create Context
const VoucherContext = createContext();

// Custom hook to use VoucherContext
export const useVoucher = () => {
  const context = useContext(VoucherContext);
  if (!context) {
    throw new Error("useVoucher must be used within VoucherProvider");
  }
  return context;
};

// Provider Component
export const VoucherProvider = ({ children }) => {
  const [investments, setInvestments] = useState(() => {
    const saved = localStorage.getItem("flips_investments");
    return saved ? JSON.parse(saved) : userInvestments;
  });

  const [redeemedVouchers, setRedeemedVouchers] = useState(() => {
    const saved = localStorage.getItem("flips_vouchers");
    return saved ? JSON.parse(saved) : initialVouchers;
  });

  // Persist to localStorage whenever state changes
  useEffect(() => {
    localStorage.setItem("flips_investments", JSON.stringify(investments));
  }, [investments]);

  useEffect(() => {
    localStorage.setItem("flips_vouchers", JSON.stringify(redeemedVouchers));
  }, [redeemedVouchers]);

  // Redeem voucher with optional shipping address for offline vouchers
  const redeemVoucher = (voucher, activeInvestment, shippingAddress = null) => {
    if (
      !activeInvestment ||
      activeInvestment.flipsBalance < voucher.pointsRequired
    ) {
      return null;
    }

    // Deduct points from investment
    const updatedInvestments = investments.map((inv) =>
      inv.id === activeInvestment.id
        ? {
            ...inv,
            flipsBalance: inv.flipsBalance - voucher.pointsRequired,
            totalSpent: (inv.totalSpent || 0) + voucher.pointsRequired,
          }
        : inv
    );

    // Create redeemed voucher
    const redeemedVoucher = {
      id: `my-${Date.now()}`,
      voucherId: voucher.id,
      movieId: voucher.movieId,
      title: voucher.title,
      titleTh: voucher.titleTh,
      description: voucher.description,
      category: voucher.category,
      type: voucher.type,
      deliveryType: voucher.deliveryType || "online",
      tier: voucher.tier,
      image: voucher.image,
      redeemedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
      status: "active",
      qrCode: `FLIPS-${voucher.id}-${Date.now()}`,
      pointsSpent: voucher.pointsRequired,
      redeemedWithToken: activeInvestment.title,
      // Shipping info for offline vouchers
      ...(voucher.deliveryType === "offline" && shippingAddress
        ? {
            shippingAddress: shippingAddress,
            shippingStatus: "pending", // pending, confirmed, shipped, delivered
            trackingNumber: `TH${Date.now().toString().slice(-10)}`,
            estimatedDelivery: new Date(
              Date.now() + 5 * 24 * 60 * 60 * 1000
            ).toISOString(),
          }
        : {}),
    };

    // Update states
    setInvestments(updatedInvestments);
    setRedeemedVouchers((prev) => [redeemedVoucher, ...prev]);

    // Persist to localStorage
    localStorage.setItem(
      "flips_investments",
      JSON.stringify(updatedInvestments)
    );
    localStorage.setItem(
      "flips_vouchers",
      JSON.stringify([redeemedVoucher, ...redeemedVouchers])
    );

    return redeemedVoucher;
  };

  // Add points to specific investment
  const addPoints = (investmentId, points) => {
    const updatedInvestments = investments.map((inv) =>
      inv.id === investmentId
        ? { ...inv, flipsBalance: inv.flipsBalance + points }
        : inv
    );

    setInvestments(updatedInvestments);
    localStorage.setItem(
      "flips_investments",
      JSON.stringify(updatedInvestments)
    );
  };

  // Reset data (for testing)
  const resetData = () => {
    setInvestments(userInvestments);
    setRedeemedVouchers(initialVouchers);
    localStorage.removeItem("flips_investments");
    localStorage.removeItem("flips_vouchers");
  };

  const value = {
    investments,
    setInvestments,
    redeemedVouchers,
    setRedeemedVouchers,
    redeemVoucher,
    resetData,
    addPoints,
  };

  return (
    <VoucherContext.Provider value={value}>{children}</VoucherContext.Provider>
  );
};
