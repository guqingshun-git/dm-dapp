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
      <Route element={<AuthRoute>
        <IndexPage />
      </AuthRoute>} path="/" />
      <Route element={<AuthRoute><TeamPage /></AuthRoute>} path="/team" />
      <Route element={<AuthRoute><WalletPage /></AuthRoute>} path="/wallet" />
      <Route element={<AuthRoute><PledgePage /></AuthRoute>} path="/pledge" />
      <Route element={<AuthRoute><ProfilePage /></AuthRoute>} path="/profile" />
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />

    </Routes>
  );
}

export default App;
