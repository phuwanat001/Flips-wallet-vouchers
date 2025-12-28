import React, { useState, useMemo } from "react";
import { useVoucher } from "../context/VoucherContext";
import { myOrders } from "../data/mockDataVoucher";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import {
  QrCode,
  Gift,
  Calendar,
  Clock,
  Package,
  Truck,
  CheckCircle,
  History,
  TrendingUp,
  X,
  Ticket,
  ShoppingBag,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import ShippingProgress from "../components/ShippingProgress";

// =============================================
// Tab Button Component
// =============================================
const TabButton = ({ active, onClick, icon: Icon, label, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 md:gap-2 px-2.5 md:px-4 py-2 md:py-2.5 rounded-lg font-medium transition-all text-xs md:text-sm whitespace-nowrap ${
      active
        ? "bg-primary text-white shadow-sm"
        : "text-gray-600 hover:bg-gray-100"
    }`}
  >
    <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 flex-shrink-0" />
    <span className="truncate">{label}</span>
    {count !== undefined && (
      <span
        className={`text-[10px] md:text-xs px-1 md:px-1.5 py-0.5 rounded-full flex-shrink-0 ${
          active ? "bg-white/20" : "bg-gray-200 text-gray-600"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

// =============================================
// Voucher Card Component
// =============================================
const VoucherCard = ({ voucher, onShowQR }) => {
  const isExpired = new Date(voucher.expiresAt) < new Date();
  const isUsed = voucher.status === "used";
  const isDisabled = isExpired || isUsed;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 overflow-hidden transition-all ${
        isDisabled ? "opacity-60" : "hover:shadow-md"
      }`}
    >
      <div className="flex">
        {/* Image */}
        <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 relative">
          <img
            src={voucher.image}
            alt={voucher.title}
            className={`w-full h-full object-cover ${
              isDisabled ? "grayscale" : ""
            }`}
          />
          {isDisabled && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-bold text-xs bg-black/60 px-2 py-1 rounded">
                {isUsed ? "ใช้แล้ว" : "หมดอายุ"}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="flex-1 p-3 md:p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-2 mb-1">
              {voucher.titleTh || voucher.title}
            </h3>
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Calendar className="w-3 h-3" />
              <span>
                ใช้ได้ถึง{" "}
                {new Date(voucher.expiresAt).toLocaleDateString("th-TH", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-between mt-2">
            <Badge
              variant={voucher.tier === "Gold" ? "warning" : "info"}
              className="text-[10px]"
            >
              {voucher.tier}
            </Badge>
            <Button
              size="sm"
              variant={isDisabled ? "outline" : "primary"}
              onClick={() => onShowQR(voucher)}
              disabled={isDisabled}
              className="text-xs md:text-sm"
            >
              <QrCode className="w-3.5 h-3.5 mr-1" />
              รับสิทธิ์
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// Redemption History Item
// =============================================
const HistoryItem = ({ item }) => (
  <div className="flex gap-3 md:gap-4 p-3 md:p-4 bg-white rounded-xl border border-gray-100 hover:shadow-sm transition-all">
    {/* Timeline dot */}
    <div className="flex flex-col items-center pt-1">
      <div className="w-2.5 h-2.5 rounded-full bg-primary" />
      <div className="w-0.5 h-full bg-gray-200 mt-1" />
    </div>

    {/* Content */}
    <div className="flex-1">
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm md:text-base">
            {item.titleTh || item.title}
          </h4>
          <p className="text-xs text-gray-500 mt-0.5">
            {new Date(item.redeemedAt).toLocaleDateString("th-TH", {
              day: "numeric",
              month: "long",
              year: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
        <Badge variant="success" className="text-[10px] flex-shrink-0">
          สำเร็จ
        </Badge>
      </div>

      {/* Token and Points info */}
      <div className="flex flex-wrap gap-2 text-xs">
        {item.redeemedWithToken && (
          <div className="bg-blue-50 text-blue-700 px-2 py-1 rounded-md flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            Token: {item.redeemedWithToken}
          </div>
        )}
        <div className="bg-gray-100 text-gray-700 px-2 py-1 rounded-md">
          ใช้ {item.pointsSpent || 0} Flips
        </div>
      </div>
    </div>
  </div>
);

// =============================================
// Order Card Component
// =============================================
const OrderCard = ({ order }) => {
  const statusConfig = {
    pending: {
      label: "รอดำเนินการ",
      color: "bg-gray-100 text-gray-600",
      icon: Clock,
    },
    processing: {
      label: "กำลังจัดเตรียม",
      color: "bg-blue-100 text-blue-600",
      icon: Package,
    },
    shipped: {
      label: "จัดส่งแล้ว",
      color: "bg-green-100 text-green-600",
      icon: Truck,
    },
    delivered: {
      label: "ได้รับแล้ว",
      color: "bg-emerald-100 text-emerald-600",
      icon: CheckCircle,
    },
  };

  const status = statusConfig[order.status];
  const StatusIcon = status.icon;

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-sm transition-all">
      <div className="flex">
        <div className="w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
          <img
            src={order.image}
            alt={order.title}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1 p-3 md:p-4">
          <h3 className="font-semibold text-gray-900 text-sm md:text-base mb-1">
            {order.title}
          </h3>
          <p className="text-xs text-gray-500 mb-2">
            สั่งซื้อเมื่อ{" "}
            {new Date(order.orderedAt).toLocaleDateString("th-TH")}
          </p>
          <div className="flex items-center justify-between">
            <div
              className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
            >
              <StatusIcon className="w-3 h-3" />
              {status.label}
            </div>
            {order.trackingNumber && (
              <span className="text-xs text-primary font-medium">
                {order.trackingNumber}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// Empty State Component
// =============================================
const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-12 md:py-16 px-4 text-center">
    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-gray-100 flex items-center justify-center mb-3 md:mb-4">
      <Icon className="w-7 h-7 md:w-8 md:h-8 text-gray-400" />
    </div>
    <h3 className="text-sm md:text-base font-semibold text-gray-700 mb-1">
      {title}
    </h3>
    <p className="text-gray-500 text-xs md:text-sm max-w-xs">{description}</p>
  </div>
);

// =============================================
// Main AssetsVoucher Component
// =============================================
const AssetsVoucher = () => {
  const { redeemedVouchers: vouchers } = useVoucher();

  const [activeTab, setActiveTab] = useState("vouchers");
  const [orders] = useState(myOrders);
  const [showQRVoucher, setShowQRVoucher] = useState(null);

  // Calculate stats
  const activeVouchers = useMemo(
    () =>
      vouchers.filter(
        (v) => v.status === "active" && new Date(v.expiresAt) > new Date()
      ),
    [vouchers]
  );

  const usedVouchers = useMemo(
    () => vouchers.filter((v) => v.status === "used"),
    [vouchers]
  );

  const expiredVouchers = useMemo(
    () => vouchers.filter((v) => new Date(v.expiresAt) < new Date()),
    [vouchers]
  );

  // Create history from vouchers with useMemo for performance
  const redemptionHistory = useMemo(
    () =>
      vouchers.map((v) => ({
        ...v,
        pointsSpent: v.pointsSpent || 5000, // Use saved points or fallback
      })),
    [vouchers]
  );

  return (
    <div className="space-y-4 md:space-y-6">
      {/* ========== Stats Header ========== */}
      <div className="bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-4 md:p-6 text-white shadow-lg">
        <div className="flex items-center gap-2 mb-4">
          <Ticket className="w-5 h-5" />
          <h1 className="text-base md:text-lg font-semibold">
            สิทธิพิเศษของฉัน
          </h1>
        </div>

        {/* Stats Grid - Responsive */}
        <div className="grid grid-cols-3 gap-2 md:gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold">
              {activeVouchers.length}
            </div>
            <div className="text-xs text-white/80 mt-1">ใช้งานได้</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold">
              {usedVouchers.length}
            </div>
            <div className="text-xs text-white/80 mt-1">ใช้แล้ว</div>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 text-center">
            <div className="text-xl md:text-2xl font-bold">
              {expiredVouchers.length}
            </div>
            <div className="text-xs text-white/80 mt-1">หมดอายุ</div>
          </div>
        </div>
      </div>

      {/* ========== Tabs Navigation ========== */}
      <div className="bg-white rounded-xl p-2 md:p-4 shadow-sm border border-gray-100">
        <div className="flex gap-1.5 md:gap-2 overflow-x-auto pb-1 scrollbar-hide">
          <TabButton
            icon={Gift}
            label="คูปองของฉัน"
            count={vouchers.length}
            active={activeTab === "vouchers"}
            onClick={() => setActiveTab("vouchers")}
          />
          <TabButton
            icon={History}
            label="ประวัติการแลก"
            count={redemptionHistory.length}
            active={activeTab === "history"}
            onClick={() => setActiveTab("history")}
          />
          <TabButton
            icon={ShoppingBag}
            label="รายการสั่งซื้อ"
            count={orders.length}
            active={activeTab === "orders"}
            onClick={() => setActiveTab("orders")}
          />
        </div>
      </div>

      {/* ========== Content Area ========== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Vouchers Tab */}
        {activeTab === "vouchers" && (
          <>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm md:text-base">
                คูปองของฉัน
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {vouchers.length} รายการ
              </p>
            </div>
            <div className="p-4">
              {vouchers.length > 0 ? (
                <div className="space-y-3">
                  {vouchers.map((voucher) => (
                    <VoucherCard
                      key={voucher.id}
                      voucher={voucher}
                      onShowQR={setShowQRVoucher}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Gift}
                  title="ยังไม่มีคูปอง"
                  description="คุณยังไม่ได้แลกรางวัลใดๆ ลองไปดูของรางวัลกันเถอะ"
                />
              )}
            </div>
          </>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm md:text-base">
                ประวัติการแลกรางวัล
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {redemptionHistory.length} รายการ
              </p>
            </div>
            <div className="p-4">
              {redemptionHistory.length > 0 ? (
                <div className="space-y-0">
                  {redemptionHistory.map((item, index) => (
                    <HistoryItem key={item.id || index} item={item} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={History}
                  title="ไม่มีประวัติการแลก"
                  description="ยังไม่มีประวัติการแลกของรางวัล"
                />
              )}
            </div>
          </>
        )}

        {/* Orders Tab */}
        {activeTab === "orders" && (
          <>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900 text-sm md:text-base">
                รายการสั่งซื้อ
              </h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {orders.length} รายการ
              </p>
            </div>
            <div className="p-4">
              {orders.length > 0 ? (
                <div className="space-y-3">
                  {orders.map((order) => (
                    <OrderCard key={order.id} order={order} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Package}
                  title="ยังไม่มีรายการสั่งซื้อ"
                  description="คุณยังไม่มีรายการสั่งซื้อสินค้า"
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* ========== QR Code / Shipping Modal ========== */}
      {showQRVoucher && (
        <Modal
          isOpen={Boolean(showQRVoucher)}
          onClose={() => setShowQRVoucher(null)}
          title={showQRVoucher.titleTh || showQRVoucher.title}
        >
          <div className="space-y-4">
            {/* Check if this is an offline voucher (shipping) */}
            {showQRVoucher.deliveryType === "offline" &&
            showQRVoucher.shippingAddress ? (
              <>
                {/* Shipping Progress Tracker */}
                <ShippingProgress voucher={showQRVoucher} />

                {/* Voucher Info */}
                <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                  <p className="text-gray-600">{showQRVoucher.description}</p>
                  <div className="flex items-center justify-between text-xs pt-2 border-t border-gray-200">
                    <span className="text-gray-500">Points Used:</span>
                    <span className="font-semibold text-gray-900">
                      {showQRVoucher.pointsSpent} Flips
                    </span>
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* QR Code for Online Vouchers */}
                <div className="flex flex-col items-center py-6 bg-gray-50 rounded-lg">
                  <QRCodeCanvas value={showQRVoucher.qrCode} size={200} />
                  <p className="mt-4 text-sm text-gray-600">
                    แสดง QR Code นี้เพื่อใช้สิทธิ์
                  </p>
                  <p className="text-xs text-gray-500 mt-1 font-mono">
                    {showQRVoucher.qrCode}
                  </p>
                </div>

                {/* Voucher Details */}
                <div className="bg-gray-50 rounded-lg p-4 text-sm space-y-2">
                  <p className="text-gray-600">{showQRVoucher.description}</p>
                  <div className="flex items-center gap-2 text-xs pt-2 border-t border-gray-200">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-600">
                      Expires:{" "}
                      {new Date(showQRVoucher.expiresAt).toLocaleDateString(
                        "th-TH"
                      )}
                    </span>
                  </div>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AssetsVoucher;
