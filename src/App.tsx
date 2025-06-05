import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import TeamPage from "@/pages/team";
import WalletPage from "@/pages/wallet";
import ProfilePage from "@/pages/profile";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import PledgePage from "@/pages/pledge";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<TeamPage />} path="/team" />
      <Route element={<WalletPage />} path="/wallet" />
      <Route element={<PledgePage />} path="/pledge" />
      <Route element={<ProfilePage />} path="/profile" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
      
    </Routes>
  );
}

export default App;
