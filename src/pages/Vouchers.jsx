import React, { useState, useMemo } from "react";
import toast from "react-hot-toast";
import {
  marketplaceVouchers,
  myVouchers,
  myOrders,
  userVoucherBalance,
  voucherCategories,
  voucherFiltersByCategory,
  movies,
} from "../data/mockDataVoucher";
import { Card } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import Modal from "../components/ui/Modal";
import {
  QrCode,
  Gift,
  Search,
  Film,
  Gamepad2,
  Package,
  Truck,
  Clock,
  CheckCircle,
  Crown,
  ShoppingBag,
  Ship,
  ChevronRight,
  ArrowLeft,
  Calendar,
  X,
  AlertTriangle,
} from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";

// =============================================
// Partner Icon Component (Circular Grid Style)
// =============================================
const PartnerIcon = ({ icon: Icon, label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 min-w-[80px] px-1 group transition-all`}
  >
    <div
      className={`relative w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center transition-all shadow-sm ${
        active
          ? "bg-primary text-white shadow-lg scale-105"
          : "bg-white text-gray-600 hover:bg-primary/10 hover:text-primary border border-gray-100"
      }`}
    >
      <Icon className="w-6 h-6 md:w-7 md:h-7" />
      {count > 0 && (
        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-sm">
          {count}
        </span>
      )}
    </div>
    <span
      className={`text-xs text-center leading-tight max-w-[72px] line-clamp-2 ${
        active ? "text-primary font-medium" : "text-gray-600"
      }`}
    >
      {label}
    </span>
  </button>
);

// =============================================
// Movie Card Component
// =============================================
const MovieCard = ({ movie, rewardCount, onClick }) => (
  <button
    onClick={onClick}
    className="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all text-left"
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="font-bold text-white text-sm md:text-base line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-white/70 text-xs">{movie.titleEn}</p>
      </div>
      <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
        {rewardCount} รางวัล
      </div>
    </div>
  </button>
);

// =============================================
// Filter Pill Component
// =============================================
const FilterPill = ({ active, onClick, label, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-4 py-2 text-sm font-medium rounded-full border transition-all whitespace-nowrap ${
      active
        ? "bg-primary text-white border-primary shadow-sm"
        : "bg-white text-gray-600 border-gray-200 hover:border-primary hover:text-primary"
    }`}
  >
    <span>{label}</span>
    {count !== undefined && count > 0 && (
      <span
        className={`text-xs px-1.5 py-0.5 rounded-full ${
          active ? "bg-white/20" : "bg-gray-100"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

// =============================================
// Voucher List Card (Redesigned - Grid Style)
// =============================================
const VoucherListCard = ({ voucher, onRedeem }) => (
  <div className="group bg-white rounded-2xl border border-gray-100 overflow-hidden hover:shadow-xl hover:border-primary/30 transition-all duration-300 cursor-pointer">
    {/* Image with overlay */}
    <div className="relative aspect-video overflow-hidden">
      <img
        src={voucher.image}
        alt={voucher.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
      />
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Points badge - top left */}
      <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-lg">
        <span className="font-bold text-primary">
          {voucher.pointsRequired.toLocaleString()}
        </span>
        <span className="text-xs text-gray-500">Flips</span>
      </div>

      {/* Tier badge - top right */}
      {voucher.tier === "Gold" && (
        <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-lg">
          <Crown className="w-3.5 h-3.5" />
          Gold
        </div>
      )}

      {/* Title on image */}
      <div className="absolute bottom-0 left-0 right-0 p-4">
        <h3 className="font-bold text-white text-lg line-clamp-2 drop-shadow-lg">
          {voucher.titleTh || voucher.title}
        </h3>
      </div>
    </div>

    {/* Content */}
    <div className="p-4">
      <p className="text-sm text-gray-500 line-clamp-2 mb-4 min-h-[40px]">
        {voucher.description}
      </p>

      {/* Redeem button - full width */}
      <Button
        fullWidth
        onClick={() => onRedeem(voucher)}
        className="group-hover:bg-primary group-hover:shadow-lg transition-all"
      >
        <Gift className="w-4 h-4 mr-2" />
        แลกของรางวัล
      </Button>
    </div>
  </div>
);

// =============================================
// My Voucher List Card
// =============================================
const MyVoucherListCard = ({ voucher, onShowQR }) => {
  const isExpired = new Date(voucher.expiresAt) < new Date();
  const isUsed = voucher.status === "used";
  const isDisabled = isExpired || isUsed;

  return (
    <div
      className={`bg-white rounded-xl border border-gray-100 overflow-hidden ${
        isDisabled ? "opacity-60" : "hover:shadow-md"
      } transition-all`}
    >
      <div className="flex">
        <div className="w-28 h-28 md:w-36 md:h-32 flex-shrink-0 relative">
          <img
            src={voucher.image}
            alt={voucher.title}
            className={`w-full h-full object-cover ${
              isDisabled ? "grayscale" : ""
            }`}
          />
          {isDisabled && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="text-white font-bold text-sm bg-black/60 px-2 py-1 rounded">
                {isUsed ? "ใช้แล้ว" : "หมดอายุ"}
              </span>
            </div>
          )}
        </div>
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
              <QrCode className="w-4 h-4 mr-1" />
              รับสิทธิ์
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// =============================================
// Order Card
// =============================================
const OrderListCard = ({ order }) => {
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
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
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
// Empty State
// =============================================
const EmptyState = ({
  icon: Icon,
  title,
  description,
  actionLabel,
  onAction,
}) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
      <Icon className="w-8 h-8 text-gray-400" />
    </div>
    <h3 className="text-base font-semibold text-gray-700 mb-1">{title}</h3>
    <p className="text-gray-500 text-sm mb-4 max-w-xs">{description}</p>
    {actionLabel && (
      <Button variant="outline" onClick={onAction} size="sm">
        <Search className="w-4 h-4 mr-1" />
        {actionLabel}
      </Button>
    )}
  </div>
);

// =============================================
// Main Vouchers Component
// =============================================
const Vouchers = () => {
  const [selectedCategory, setSelectedCategory] = useState("movies");
  const [selectedMovie, setSelectedMovie] = useState(null); // null = show movie grid
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [activeTab, setActiveTab] = useState("privileges");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // Step 2 confirmation
  const [showQRVoucher, setShowQRVoucher] = useState(null);

  // User balance state (for realistic mock)
  const [userBalance, setUserBalance] = useState({
    flipsBalance: userVoucherBalance.flipsBalance,
    totalEarned: userVoucherBalance.totalEarned,
    totalSpent: userVoucherBalance.totalSpent,
  });

  // My redeemed vouchers state
  const [redeemedVouchers, setRedeemedVouchers] = useState(myVouchers);

  // Get icon for category
  const getCategoryIcon = (catId) => {
    switch (catId) {
      case "movies":
        return Film;
      case "ctrl-g":
        return Gamepad2;
      case "yarth":
        return Ship;
      default:
        return Gift;
    }
  };

  // Count rewards per movie
  const movieRewardCounts = useMemo(() => {
    const counts = {};
    marketplaceVouchers
      .filter((v) => v.category === "movies")
      .forEach((v) => {
        if (v.movieId) {
          counts[v.movieId] = (counts[v.movieId] || 0) + 1;
        }
      });
    return counts;
  }, []);

  // Filter vouchers for selected movie - SORTED BY POINTS (expensive first)
  const filteredVouchers = useMemo(() => {
    let vouchers = marketplaceVouchers.filter((voucher) => {
      if (selectedCategory === "movies") {
        if (!selectedMovie) return false; // Don't show vouchers if no movie selected
        const matchesMovie = voucher.movieId === selectedMovie.id;
        const matchesFilter =
          selectedFilter === "all" || voucher.type === selectedFilter;
        return matchesMovie && matchesFilter;
      } else {
        const matchesCategory = voucher.category === selectedCategory;
        const matchesFilter =
          selectedFilter === "all" || voucher.type === selectedFilter;
        return matchesCategory && matchesFilter;
      }
    });

    // Sort by points (expensive first)
    return vouchers.sort((a, b) => b.pointsRequired - a.pointsRequired);
  }, [selectedCategory, selectedMovie, selectedFilter]);

  // Category counts
  const categoryCounts = useMemo(() => {
    const counts = {};
    marketplaceVouchers.forEach((v) => {
      counts[v.category] = (counts[v.category] || 0) + 1;
    });
    return counts;
  }, []);

  // Filter counts for current selection
  const filterCounts = useMemo(() => {
    const counts = { all: 0 };
    let vouchers =
      selectedCategory === "movies" && selectedMovie
        ? marketplaceVouchers.filter((v) => v.movieId === selectedMovie.id)
        : marketplaceVouchers.filter((v) => v.category === selectedCategory);

    vouchers.forEach((v) => {
      counts.all++;
      counts[v.type] = (counts[v.type] || 0) + 1;
    });
    return counts;
  }, [selectedCategory, selectedMovie]);

  // Handle first redeem click (Step 1)
  const handleRedeem = (voucher) => setSelectedVoucher(voucher);

  // Handle confirm from first modal (go to Step 2)
  const handleFirstConfirm = () => {
    setShowConfirmModal(true);
  };

  // Handle final confirm (Step 2)
  const handleFinalConfirm = () => {
    // Deduct points
    setUserBalance((prev) => ({
      ...prev,
      flipsBalance: prev.flipsBalance - selectedVoucher.pointsRequired,
      totalSpent: prev.totalSpent + selectedVoucher.pointsRequired,
    }));

    // Add to redeemed vouchers
    const newVoucher = {
      id: `my-${Date.now()}`,
      voucherId: selectedVoucher.id,
      movieId: selectedVoucher.movieId,
      title: selectedVoucher.titleTh || selectedVoucher.title,
      titleTh: selectedVoucher.titleTh || selectedVoucher.title,
      description: selectedVoucher.description,
      type: "digital",
      status: "active",
      redeemedAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(), // 90 days
      qrCode: `FLIPS-${selectedVoucher.id.toUpperCase()}-${Date.now()}`,
      image: selectedVoucher.image,
      tier: selectedVoucher.tier,
    };
    setRedeemedVouchers((prev) => [newVoucher, ...prev]);

    // Show success toast
    toast.success(
      `แลก "${
        selectedVoucher.titleTh || selectedVoucher.title
      }" สำเร็จ! หัก ${selectedVoucher.pointsRequired.toLocaleString()} Flips`,
      {
        icon: "🎉",
        duration: 4000,
      }
    );

    setShowConfirmModal(false);
    setSelectedVoucher(null);
  };

  const handleShowQR = (voucher) => setShowQRVoucher(voucher);

  return (
    <div className="space-y-4 md:space-y-6">
      {/* ========== Points Balance Header ========== */}
      <div className="bg-primary rounded-2xl p-4 md:p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-3">
          <span className="text-white/80 text-sm">คะแนนคงเหลือ</span>
          <button className="text-white/80 hover:text-white text-xs flex items-center gap-1">
            ดูประวัติ <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-3xl md:text-4xl font-bold">
            {userBalance.flipsBalance.toLocaleString()}
          </span>
          <span className="text-lg text-white/80">Flips</span>
        </div>
        <div className="flex gap-4 text-xs md:text-sm">
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 mb-1">ได้รับทั้งหมด</p>
            <p className="font-semibold text-green-300">
              {userBalance.totalEarned.toLocaleString()}
            </p>
          </div>
          <div className="flex-1 bg-white/10 rounded-xl p-3 text-center">
            <p className="text-white/70 mb-1">ใช้ไปแล้ว</p>
            <p className="font-semibold text-red-300">
              {userBalance.totalSpent.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* ========== Partner Icons Grid ========== */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-gray-900">แบรนด์พันธมิตร</h2>
          <button className="text-primary text-sm flex items-center gap-1 hover:underline">
            ดูทั้งหมด <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex gap-6 overflow-x-auto pb-2 scrollbar-hide p-2">
          <PartnerIcon
            icon={Gift}
            label="คูปองของฉัน"
            count={redeemedVouchers.length}
            active={activeTab === "my-vouchers"}
            onClick={() => {
              setActiveTab("my-vouchers");
              setSelectedMovie(null);
            }}
          />
          {voucherCategories.map((cat) => (
            <PartnerIcon
              key={cat.id}
              icon={getCategoryIcon(cat.id)}
              label={cat.label}
              count={categoryCounts[cat.id] || 0}
              active={activeTab === "privileges" && selectedCategory === cat.id}
              onClick={() => {
                setActiveTab("privileges");
                setSelectedCategory(cat.id);
                setSelectedMovie(null);
                setSelectedFilter("all");
              }}
            />
          ))}
          <PartnerIcon
            icon={Package}
            label="รายการสั่งซื้อ"
            count={myOrders.length}
            active={activeTab === "orders"}
            onClick={() => {
              setActiveTab("orders");
              setSelectedMovie(null);
            }}
          />
        </div>
      </div>

      {/* ========== Content Area ========== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* ===== Privileges Tab ===== */}
        {activeTab === "privileges" && (
          <>
            {/* Movies Category - Show Movie Grid or Movie Detail */}
            {selectedCategory === "movies" && (
              <>
                {!selectedMovie ? (
                  // Movie Grid
                  <>
                    <div className="p-4 border-b border-gray-100">
                      <h2 className="font-semibold text-gray-900">
                        เลือกภาพยนตร์
                      </h2>
                      <p className="text-sm text-gray-500">
                        กดเลือกเรื่องที่ต้องการดูของรางวัล
                      </p>
                    </div>
                    <div className="p-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                        {movies.map((movie) => (
                          <MovieCard
                            key={movie.id}
                            movie={movie}
                            rewardCount={movieRewardCounts[movie.id] || 0}
                            onClick={() => setSelectedMovie(movie)}
                          />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  // Movie Detail - Show Rewards
                  <>
                    {/* Movie Header - Eye-catching Design */}
                    <div className="relative overflow-hidden">
                      {/* Background with gradient overlay */}
                      <div className="absolute inset-0">
                        <img
                          src={selectedMovie.image}
                          alt=""
                          className="w-full h-full object-cover blur-xl opacity-30"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90" />
                      </div>

                      {/* Content */}
                      <div className="relative p-4 md:p-6">
                        <button
                          onClick={() => setSelectedMovie(null)}
                          className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
                        >
                          <ArrowLeft className="w-4 h-4" />
                          <span className="text-sm">กลับไปเลือกภาพยนตร์</span>
                        </button>

                        <div className="flex gap-4 md:gap-6">
                          {/* Large Poster */}
                          <div className="flex-shrink-0">
                            <img
                              src={selectedMovie.image}
                              alt={selectedMovie.title}
                              className="w-24 h-36 md:w-32 md:h-48 object-cover rounded-xl shadow-2xl ring-2 ring-white/20"
                            />
                          </div>

                          {/* Movie Info */}
                          <div className="flex-1 flex flex-col justify-end pb-2">
                            <h2 className="text-xl md:text-2xl font-bold text-white mb-1">
                              {selectedMovie.title}
                            </h2>
                            <p className="text-sm md:text-base text-white/70 mb-2">
                              {selectedMovie.titleEn}
                            </p>
                            <p className="text-xs text-white/50 line-clamp-2 hidden md:block">
                              {selectedMovie.description}
                            </p>
                            <div className="flex items-center gap-2 mt-3">
                              <span className="bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">
                                {movieRewardCounts[selectedMovie.id] || 0}{" "}
                                รางวัล
                              </span>
                              <span className="text-white/50 text-xs">
                                เปิดให้แลกแล้ว
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Filter Pills */}
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                        {(voucherFiltersByCategory[selectedCategory] || []).map(
                          (filter) => (
                            <FilterPill
                              key={filter.id}
                              active={selectedFilter === filter.id}
                              onClick={() => setSelectedFilter(filter.id)}
                              label={filter.label}
                              count={filterCounts[filter.id]}
                            />
                          )
                        )}
                      </div>
                    </div>
                    <div className="p-4">
                      <p className="text-xs text-gray-500 mb-4">
                        เรียงจากแต้มมากไปน้อย • {filteredVouchers.length} รายการ
                      </p>
                      {filteredVouchers.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {filteredVouchers.map((voucher) => (
                            <VoucherListCard
                              key={voucher.id}
                              voucher={voucher}
                              onRedeem={handleRedeem}
                            />
                          ))}
                        </div>
                      ) : (
                        <EmptyState
                          icon={Gift}
                          title="ไม่พบของรางวัล"
                          description="ไม่พบของรางวัลที่ตรงกับตัวกรองที่เลือก"
                        />
                      )}
                    </div>
                  </>
                )}
              </>
            )}

            {/* Other Categories - Show Voucher List Directly */}
            {selectedCategory !== "movies" && (
              <>
                <div className="p-4 border-b border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-gray-900">
                      สิทธิพิเศษ{" "}
                      {
                        voucherCategories.find((c) => c.id === selectedCategory)
                          ?.label
                      }
                    </h2>
                    <span className="text-sm text-gray-500">
                      {filteredVouchers.length} รายการ
                    </span>
                  </div>
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {(voucherFiltersByCategory[selectedCategory] || []).map(
                      (filter) => (
                        <FilterPill
                          key={filter.id}
                          active={selectedFilter === filter.id}
                          onClick={() => setSelectedFilter(filter.id)}
                          label={filter.label}
                          count={filterCounts[filter.id]}
                        />
                      )
                    )}
                  </div>
                </div>
                <div className="p-4 space-y-3">
                  <p className="text-xs text-gray-500 mb-2">
                    เรียงจากแต้มมากไปน้อย
                  </p>
                  {filteredVouchers.length > 0 ? (
                    filteredVouchers.map((voucher) => (
                      <VoucherListCard
                        key={voucher.id}
                        voucher={voucher}
                        onRedeem={handleRedeem}
                      />
                    ))
                  ) : (
                    <EmptyState
                      icon={Gift}
                      title="ไม่พบสิทธิพิเศษ"
                      description="ไม่พบสิทธิพิเศษที่ตรงกับการค้นหาของคุณ"
                    />
                  )}
                </div>
              </>
            )}
          </>
        )}

        {/* ===== My Vouchers Tab ===== */}
        {activeTab === "my-vouchers" && (
          <>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">คูปองของฉัน</h2>
              <p className="text-sm text-gray-500">
                {redeemedVouchers.length} รายการ
              </p>
            </div>
            <div className="p-4 space-y-3">
              {redeemedVouchers.length > 0 ? (
                redeemedVouchers.map((voucher) => (
                  <MyVoucherListCard
                    key={voucher.id}
                    voucher={voucher}
                    onShowQR={handleShowQR}
                  />
                ))
              ) : (
                <EmptyState
                  icon={Gift}
                  title="ยังไม่มีคูปอง"
                  description="คุณยังไม่ได้แลกรางวัลใดๆ"
                  actionLabel="ดูสิทธิพิเศษ"
                  onAction={() => setActiveTab("privileges")}
                />
              )}
            </div>
          </>
        )}

        {/* ===== Orders Tab ===== */}
        {activeTab === "orders" && (
          <>
            <div className="p-4 border-b border-gray-100">
              <h2 className="font-semibold text-gray-900">รายการสั่งซื้อ</h2>
              <p className="text-sm text-gray-500">{myOrders.length} รายการ</p>
            </div>
            <div className="p-4 space-y-3">
              {myOrders.length > 0 ? (
                myOrders.map((order) => (
                  <OrderListCard key={order.id} order={order} />
                ))
              ) : (
                <EmptyState
                  icon={Package}
                  title="ยังไม่มีรายการสั่งซื้อ"
                  description="คุณยังไม่มีรายการสั่งซื้อสินค้า"
                  actionLabel="ดูสิทธิพิเศษ"
                  onAction={() => setActiveTab("privileges")}
                />
              )}
            </div>
          </>
        )}
      </div>

      {/* ========== Redeem Modal (Step 1) ========== */}
      <Modal
        isOpen={!!selectedVoucher && !showConfirmModal}
        onClose={() => setSelectedVoucher(null)}
        title="แลกรางวัล"
      >
        {selectedVoucher && (
          <div className="space-y-4">
            <img
              src={selectedVoucher.image}
              alt={selectedVoucher.title}
              className="w-full h-40 object-cover rounded-xl"
            />
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {selectedVoucher.titleTh || selectedVoucher.title}
              </h3>
              <p className="text-sm text-gray-500">
                {selectedVoucher.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">คะแนนที่ต้องใช้</span>
                <span className="font-bold text-primary">
                  {selectedVoucher.pointsRequired.toLocaleString()} Flips
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">คะแนนคงเหลือ</span>
                <span className="font-medium">
                  {userBalance.flipsBalance.toLocaleString()} Flips
                </span>
              </div>
              <hr className="border-gray-200" />
              <div className="flex justify-between items-center">
                <span className="text-gray-500 text-sm">คะแนนหลังแลก</span>
                <span
                  className={`font-bold ${
                    userBalance.flipsBalance >= selectedVoucher.pointsRequired
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {(
                    userBalance.flipsBalance - selectedVoucher.pointsRequired
                  ).toLocaleString()}{" "}
                  Flips
                </span>
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setSelectedVoucher(null)}
              >
                ยกเลิก
              </Button>
              <Button
                fullWidth
                disabled={
                  userBalance.flipsBalance < selectedVoucher.pointsRequired
                }
                onClick={handleFirstConfirm}
              >
                ดำเนินการต่อ
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ========== Confirm Modal (Step 2) ========== */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        title="ยืนยันการแลกรางวัล"
      >
        {selectedVoucher && (
          <div className="space-y-4 text-center">
            <div className="w-16 h-16 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">ยืนยันการแลก?</h3>
              <p className="text-sm text-gray-500 mt-1">
                คุณต้องการแลก{" "}
                <span className="font-semibold text-gray-700">
                  "{selectedVoucher.titleTh}"
                </span>{" "}
                ใช่หรือไม่?
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-left">
              <p className="text-sm text-red-700 font-medium">⚠️ โปรดทราบ</p>
              <p className="text-xs text-red-600 mt-1">
                การแลกรางวัลนี้ไม่สามารถยกเลิกได้ และจะหักคะแนน{" "}
                <span className="font-bold">
                  {selectedVoucher.pointsRequired.toLocaleString()} Flips
                </span>{" "}
                ทันที
              </p>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => setShowConfirmModal(false)}
              >
                ยกเลิก
              </Button>
              <Button
                fullWidth
                onClick={handleFinalConfirm}
                className="bg-green-600 hover:bg-green-700"
              >
                ยืนยันการแลก
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ========== QR Code Modal ========== */}
      <Modal
        isOpen={!!showQRVoucher}
        onClose={() => setShowQRVoucher(null)}
        title="QR Code รับสิทธิ์"
      >
        {showQRVoucher && (
          <div className="flex flex-col items-center space-y-4 text-center">
            <div className="bg-white p-4 border border-gray-100 rounded-2xl shadow-sm">
              <QRCodeCanvas value={showQRVoucher.qrCode} size={200} />
            </div>
            <div>
              <h3 className="font-bold text-lg text-gray-900">
                {showQRVoucher.title}
              </h3>
              <p className="text-sm text-gray-500">
                แสดง QR code นี้ให้พนักงานเพื่อใช้สิทธิ์
              </p>
            </div>
            <div className="w-full bg-gray-50 rounded-xl p-4 text-left space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">รหัสคูปอง</span>
                <span className="font-mono font-medium text-gray-900">
                  {showQRVoucher.qrCode}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">ใช้ได้ถึง</span>
                <span className="font-medium text-primary flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {new Date(showQRVoucher.expiresAt).toLocaleDateString(
                    "th-TH"
                  )}
                </span>
              </div>
            </div>
            <Button fullWidth onClick={() => setShowQRVoucher(null)}>
              ปิด
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Vouchers;
