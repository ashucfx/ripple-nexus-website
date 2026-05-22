import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "@/components/ScrollToTop";
import CustomCursor from "@/components/CustomCursor";
import FloatingCTA from "@/components/FloatingCTA";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Platform from "./pages/Platform";
import Contact from "./pages/Contact";
import CaseStudies from "./pages/CaseStudies";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import CancellationPolicy from "./pages/CancellationPolicy";
import ServiceSilo from "./pages/ServiceSilo";
import GeoService from "./pages/GeoService";
import AdminPanel from "./pages/AdminPanel";
import SecurityCenter from "./pages/SecurityCenter";
import Reliability from "./pages/Reliability";
import DeveloperHub from "./pages/DeveloperHub";
import LoginGateway from "./pages/LoginGateway";
import Changelog from "./pages/Changelog";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <CustomCursor />
        <ScrollToTop />
        <FloatingCTA />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/platform" element={<Platform />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/case-studies" element={<CaseStudies />} />
          <Route path="/security" element={<SecurityCenter />} />
          <Route path="/reliability" element={<Reliability />} />
          <Route path="/docs" element={<DeveloperHub />} />
          <Route path="/changelog" element={<Changelog />} />
          <Route path="/login" element={<LoginGateway />} />
          <Route path="/services/:slug" element={<ServiceSilo />} />
          <Route path="/locations/:country/:service" element={<GeoService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/cancellation-policy" element={<CancellationPolicy />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
