import React, { useState, useMemo, useEffect } from "react";
import { useVoucher } from "../context/VoucherContext";
import { useNotifications } from "../context/NotificationContext";
import { useAddress } from "../context/AddressContext";
import toast from "react-hot-toast";
import {
  marketplaceVouchers,
  userInvestments,
  movies,
} from "../data/mockDataVoucher";
import { Button } from "../components/ui/Button";
import Modal from "../components/ui/Modal";
import AddressSelectionModal from "../components/AddressSelectionModal";
import {
  Gift,
  ChevronRight,
  ArrowLeft,
  Crown,
  AlertTriangle,
  Sparkles,
  TrendingUp,
  Coins,
  Wallet,
  Zap,
} from "lucide-react";

// =============================================
// Token Balance Card
// =============================================
const TokenBalanceCard = ({ investment, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col p-3 md:p-4 rounded-xl transition-all text-left w-full ${
      isActive
        ? "bg-white shadow-md ring-2 ring-primary/50"
        : "bg-white/60 hover:bg-white hover:shadow-sm border border-gray-100"
    }`}
  >
    <div className="flex items-center gap-2 mb-2">
      <span className="text-xl md:text-2xl">{investment.icon}</span>
      <span className="text-xs md:text-sm font-medium text-gray-600 truncate">
        {investment.title}
      </span>
    </div>
    <div className="text-lg md:text-xl font-bold text-gray-900">
      {investment.flipsBalance.toLocaleString()}
    </div>
    <div className="text-xs text-gray-500">Flips Point</div>
  </button>
);

// =============================================
// Category Icon Button
// =============================================
const CategoryIcon = ({ icon: Icon, label, count, active, onClick }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center gap-2 min-w-[70px] md:min-w-[80px] transition-all`}
  >
    <div
      className={`relative w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center transition-all ${
        active
          ? "bg-primary text-white shadow-lg"
          : "bg-white text-gray-600 hover:bg-gray-100 border border-gray-200"
      }`}
    >
      <Icon className="w-5 h-5 md:w-6 md:h-6" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
          {count > 99 ? "99+" : count}
        </span>
      )}
    </div>
    <span
      className={`text-[10px] md:text-xs text-center leading-tight ${
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
    className="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all text-left w-full"
  >
    <div className="relative aspect-[3/4] overflow-hidden">
      <img
        src={movie.image}
        alt={movie.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 p-3">
        <h3 className="font-bold text-white text-sm md:text-base line-clamp-2">
          {movie.title}
        </h3>
        <p className="text-white/70 text-xs mt-0.5">{movie.titleEn}</p>
      </div>
      <div className="absolute top-2 right-2 bg-white/95 backdrop-blur-sm text-primary text-xs font-bold px-2 py-1 rounded-full">
        {rewardCount} รางวัล
      </div>
    </div>
  </button>
);

// =============================================
// Filter Pill
// =============================================
const FilterPill = ({ active, onClick, label, count }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-1.5 px-3 md:px-4 py-2 md:py-2.5 text-xs md:text-sm font-medium rounded-full border-2 transition-all whitespace-nowrap ${
      active
        ? "bg-primary text-white border-primary shadow-sm"
        : "bg-white text-gray-700 border-gray-200 hover:border-primary/50 hover:text-primary"
    }`}
  >
    <span className="font-semibold">{label}</span>
    {count !== undefined && count > 0 && (
      <span
        className={`text-[10px] md:text-xs font-bold px-1.5 md:px-2 py-0.5 rounded-full min-w-[20px] text-center ${
          active ? "bg-white/25 text-white" : "bg-gray-100 text-gray-600"
        }`}
      >
        {count}
      </span>
    )}
  </button>
);

