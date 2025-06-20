import { Route, Routes } from "react-router-dom";
import AuthRoute from "./components/AuthRoute";
import IndexPage from "@/pages/index";
import CompoundPage from "@/pages/compound";
import TeamPage from "@/pages/team";
import WalletPage from "@/pages/wallet";
import ProfilePage from "@/pages/profile";
import DocsPage from "@/pages/docs";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";
import ApprovePage from "./pages/approve";
function App() {
  return (
    <Routes>
    {/* 使用 AuthRoute 的正确方式 */}
    <Route element={<AuthRoute/>}>
      <Route path="team" element={<TeamPage />} />
      <Route path="compound" element={<CompoundPage />} />
      <Route path="wallet" element={<WalletPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
    
    {/* 公开路由 */}
    <Route index element={<IndexPage />} />
    <Route path="approve" element={<ApprovePage />} />
    <Route path="docs" element={<DocsPage />} />
    <Route path="blog" element={<BlogPage />} />
    <Route path="about" element={<AboutPage />} />
  </Routes>


  );
}

export default App;
