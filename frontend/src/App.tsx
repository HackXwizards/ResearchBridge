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
const App = () => {
  return (
    <TooltipProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/collaboration" element={<CollaborationPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/publications" element={<PublicationsPage />} />
          <Route path="/discover" element={<DiscoverPage />} />
          <Route path="/profile" element={<ResearcherProfile />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  );
};

export default App;
