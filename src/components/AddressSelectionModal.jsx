import React, { useState } from "react";
import { useAddress } from "../context/AddressContext";
import Modal from "./ui/Modal";
import { Button } from "./ui/Button";
import { Check, MapPin, Plus } from "lucide-react";

const AddressSelectionModal = ({ isOpen, onClose, onSelectAddress }) => {
  const { addresses, getDefaultAddress, addAddress } = useAddress();
  const [selectedAddressId, setSelectedAddressId] = useState(
    getDefaultAddress()?.id || null
  );
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    province: "",
    postalCode: "",
  });

  const handleConfirm = () => {
    const selected = addresses.find((addr) => addr.id === selectedAddressId);
    if (selected) {
      onSelectAddress(selected);
      onClose();
    }
  };

  const handleAddNew = () => {
    // Validate
    if (!formData.name || !formData.phone || !formData.address) {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
      return;
    }

    const newAddress = addAddress(formData);
    setSelectedAddressId(newAddress.id);
    setShowAddForm(false);
    setFormData({
      name: "",
      phone: "",
      address: "",
      district: "",
      province: "",
      postalCode: "",
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="เลือกที่อยู่จัดส่ง">
      <div className="space-y-4">
        {!showAddForm ? (
          <>
            {/* Address List */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto">
              {addresses.map((address) => (
                <button
                  key={address.id}
                  onClick={() => setSelectedAddressId(address.id)}
                  className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                    selectedAddressId === address.id
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">
                          {address.name}
                        </span>
                        {address.isDefault && (
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-medium">
                            ค่าเริ่มต้น
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600 space-y-0.5">
                        <div>{address.phone}</div>
                        <div>{address.address}</div>
                        <div>
                          {address.district} {address.province}{" "}
                          {address.postalCode}
                        </div>
                      </div>
                    </div>
                    {selectedAddressId === address.id && (
                      <Check className="w-5 h-5 text-primary flex-shrink-0" />
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Add New Address Button */}
            <button
              onClick={() => setShowAddForm(true)}
              className="w-full p-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-colors flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span className="font-medium">เพิ่มที่อยู่ใหม่</span>
            </button>

            {/* Confirm Button */}
            <Button
              fullWidth
              disabled={!selectedAddressId}
              onClick={handleConfirm}
            >
              ยืนยันที่อยู่จัดส่ง
            </Button>
          </>
        ) : (
          <>
            {/* Add Address Form */}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ชื่อผู้รับ *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="เช่น สมชาย ใจดี"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  เบอร์โทรศัพท์ *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="เช่น 0812345678"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  ที่อยู่ *
                </label>
                <textarea
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  rows={3}
                  placeholder="เช่น 123 ถนนสุขุมวิท แขวงคลองเตย"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    เขต/อำเภอ
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) =>
                      setFormData({ ...formData, district: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="เช่น คลองเตย"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    จังหวัด
                  </label>
                  <input
                    type="text"
                    value={formData.province}
                    onChange={(e) =>
                      setFormData({ ...formData, province: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                    placeholder="เช่น กรุงเทพฯ"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  รหัสไปรษณีย์
                </label>
                <input
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) =>
                    setFormData({ ...formData, postalCode: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  placeholder="เช่น 10110"
                  maxLength={5}
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-2">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowAddForm(false)}
              >
                ยกเลิก
              </Button>
              <Button fullWidth onClick={handleAddNew}>
                บันทึกที่อยู่
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default AddressSelectionModal;
