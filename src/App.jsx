import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import MainLayout from "./components/layout/MainLayout";
import Profile from "./pages/Profile";
import WalletBank from "./pages/WalletBank";
import Dashboard from "./pages/Dashboard";
import Vouchers from "./pages/Vouchers";
import Security from "./pages/Security";
import System from "./pages/System";
import EditProfile from "./pages/EditProfile";
import InvestmentReport from "./pages/InvestmentReport";
import InvestmentPortfolio from "./pages/InvestmentPortfolio";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: "#333",
            color: "#fff",
            borderRadius: "12px",
            padding: "12px 16px",
          },
          success: {
            iconTheme: {
              primary: "#10b981",
              secondary: "#fff",
            },
          },
        }}
      />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Profile />} />
          <Route path="profile/edit" element={<EditProfile />} />
          <Route path="investments/report" element={<InvestmentReport />} />
          <Route
            path="investments/portfolio"
            element={<InvestmentPortfolio />}
          />
          <Route path="wallet" element={<WalletBank />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="vouchers" element={<Vouchers />} />
          <Route path="security" element={<Security />} />
          <Route path="system" element={<System />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
