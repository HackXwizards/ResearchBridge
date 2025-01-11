import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TooltipProvider } from "@/components/ui/tooltip";
import HomePage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import ResearcherProfile from "./pages/ResearcherProfile";
import Navbar from "./components/Navbar";
import SignupPage from "./pages/SignupPage";
import PublicationsPage from "./pages/PublicationsPage";
import DiscoverPage from "./pages/DiscoverPage";
import CollaborationPage from "./pages/CollaborationPage";
import PublicationDetailsPage from "./pages/PublicationDetailsPage";
import PublicationForm from "./pages/PublicationForm";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from './contexts/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Toaster position="top-right" reverseOrder={false} />
      <TooltipProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/collaboration" element={<CollaborationPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/publications" element={<PublicationsPage />} />
            <Route path="/publications/new" element={<PublicationForm />} />
            <Route
              path="/publications/:id"
              element={<PublicationDetailsPage />}
            />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/profile" element={<ResearcherProfile />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  );
};

export default App;
