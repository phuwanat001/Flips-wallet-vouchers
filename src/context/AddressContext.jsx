import React, { createContext, useContext, useState, useEffect } from "react";

const AddressContext = createContext();

export const useAddress = () => {
  const context = useContext(AddressContext);
  if (!context) {
    throw new Error("useAddress must be used within AddressProvider");
  }
  return context;
};

// Default mockup addresses
const DEFAULT_ADDRESSES = [
  {
    id: "addr-1",
    name: "สมชาย ใจดี",
    phone: "0812345678",
    address: "123 ถนนสุขุมวิท แขวงคลองเตย",
    district: "คลองเตย",
    province: "กรุงเทพฯ",
    postalCode: "10110",
    isDefault: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "addr-2",
    name: "สมหญิง รักษ์สุข",
    phone: "0898765432",
    address: "456 ถนนพระราม 4 แขวงปทุมวัน",
    district: "ปทุมวัน",
    province: "กรุงเทพฯ",
    postalCode: "10330",
    isDefault: false,
    createdAt: new Date().toISOString(),
  },
];

export const AddressProvider = ({ children }) => {
  const [addresses, setAddresses] = useState(() => {
    const saved = localStorage.getItem("flips_addresses");
    return saved ? JSON.parse(saved) : DEFAULT_ADDRESSES;
  });

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem("flips_addresses", JSON.stringify(addresses));
  }, [addresses]);

  // Get default address
  const getDefaultAddress = () => {
    return addresses.find((addr) => addr.isDefault) || addresses[0] || null;
  };

  // Add new address
  const addAddress = (addressData) => {
    const newAddress = {
      id: `addr-${Date.now()}`,
      ...addressData,
      isDefault: addresses.length === 0, // First address is default
      createdAt: new Date().toISOString(),
    };

    setAddresses((prev) => [...prev, newAddress]);
    return newAddress;
  };

  // Update address
  const updateAddress = (addressId, addressData) => {
    setAddresses((prev) =>
      prev.map((addr) =>
        addr.id === addressId ? { ...addr, ...addressData } : addr
      )
    );
  };

  // Delete address
  const deleteAddress = (addressId) => {
    setAddresses((prev) => {
      const filtered = prev.filter((addr) => addr.id !== addressId);

      // If deleted address was default, set first address as default
      if (filtered.length > 0 && !filtered.some((addr) => addr.isDefault)) {
        filtered[0].isDefault = true;
      }

      return filtered;
    });
  };

  // Set default address
  const setDefaultAddress = (addressId) => {
    setAddresses((prev) =>
      prev.map((addr) => ({
        ...addr,
        isDefault: addr.id === addressId,
      }))
    );
  };

  const value = {
    addresses,
    getDefaultAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
  };

  return (
    <AddressContext.Provider value={value}>{children}</AddressContext.Provider>
  );
};