// =============================================
// Voucher Card (Reward)
// =============================================
const VoucherCard = ({ voucher, onRedeem }) => (
  <div className="group flex flex-col bg-white rounded-xl border border-gray-100 overflow-hidden hover:shadow-lg transition-all">
    <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden">
      <img
        src={voucher.image}
        alt={voucher.title}
        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Points badge - improved sizing */}
      <div className="absolute top-2 left-2 bg-white/95 backdrop-blur-sm rounded-full px-2 md:px-2.5 py-1 flex items-center gap-1 shadow">
        <span className="font-bold text-primary text-xs md:text-sm">
          {voucher.pointsRequired.toLocaleString()}
        </span>
        <span className="text-[10px] md:text-xs text-gray-500">Flips</span>
      </div>

      {/* Tier badge */}
      {voucher.tier === "Gold" && (
        <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-amber-500 text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded-full flex items-center gap-0.5">
          <Crown className="w-3 h-3" />
          Gold
        </div>
      )}

      {/* Title - improved readability */}
      <div className="absolute bottom-0 left-0 right-0 p-2.5 md:p-3">
        <h3 className="font-bold text-white text-sm md:text-base line-clamp-2">
          {voucher.titleTh || voucher.title}
        </h3>
      </div>
    </div>

    {/* Redeem button - larger on mobile */}
    <div className="p-2.5 md:p-3">
      <Button
        fullWidth
        size="sm"
        onClick={() => onRedeem(voucher)}
        className="text-sm md:text-base font-medium py-2 md:py-2"
      >
        <Gift className="w-4 h-4 mr-1.5" />
        แลก
      </Button>
    </div>
  </div>
);

// =============================================
// Empty State
// =============================================
const EmptyState = ({ icon: Icon, title, description }) => (
  <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
    <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center mb-3">
      <Icon className="w-7 h-7 text-gray-400" />
    </div>
    <h3 className="text-sm font-semibold text-gray-700 mb-1">{title}</h3>
    <p className="text-gray-500 text-xs max-w-xs">{description}</p>
  </div>
);

