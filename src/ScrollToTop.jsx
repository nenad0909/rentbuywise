import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const DEFAULT_TITLE = "Rent vs Buy Calculator 2026 — RentBuyWise.com";

const ROUTE_TITLE = {
  "/": DEFAULT_TITLE,
  "/disclaimer": "Disclaimer — RentBuyWise.com",
  "/privacy-policy": "Privacy Policy — RentBuyWise.com",
  "/terms-of-use": "Terms of Use — RentBuyWise.com",
};

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0, 0);
    document.title = ROUTE_TITLE[pathname] ?? DEFAULT_TITLE;
  }, [pathname]);

  return null;
}
