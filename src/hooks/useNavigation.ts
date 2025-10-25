import { useNavigate, useLocation } from "react-router-dom";

export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToHome = () => navigate("/");
  const goToDashboard = () => navigate("/dashboard");
  const goToAbout = () => navigate("/about");
  const goToContact = () => navigate("/contact");
  const goToSearch = (query: URLSearchParams) =>
    navigate("/search?" + query.toString());
  const goToCheckout = (query: URLSearchParams) =>
    navigate("/checkout?" + query.toString());
  const goToDetails = (id: string) => navigate(`/details/${id}`);
  const goBack = () => navigate(-1);
  const goForward = () => navigate(1);

  const isCurrentPath = (path: string) => location.pathname === path;
  const isHomePage = () =>
    location.pathname === "/" || location.pathname === "/dashboard";
  const isDetailsPage = () => location.pathname.startsWith("/details/");

  return {
    navigate,
    location,
    goToHome,
    goToDashboard,
    goToAbout,
    goToContact,
    goToDetails,
    goBack,
    goForward,
    isCurrentPath,
    isHomePage,
    isDetailsPage,
    goToSearch,
    goToCheckout,
  };
};
