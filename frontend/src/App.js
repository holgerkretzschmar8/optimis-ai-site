import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import KiBeratungPage from "@/pages/KiBeratungPage";
import ImpressumPage from "@/pages/ImpressumPage";

const LocaleManager = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/en')) {
      i18n.changeLanguage('en');
      document.documentElement.lang = 'en';
    } else {
      i18n.changeLanguage('de');
      document.documentElement.lang = 'de';
    }
  }, [location.pathname, i18n]);

  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LocaleManager />
        <Routes>
          {/* German routes (default — no prefix) */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/ki-beratung" element={<KiBeratungPage />} />
          <Route path="/impressum" element={<ImpressumPage />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />

          {/* English routes (/en prefix) */}
          <Route path="/en" element={<LandingPage />} />
          <Route path="/en/ai-consulting" element={<KiBeratungPage />} />
          <Route path="/en/imprint" element={<ImpressumPage />} />
          <Route path="/en/terms-of-service" element={<TermsOfService />} />
          <Route path="/en/privacy-policy" element={<PrivacyPolicy />} />

          {/* Admin routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* Catch Google's /de prefix — redirect to German root */}
          <Route path="/de" element={<Navigate to="/" replace />} />
          <Route path="/de/:slug" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;