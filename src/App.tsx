import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
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
    {/* 使用 AuthRoute 的正确方式 */}
    <Route element={<AuthRoute />}>
      <Route path="team" element={<TeamPage />} />
      <Route path="wallet" element={<WalletPage />} />
      <Route path="pledge" element={<PledgePage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
    
    {/* 公开路由 */}
    <Route index element={<IndexPage />} />
    <Route path="docs" element={<DocsPage />} />
    <Route path="pricing" element={<PricingPage />} />
    <Route path="blog" element={<BlogPage />} />
    <Route path="about" element={<AboutPage />} />
  </Routes>


  );
}

export default App;
