import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
// import DetailsPage from "./pages/DetailPage";
// import About from "./pages/About";
// import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import { LoadingProvider } from "./context/LoadingContext";
import Checkout from "./pages/Checkout";
import ConfigProvider from "./providers/configProviders";
import { useDynamicTheme } from "./hooks/useDynamicTheme";
import { DynamicPage } from "./pages/DynamicPage";
import { BlogPage } from "./pages/BlogPage";
import { BlogDetail } from "./pages/BlogDetail";

function AppContent() {
  useDynamicTheme();

  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          {/* <Route path="dashboard" element={<Dashboard />} /> */}
          <Route path="index" element={<Dashboard />} />
          <Route path="home" element={<Dashboard />} />
          <Route path="search" element={<SearchPage />} />
          {/* <Route path="details/:id" element={<DetailsPage />} /> */}
          {/* <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} /> */}
          <Route path="/checkout" element={<Checkout />} />
        </Route>
        <Route path="/blogs" element={<BlogPage />} />
        <Route path="/blogs/:id" element={<BlogDetail />} />
        <Route path="not-found" element={<NotFound />} />
        <Route path="/:pageName" element={<DynamicPage />} />
      </Routes>
    </Router>
  );
}

export default function App() {
  return (
    <ConfigProvider>
      <LoadingProvider>
        <AppContent />
      </LoadingProvider>
    </ConfigProvider>
  );
}
