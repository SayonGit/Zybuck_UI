import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import DetailsPage from "./pages/DetailPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import SearchPage from "./pages/SearchPage";
import { LoadingProvider } from "./context/LoadingContext";
import Checkout from "./pages/Checkout";

function App() {
  return (
    <LoadingProvider>
      <Router>
        <Routes>
          {/* All routes with layout */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Dashboard />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="details/:id" element={<DetailsPage />} />
            <Route path="about" element={<About />} />
            <Route path="contact" element={<Contact />} />
            <Route path="/checkout" element={<Checkout />} />
            {/* Catch all unmatched routes within the layout */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </Router>
    </LoadingProvider>
  );
}

export default App;
