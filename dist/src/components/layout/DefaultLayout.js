import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
export default function DefaultLayout() {
    return (_jsx("html", { lang: "en", children: _jsxs("body", { className: "bg-background text-text", children: [_jsx(Navbar, {}), _jsx("main", { className: "py-6", children: _jsx(Outlet, {}) }), _jsx(Footer, {})] }) }));
}
export { DefaultLayout };