// =============================================
// Main VoucherMarketplace Component
// =============================================
const VoucherMarketplace = () => {
  const { investments, redeemVoucher, addPoints } = useVoucher();
  const { addNotification } = useNotifications();
  const { getDefaultAddress } = useAddress();

  const [selectedCategory, setSelectedCategory] = useState("movies");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [deliveryTypeFilter, setDeliveryTypeFilter] = useState("all"); // all, online, offline
  const [selectedVoucher, setSelectedVoucher] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showTokenDropdown, setShowTokenDropdown] = useState(false);
  const [showQuickBuyModal, setShowQuickBuyModal] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [paymentStep, setPaymentStep] = useState("select"); // select, payment, processing
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  // Address selection for offline vouchers
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);

  // Helper: Check if voucher is online (digital/QR) or offline (physical/shipping)
  const getDeliveryType = (voucher) => {
    // Online: tickets, meet-creator, end-credits (use QR code)
    // Offline: merchandise (need shipping)
    if (voucher.deliveryType) return voucher.deliveryType;
    return voucher.type === "merchandise" ? "offline" : "online";
  };

  // Active investment based on selection
  const activeInvestment = useMemo(() => {
    if (selectedCategory === "movies" && selectedMovie) {
      return investments.find(
        (inv) => inv.categoryId === "movies" && inv.movieId === selectedMovie.id
      );
    } else if (selectedCategory !== "movies") {
      return investments.find((inv) => inv.categoryId === selectedCategory);
    }
    return null;
  }, [selectedCategory, selectedMovie, investments]);

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

  // Filtered vouchers
  const filteredVouchers = useMemo(() => {
    let vouchers = marketplaceVouchers.filter((voucher) => {
      // Basic category and type filtering
      if (selectedCategory === "movies") {
        if (!selectedMovie) return false;
        const matchesMovie = voucher.movieId === selectedMovie.id;
        const matchesFilter =
          selectedFilter === "all" || voucher.type === selectedFilter;
        const matchesDeliveryType =
          deliveryTypeFilter === "all" ||
          getDeliveryType(voucher) === deliveryTypeFilter;
        return matchesMovie && matchesFilter && matchesDeliveryType;
      } else {
        const matchesCategory = voucher.category === selectedCategory;
        const matchesFilter =
          selectedFilter === "all" || voucher.type === selectedFilter;
        const matchesDeliveryType =
          deliveryTypeFilter === "all" ||
          getDeliveryType(voucher) === deliveryTypeFilter;
        return matchesCategory && matchesFilter && matchesDeliveryType;
      }
    });
    return vouchers.sort((a, b) => b.pointsRequired - a.pointsRequired);
  }, [selectedCategory, selectedMovie, selectedFilter, deliveryTypeFilter]);

  // Filter counts
  const filterCounts = useMemo(() => {
    const counts = { all: 0, online: 0, offline: 0 };
    let vouchers =
      selectedCategory === "movies" && selectedMovie
        ? marketplaceVouchers.filter((v) => v.movieId === selectedMovie.id)
        : marketplaceVouchers.filter((v) => v.category === selectedCategory);

    vouchers.forEach((v) => {
      counts.all++;
      counts[v.type] = (counts[v.type] || 0) + 1;

      // Count delivery types
      const deliveryType = getDeliveryType(v);
      counts[deliveryType]++;
    });
    return counts;
  }, [selectedCategory, selectedMovie]);

  // Handlers
  const handleRedeem = (voucher) => setSelectedVoucher(voucher);

  // First confirmation - check if address needed
  const handleFirstConfirm = () => {
    // Check if this is an offline voucher (needs shipping)
    if (selectedVoucher?.deliveryType === "offline") {
      setShowAddressModal(true);
    } else {
      // Online voucher - proceed directly to final confirmation
      setShowConfirmModal(true);
    }
  };

  // Handle address selection for offline vouchers
  const handleAddressSelected = (address) => {
    setSelectedAddress(address);
    setShowAddressModal(false);
    setShowConfirmModal(true);
  };

  // Final Redemption Handler
  const handleFinalConfirm = () => {
    if (
      !activeInvestment ||
      !selectedVoucher ||
      activeInvestment.flipsBalance < selectedVoucher.pointsRequired
    ) {
      return;
    }

    // For offline vouchers, ensure address is selected
    if (selectedVoucher.deliveryType === "offline" && !selectedAddress) {
      toast.error("กรุณาเลือกที่อยู่จัดส่ง");
      return;
    }

    const redeemedVoucher = redeemVoucher(
      selectedVoucher,
      activeInvestment,
      selectedAddress
    );

    if (redeemedVoucher) {
      const message =
        selectedVoucher.deliveryType === "offline"
          ? "Voucher redeemed! We'll ship to your address."
          : "Voucher redeemed successfully!";

      toast.success(message, {
        duration: 3000,
      });

      setSelectedVoucher(null);
      setShowConfirmModal(false);
      setSelectedAddress(null);
    }
  };

  // Auto-select first movie on page load for better UX
  useEffect(() => {
    // Only auto-select if nothing is selected yet
    if (!selectedMovie && investments.length > 0) {
      // Find first movie investment
      const firstMovieInvestment = investments.find(
        (inv) => inv.categoryId === "movies"
      );

      if (firstMovieInvestment) {
        const movie = movies.find((m) => m.id === firstMovieInvestment.movieId);
        if (movie) {
          setSelectedCategory("movies");
          setSelectedMovie(movie);
        }
      }
    }
  }, [investments]); // Only run when investments change

  return (
    <div className="space-y-4 md:space-y-6">
      {/* ========== Header: Investment Tokens ========== */}
      <div className="bg-gradient-to-br from-primary/90 to-primary rounded-2xl p-4 md:p-6 text-white shadow-lg">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Coins className="w-5 h-5" />
            <span className="font-medium text-sm md:text-base">
              My Investment Tokens
            </span>
          </div>
          <button
            onClick={() => {
              if (
                window.confirm(
                  "Reset all data? This will restore Flips Points to default."
                )
              ) {
                localStorage.removeItem("flips_investments");
                localStorage.removeItem("flips_vouchers");
                window.location.reload();
              }
            }}
            className="text-white/80 hover:text-white text-xs flex items-center gap-1 bg-white/10 hover:bg-white/20 px-2 py-1 rounded-lg transition-colors"
          >
            🔄 Reset
          </button>
        </div>

        {/* Active Token Display - Show first 4-5 tokens */}
        <div className="space-y-3">
          {/* Token Grid - Show first 4 or all if <= 4 */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-3">
            {investments.slice(0, 4).map((inv) => (
              <TokenBalanceCard
                key={inv.id}
                investment={inv}
                isActive={activeInvestment?.id === inv.id}
                onClick={() => {
                  setSelectedCategory(inv.categoryId);

                  if (inv.categoryId === "movies") {
                    const movie = movies.find((m) => m.id === inv.movieId);
                    if (movie) setSelectedMovie(movie);
                  } else {
                    setSelectedMovie(null);
                  }

                  setSelectedFilter("all");
                  setDeliveryTypeFilter("all");
                }}
              />
            ))}
          </div>

          {/* View All Button - Show if more than 4 tokens */}
          {investments.length > 4 && (
            <button
              onClick={() => setShowTokenDropdown(true)}
              className="w-full bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-3 flex items-center justify-center gap-2 transition-colors"
            >
              <span className="text-sm font-medium">View All Tokens</span>
              <span className="text-xs bg-white/20 px-2 py-0.5 rounded-full">
                {investments.length}
              </span>
            </button>
          )}

          {/* Modal for All Tokens */}
          {showTokenDropdown && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
                {/* Modal Header */}
                <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                  <h3 className="font-semibold text-gray-900">
                    All Investment Tokens
                  </h3>
                  <button
                    onClick={() => setShowTokenDropdown(false)}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Token List */}
                <div className="overflow-y-auto max-h-[calc(80vh-80px)]">
                  {investments.map((inv) => (
                    <button
                      key={inv.id}
                      onClick={() => {
                        setSelectedCategory(inv.categoryId);

                        if (inv.categoryId === "movies") {
                          const movie = movies.find(
                            (m) => m.id === inv.movieId
                          );
                          if (movie) setSelectedMovie(movie);
                        } else {
                          setSelectedMovie(null);
                        }

                        setSelectedFilter("all");
                        setDeliveryTypeFilter("all");
                        setShowTokenDropdown(false);
                      }}
                      className={`w-full flex items-center gap-3 px-4 py-3 border-b border-gray-100 last:border-0 transition-colors ${
                        activeInvestment?.id === inv.id
                          ? "bg-primary/5"
                          : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-2xl">{inv.icon}</span>
                      <div className="flex-1 text-left">
                        <div className="font-semibold text-sm text-gray-900">
                          {inv.title}
                        </div>
                        <div className="text-xs text-gray-500">
                          {inv.flipsBalance.toLocaleString()} Flips
                        </div>
                      </div>
                      {activeInvestment?.id === inv.id && (
                        <div className="text-primary">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ========== Content Area ========== */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Movies Category */}
        {selectedCategory === "movies" && (
          <>
            {!selectedMovie ? (
              <>
                <div className="p-4 border-b border-gray-100">
                  <h2 className="font-semibold text-gray-900 text-sm md:text-base">
                    เลือกภาพยนตร์
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    กดเลือกเรื่องที่ต้องการดูของรางวัล
                  </p>
                </div>
                <div className="p-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
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
              <>
                {/* Movie Detail Header */}
                <div className="relative overflow-hidden">
                  <div className="absolute inset-0">
                    <img
                      src={selectedMovie.image}
                      alt=""
                      className="w-full h-full object-cover blur-xl opacity-30"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/90" />
                  </div>

                  <div className="relative p-4 md:p-6">
                    <button
                      onClick={() => setSelectedMovie(null)}
                      className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      <span className="text-xs md:text-sm">
                        กลับไปเลือกภาพยนตร์
                      </span>
                    </button>

                    <div className="flex gap-3 md:gap-4">
                      <img
                        src={selectedMovie.image}
                        alt={selectedMovie.title}
                        className="w-20 h-28 md:w-28 md:h-40 object-cover rounded-lg shadow-xl ring-2 ring-white/20 flex-shrink-0"
                      />
                      <div className="flex-1 flex flex-col justify-end pb-1">
                        <h2 className="text-lg md:text-xl font-bold text-white mb-1">
                          {selectedMovie.title}
                        </h2>
                        <p className="text-xs md:text-sm text-white/70 mb-2">
                          {selectedMovie.titleEn}
                        </p>
                        <div className="flex items-center gap-2">
                          <span className="bg-white/20 text-white text-xs font-medium px-2 py-1 rounded-full">
                            {movieRewardCounts[selectedMovie.id] || 0} รางวัล
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Filters */}
                <div className="p-4 border-b border-gray-100">
                  <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                    {/* Delivery Type Filters */}
                    <FilterPill
                      active={deliveryTypeFilter === "all"}
                      onClick={() => setDeliveryTypeFilter("all")}
                      label="All"
                      count={filterCounts.all}
                    />
                    <FilterPill
                      active={deliveryTypeFilter === "online"}
                      onClick={() => setDeliveryTypeFilter("online")}
                      label="🌐 Online"
                      count={filterCounts.online}
                    />
                    <FilterPill
                      active={deliveryTypeFilter === "offline"}
                      onClick={() => setDeliveryTypeFilter("offline")}
                      label="📦 Offline"
                      count={filterCounts.offline}
                    />
                  </div>
                </div>

                {/* Vouchers Grid */}
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-3">
                    เรียงจากแต้มมากไปน้อย • {filteredVouchers.length} รายการ
                  </p>
                  {filteredVouchers.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                      {filteredVouchers.map((voucher) => (
                        <VoucherCard
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

        {/* Other Categories (Ctrl G, Yarth, etc.) */}
        {selectedCategory !== "movies" && activeInvestment && (
          <>
            <div className="p-4 border-b border-gray-100">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-gray-900 text-sm md:text-base">
                    {activeInvestment.title}
                  </h2>
                  <p className="text-xs text-gray-500 mt-0.5">
                    {filteredVouchers.length} รายการ
                  </p>
                </div>
              </div>
              {/* Removed filter pills for non-movies categories for simplicity */}
            </div>
            <div className="p-4">
              <p className="text-xs text-gray-500 mb-3">
                เรียงจากแต้มมากไปน้อย
              </p>
              {filteredVouchers.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
                  {filteredVouchers.map((voucher) => (
                    <VoucherCard
                      key={voucher.id}
                      voucher={voucher}
                      onRedeem={handleRedeem}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  icon={Gift}
                  title="ไม่พบสิทธิพิเศษ"
                  description="ไม่พบสิทธิพิเศษที่ตรงกับการค้นหา"
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
              className="w-full h-36 md:h-40 object-cover rounded-xl"
            />
            <div>
              <h3 className="font-bold text-base md:text-lg text-gray-900">
                {selectedVoucher.titleTh || selectedVoucher.title}
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                {selectedVoucher.description}
              </p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">ใช้ Token:</span>
                  <span className="font-semibold">
                    {activeInvestment?.title}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">คะแนนที่ต้องใช้:</span>
                  <span className="font-semibold">
                    {selectedVoucher?.pointsRequired.toLocaleString()} Flips
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">คะแนนคงเหลือ:</span>
                  <span className="font-semibold">
                    {activeInvestment?.flipsBalance.toLocaleString()} Flips
                  </span>
                </div>
                <div className="border-t border-gray-200 pt-3 flex justify-between">
                  <span className="text-gray-600">หลังแลก:</span>
                  <span
                    className={`font-bold ${
                      activeInvestment &&
                      selectedVoucher &&
                      activeInvestment.flipsBalance <
                        selectedVoucher.pointsRequired
                        ? "text-red-600"
                        : "text-green-600"
                    }`}
                  >
                    {activeInvestment && selectedVoucher
                      ? (
                          activeInvestment.flipsBalance -
                          selectedVoucher.pointsRequired
                        ).toLocaleString()
                      : 0}{" "}
                    Flips
                  </span>
                </div>

                {/* Insufficient Balance Warning */}
                {activeInvestment &&
                  selectedVoucher &&
                  activeInvestment.flipsBalance <
                    selectedVoucher.pointsRequired && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mt-3">
                      <div className="flex items-start gap-2">
                        <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-red-900">
                            คะแนนไม่เพียงพอ
                          </p>
                          <p className="text-xs text-red-700 mt-1">
                            ต้องการอีก{" "}
                            {(
                              selectedVoucher.pointsRequired -
                              activeInvestment.flipsBalance
                            ).toLocaleString()}{" "}
                            Flips
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-2">
                <Button
                  variant="outline"
                  fullWidth
                  onClick={() => setSelectedVoucher(null)}
                >
                  ยกเลิก
                </Button>
                {activeInvestment &&
                selectedVoucher &&
                activeInvestment.flipsBalance <
                  selectedVoucher.pointsRequired ? (
                  // Show Buy Points button if insufficient balance
                  <Button
                    fullWidth
                    onClick={() => {
                      setShowQuickBuyModal(true);
                    }}
                    className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                  >
                    <Wallet className="w-4 h-4 mr-2" />
                    ซื้อ Flips Points
                  </Button>
                ) : (
                  // Show redeem button if balance is sufficient
                  <Button fullWidth onClick={handleFirstConfirm}>
                    ดำเนินการต่อ
                  </Button>
                )}
              </div>
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
            <div className="w-14 h-14 mx-auto bg-amber-100 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h3 className="font-bold text-base md:text-lg text-gray-900">
                ยืนยันการแลก?
              </h3>
              <p className="text-xs md:text-sm text-gray-500 mt-1">
                คุณต้องการแลก{" "}
                <span className="font-semibold text-gray-700">
                  "{selectedVoucher.titleTh}"
                </span>{" "}
                ใช่หรือไม่?
              </p>
            </div>
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-left">
              <p className="text-xs md:text-sm text-red-700 font-medium">
                ⚠️ โปรดทราบ
              </p>
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

      {/* ========== Quick Buy Points Modal ========== */}
      <Modal
        isOpen={showQuickBuyModal}
        onClose={() => setShowQuickBuyModal(false)}
        title="ซื้อ Flips Points"
      >
        {activeInvestment && (
          <div className="space-y-4">
            {/* Token Info */}
            <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{activeInvestment.icon}</span>
                <div>
                  <div className="text-sm text-gray-600">
                    เติม Points สำหรับ
                  </div>
                  <div className="font-semibold text-gray-900">
                    {activeInvestment.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    ยอดคงเหลือปัจจุบัน:{" "}
                    {activeInvestment.flipsBalance.toLocaleString()} Flips
                  </div>
                </div>
              </div>
            </div>

            {/* Package Selection */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 text-sm">
                เลือกแพ็กเกจ
              </h3>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { id: 1, flips: 10000, price: 99, bonus: 0 },
                  {
                    id: 2,
                    flips: 50000,
                    price: 449,
                    bonus: 10,
                    recommended: true,
                  },
                  { id: 3, flips: 100000, price: 799, bonus: 20 },
                  { id: 4, flips: 500000, price: 3499, bonus: 30 },
                ].map((pkg) => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedPackage(pkg)}
                    className={`relative p-3 rounded-xl border-2 transition-all text-left ${
                      selectedPackage?.id === pkg.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    {pkg.recommended && (
                      <div className="absolute -top-1 -right-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                        Hot
                      </div>
                    )}
                    <div className="text-lg font-bold text-gray-900">
                      {(pkg.flips / 1000).toFixed(0)}k
                    </div>
                    <div className="text-xs text-gray-500">Flips</div>
                    {pkg.bonus > 0 && (
                      <div className="text-[10px] text-green-600 font-medium mt-1">
                        +{pkg.bonus}% Bonus
                      </div>
                    )}
                    <div className="text-sm font-semibold text-primary mt-1">
                      ฿{pkg.price}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Purchase Summary */}
            {selectedPackage && (
              <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">จำนวน Flips:</span>
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
                <div className="border-t border-gray-200 pt-2 flex justify-between">
                  <span className="font-semibold">ยอดรวม:</span>
                  <span className="font-bold text-primary">
                    ฿{selectedPackage.price}
                  </span>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button
                variant="outline"
                fullWidth
                onClick={() => {
                  setShowQuickBuyModal(false);
                  setSelectedPackage(null);
                  setPaymentStep("select");
                  setSelectedPaymentMethod(null);
                }}
              >
                ยกเลิก
              </Button>

              {paymentStep === "select" && (
                <Button
                  fullWidth
                  disabled={!selectedPackage}
                  onClick={() => setPaymentStep("payment")}
                >
                  ดำเนินการต่อ
                </Button>
              )}
            </div>
          </div>
        )}

        {/* Payment Method Selection Step */}
        {activeInvestment && paymentStep === "payment" && selectedPackage && (
          <div className="space-y-4">
            {/* Back Button */}
            <button
              onClick={() => setPaymentStep("select")}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              กลับ
            </button>

            {/* Order Summary */}
            <div className="bg-gray-50 rounded-xl p-4 space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-gray-600">แพ็กเกจ</div>
                  <div className="font-semibold text-gray-900">
                    {selectedPackage.flips.toLocaleString()} Flips
                    {selectedPackage.bonus > 0 && (
                      <span className="text-xs text-green-600 ml-1">
                        +{selectedPackage.bonus}%
                      </span>
                    )}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-600">ยอดรวม</div>
                  <div className="text-xl font-bold text-primary">
                    ฿{selectedPackage.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-medium text-gray-900 mb-3 text-sm">
                เลือกวิธีชำระเงิน
              </h3>
              <div className="space-y-2">
                {[
                  {
                    id: "promptpay",
                    name: "พร้อมเพย์ QR Code",
                    icon: "📱",
                    recommended: true,
                  },
                  { id: "credit", name: "บัตรเครดิต/เดบิต", icon: "💳" },
                  { id: "bank", name: "โอนผ่านธนาคาร", icon: "🏦" },
                ].map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedPaymentMethod(method.id)}
                    className={`w-full p-3 rounded-xl border-2 transition-all flex items-center justify-between ${
                      selectedPaymentMethod === method.id
                        ? "border-primary bg-primary/5"
                        : "border-gray-200 hover:border-primary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{method.icon}</span>
                      <span className="font-medium text-sm">{method.name}</span>
                    </div>
                    {method.recommended && (
                      <span className="text-[10px] bg-green-500 text-white px-2 py-0.5 rounded-full font-bold">
                        แนะนำ
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Confirm Payment Button */}
            <Button
              fullWidth
              disabled={!selectedPaymentMethod}
              onClick={() => setPaymentStep("processing")}
            >
              ดำเนินการต่อ
            </Button>
          </div>
        )}

        {/* Payment Processing/Confirmation Step */}
        {activeInvestment &&
          paymentStep === "processing" &&
          selectedPackage &&
          selectedPaymentMethod && (
            <div className="space-y-4">
              {/* Back Button */}
              <button
                onClick={() => setPaymentStep("payment")}
                className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                กลับ
              </button>

              {/* Order Info */}
              <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-600">ยอดชำระ</div>
                    <div className="text-2xl font-bold text-primary">
                      ฿{selectedPackage.price}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-gray-600">คุณจะได้รับ</div>
                    <div className="font-semibold text-gray-900">
                      {(
                        selectedPackage.flips +
                        Math.floor(
                          (selectedPackage.flips * selectedPackage.bonus) / 100
                        )
                      ).toLocaleString()}{" "}
                      Flips
                    </div>
                  </div>
                </div>
              </div>

              {/* PromptPay QR Code */}
              {selectedPaymentMethod === "promptpay" && (
                <div className="bg-white rounded-xl p-6 text-center space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      สแกน QR Code เพื่อชำระเงิน
                    </h3>
                    <p className="text-xs text-gray-500">
                      ใช้แอพธนาคารสแกน QR Code ด้านล่าง
                    </p>
                  </div>

                  {/* Mock QR Code */}
                  <div className="flex justify-center">
                    <div className="bg-gray-100 p-4 rounded-xl">
                      <div className="w-48 h-48 bg-white border-2 border-gray-300 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-6xl mb-2">📱</div>
                          <div className="text-xs text-gray-500">QR Code</div>
                          <div className="text-xs text-gray-400">PromptPay</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                    <p className="text-xs text-amber-900">
                      ⏱️ QR Code หมดอายุใน{" "}
                      <span className="font-semibold">14:52</span>
                    </p>
                  </div>

                  <div className="text-xs text-gray-500 space-y-1">
                    <p>• กรุณาชำระภายใน 15 นาที</p>
                    <p>• ระบบจะตรวจสอบการชำระเงินอัตโนมัติ</p>
                  </div>
                </div>
              )}

              {/* Bank Transfer */}
              {selectedPaymentMethod === "bank" && (
                <div className="bg-white rounded-xl p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    โอนเงินไปที่บัญชี
                  </h3>
                  <div className="bg-gray-50 rounded-xl p-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">ธนาคาร:</span>
                      <span className="font-semibold">กสิกรไทย</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">เลขที่บัญชี:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-semibold">
                          123-4-56789-0
                        </span>
                        <button className="text-primary text-xs">คัดลอก</button>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">ชื่อบัญชี:</span>
                      <span className="font-semibold">บริษัท Flips จำกัด</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-gray-200">
                      <span className="text-gray-600">จำนวนเงิน:</span>
                      <span className="text-lg font-bold text-primary">
                        ฿{selectedPackage.price}.00
                      </span>
                    </div>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-3">
                    <p className="text-xs text-blue-900">
                      💡 หลังโอนเงิน กรุณาแจ้งโอนโดยอัปโหลดสลิป
                    </p>
                  </div>
                </div>
              )}

              {/* Credit Card Form (Mock) */}
              {selectedPaymentMethod === "credit" && (
                <div className="bg-white rounded-xl p-4 space-y-3">
                  <h3 className="font-semibold text-gray-900 text-sm">
                    ข้อมูลบัตรเครดิต/เดบิต
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs text-gray-600">
                        หมายเลขบัตร
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                        disabled
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs text-gray-600">
                          วันหมดอายุ
                        </label>
                        <input
                          type="text"
                          placeholder="MM/YY"
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          disabled
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-600">CVV</label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          disabled
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Confirm Button */}
              <Button
                fullWidth
                onClick={() => {
                  // Simulate payment processing
                  setTimeout(() => {
                    const totalFlips =
                      selectedPackage.flips +
                      Math.floor(
                        (selectedPackage.flips * selectedPackage.bonus) / 100
                      );

                    addPoints(activeInvestment.id, totalFlips);

                    // Add notification
                    addNotification({
                      type: "success",
                      title: "Points Purchase Successful!",
                      message: `You bought ${totalFlips.toLocaleString()} Flips for "${
                        activeInvestment.title
                      }"`,
                      action: {
                        label: "View details",
                        path: "/voucher-marketplace",
                      },
                    });

                    toast.success(
                      `✅ ซื้อ ${totalFlips.toLocaleString()} Flips สำหรับ "${
                        activeInvestment.title
                      }" สำเร็จ!`,
                      { duration: 4000 }
                    );

                    setShowQuickBuyModal(false);
                    setSelectedPackage(null);
                    setPaymentStep("select");
                    setSelectedPaymentMethod(null);
                  }, 1500);
                }}
                className="bg-green-600 hover:bg-green-700"
              >
                {selectedPaymentMethod === "promptpay"
                  ? "ฉันชำระเงินแล้ว"
                  : selectedPaymentMethod === "bank"
                  ? "แจ้งโอนเงิน"
                  : "ชำระเงิน"}
              </Button>

              <p className="text-xs text-center text-gray-500">
                การชำระเงินของคุณจะได้รับการตรวจสอบภายใน 1-2 นาที
              </p>
            </div>
          )}
      </Modal>

      {/* Address Selection Modal (for offline vouchers) */}
      <AddressSelectionModal
        isOpen={showAddressModal}
        onClose={() => setShowAddressModal(false)}
        onSelectAddress={handleAddressSelected}
      />
    </div>
  );
};

export default VoucherMarketplace;
