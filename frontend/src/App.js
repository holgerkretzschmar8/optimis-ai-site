import "@/App.css";
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Toaster } from "@/components/ui/sonner";
import LandingPage from "@/pages/LandingPage";
import AdminLogin from "@/pages/AdminLogin";
import AdminDashboard from "@/pages/AdminDashboard";
import TermsOfService from "@/pages/TermsOfService";
import PrivacyPolicy from "@/pages/PrivacyPolicy";

const LocaleManager = () => {
  const { i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/de')) {
      i18n.changeLanguage('de');
    }
    document.documentElement.lang = i18n.language;
  }, [i18n.language, location.pathname, i18n]);

  return null;
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <LocaleManager />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/de" element={<LandingPage />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/de/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/de/privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-right" richColors />
    </div>
  );
}

export default App;
