import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { useState } from "react";
import { CartProvider, useCartContext } from "../../../context/ShopContext";
import { PRODUCTS } from "../../../data";
import Cart from "../Cart";
function Harness() {
    const { cart, addItem, updateQuantity, removeItem } = useCartContext();
    const product = PRODUCTS[0];
    return (_jsxs("div", { children: [_jsx("button", { onClick: () => addItem(product, 1), children: "Add one" }), _jsx("button", { onClick: () => addItem(product, 2), children: "Add two" }), _jsx("button", { onClick: () => updateQuantity(product.id, 3), children: "Set three" }), _jsx("button", { onClick: () => removeItem(product.id), children: "Remove" }), _jsx("span", { "data-testid": "count", children: cart.length }), _jsx(Cart, {})] }));
}
function renderCart() {
    return render(_jsx(MemoryRouter, { children: _jsx(CartProvider, { children: _jsx(Harness, {}) }) }));
}
describe("Cart", () => {
    it("shows an empty state with a link to the catalogue", () => {
        renderCart();
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
        expect(screen.getByRole("link", { name: /start shopping/i })).toBeInTheDocument();
    });
    it("lists an added product with its price and line total", async () => {
        const user = userEvent.setup();
        renderCart();
        await user.click(screen.getByRole("button", { name: "Add one" }));
        expect(screen.getByText(PRODUCTS[0].name)).toBeInTheDocument();
        expect(screen.getByText(/in stock/i)).toBeInTheDocument();
        expect(screen.getByText("Estimated total")).toBeInTheDocument();
    });
    it("increases the quantity for an existing line", async () => {
        const user = userEvent.setup();
        renderCart();
        await user.click(screen.getByRole("button", { name: "Add one" }));
        await user.click(screen.getByRole("button", { name: "Add one" }));
        expect(screen.getByTestId("count")).toHaveTextContent("1");
        expect(screen.getByDisplayValue("2")).toBeInTheDocument();
    });
    it("removes a line from the cart", async () => {
        const user = userEvent.setup();
        renderCart();
        await user.click(screen.getByRole("button", { name: "Add one" }));
        await user.click(screen.getByRole("button", { name: "Remove" }));
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });
    it("persists the cart to local storage", async () => {
        const user = userEvent.setup();
        renderCart();
        await user.click(screen.getByRole("button", { name: "Add two" }));
        const stored = JSON.parse(window.localStorage.getItem("112-market-cart") ?? "[]");
        expect(stored).toHaveLength(1);
        expect(stored[0].productId).toBe(PRODUCTS[0].id);
        expect(stored[0].quantity).toBe(2);
        expect(stored[0].unitPrice).toBe(PRODUCTS[0].price);
    });
    it("never states that delivery is free when no delivery rule is configured", async () => {
        const user = userEvent.setup();
        renderCart();
        await user.click(screen.getByRole("button", { name: "Add one" }));
        expect(screen.getByText(/confirmed at checkout/i)).toBeInTheDocument();
        expect(screen.queryByText(/free on orders/i)).not.toBeInTheDocument();
    });
});
describe("Cart quantity controls", () => {
    it("clamps the quantity to the available stock", async () => {
        const user = userEvent.setup();
        function StockHarness() {
            const { addItem, updateQuantity } = useCartContext();
            const product = { ...PRODUCTS[0], stockQuantity: 1 };
            const [value, setValue] = useState(1);
            return (_jsxs("div", { children: [_jsx("button", { onClick: () => addItem(product, 1), children: "Add" }), _jsx("button", { onClick: () => updateQuantity(product.id, value + 1), children: "Increase" })] }));
        }
        render(_jsx(MemoryRouter, { children: _jsx(CartProvider, { children: _jsx(StockHarness, {}) }) }));
        await user.click(screen.getByRole("button", { name: "Add" }));
        await user.click(screen.getByRole("button", { name: "Increase" }));
        const stored = JSON.parse(window.localStorage.getItem("112-market-cart") ?? "[]");
        expect(stored[0].quantity).toBe(1);
    });
});
