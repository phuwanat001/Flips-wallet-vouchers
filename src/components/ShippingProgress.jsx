import React from "react";
import { Package, Truck, CheckCircle, Home } from "lucide-react";

const ShippingProgress = ({ voucher }) => {
  const { shippingStatus, trackingNumber, estimatedDelivery, shippingAddress } =
    voucher;

  // Shipping stages
  const stages = [
    {
      id: "pending",
      label: "Ordered",
      icon: Package,
      status: ["pending", "confirmed", "shipped", "delivered"],
    },
    {
      id: "confirmed",
      label: "Packed",
      icon: CheckCircle,
      status: ["confirmed", "shipped", "delivered"],
    },
    {
      id: "shipped",
      label: "In Transit",
      icon: Truck,
      status: ["shipped", "delivered"],
    },
    { id: "delivered", label: "Delivered", icon: Home, status: ["delivered"] },
  ];

  const currentStageIndex = stages.findIndex((stage) =>
    stage.status.includes(shippingStatus)
  );

  const getStageStatus = (index) => {
    if (index < currentStageIndex) return "completed";
    if (index === currentStageIndex) return "current";
    return "pending";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-gray-900 text-sm">สถานะการจัดส่ง</h3>
        {trackingNumber && (
          <div className="text-xs">
            <span className="text-gray-500">Tracking: </span>
            <span className="font-mono font-semibold text-primary">
              {trackingNumber}
            </span>
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div className="relative">
        {/* Background Line */}
        <div
          className="absolute top-6 left-0 right-0 h-1 bg-gray-200"
          style={{ marginLeft: "20px", marginRight: "20px" }}
        />

        {/* Progress Line */}
        <div
          className="absolute top-6 left-0 h-1 bg-red-500 transition-all duration-500"
          style={{
            marginLeft: "20px",
            width: `calc(${
              (currentStageIndex / (stages.length - 1)) * 100
            }% - 40px)`,
          }}
        />

        {/* Stages */}
        <div className="relative flex justify-between">
          {stages.map((stage, index) => {
            const status = getStageStatus(index);
            const Icon = stage.icon;

            return (
              <div
                key={stage.id}
                className="flex flex-col items-center"
                style={{ width: "80px" }}
              >
                {/* Icon Circle */}
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    status === "completed" || status === "current"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-400"
                  } ${status === "current" ? "ring-4 ring-red-200" : ""}`}
                >
                  <Icon className="w-6 h-6" />
                </div>

                {/* Label */}
                <p
                  className={`mt-2 text-xs text-center font-medium ${
                    status === "completed" || status === "current"
                      ? "text-gray-900"
                      : "text-gray-400"
                  }`}
                >
                  {stage.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Shipping Info */}
      <div className="bg-gray-50 rounded-lg p-3 space-y-2 text-xs">
        {estimatedDelivery && shippingStatus !== "delivered" && (
          <div className="flex items-center justify-between">
            <span className="text-gray-600">กำหนดส่งถึง:</span>
            <span className="font-semibold text-gray-900">
              {formatDate(estimatedDelivery)}
            </span>
          </div>
        )}

        {shippingAddress && (
          <div>
            <p className="text-gray-600 mb-1">ที่อยู่จัดส่ง:</p>
            <p className="font-medium text-gray-900">{shippingAddress.name}</p>
            <p className="text-gray-600 mt-0.5">
              {shippingAddress.address}, {shippingAddress.district},{" "}
              {shippingAddress.province} {shippingAddress.postalCode}
            </p>
          </div>
        )}
      </div>

      {/* Status Message */}
      <div className="text-center">
        {shippingStatus === "pending" && (
          <p className="text-sm text-gray-600">📦 กำลังเตรียมของให้คุณ</p>
        )}
        {shippingStatus === "confirmed" && (
          <p className="text-sm text-gray-600">✅ แพ็คของเรียบร้อยแล้ว</p>
        )}
        {shippingStatus === "shipped" && (
          <p className="text-sm text-gray-600">🚚 สินค้ากำลังเดินทางถึงคุณ</p>
        )}
        {shippingStatus === "delivered" && (
          <p className="text-sm text-green-600 font-semibold">🎉 ส่งถึงแล้ว!</p>
        )}
      </div>
    </div>
  );
};

export default ShippingProgress;
