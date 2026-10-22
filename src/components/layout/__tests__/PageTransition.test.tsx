import { afterEach, describe, expect, it, vi } from "vitest"
import { render, screen, act } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { MemoryRouter, Link, Route, Routes, useNavigate } from "react-router-dom"
import PageTransition from "../PageTransition"

function Shell() {
  const navigate = useNavigate()
  return (
    <div>
      <nav>
        <Link to="/category/furniture">Furniture</Link>
        <Link to="/product/sofa?ref=nav">Sofa</Link>
        <Link to="/products?sort=newest">Newest</Link>
        <Link to="/products?sort=popularity">Popular</Link>
        <button onClick={() => navigate("/cart")}>Programmatic cart</button>
      </nav>
      <PageTransition>
        <Routes>
          <Route path="*" element={<p data-testid="page">page</p>} />
        </Routes>
      </PageTransition>
    </div>
  )
}

function wrapper() {
  return document.querySelector("[data-route-transition]") as HTMLElement
}

function mockReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockImplementation((query: string) => ({
      matches: matches && query.includes("prefers-reduced-motion"),
      media: query,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }))
  )
}

afterEach(() => vi.unstubAllGlobals())

describe("PageTransition", () => {
  it("does not animate the first page (the logo intro owns first load)", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Shell />
      </MemoryRouter>
    )
    expect(wrapper()).toHaveAttribute("data-route-transition", "idle")
    expect(wrapper()).not.toHaveClass("animate-route-fade")
  })

  it("fades in a new element when a link goes to a different page", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Shell />
      </MemoryRouter>
    )
    const before = wrapper()
    await user.click(screen.getByRole("link", { name: "Furniture" }))

    expect(wrapper()).not.toBe(before) // remounted, so the CSS animation restarts
    expect(wrapper()).toHaveAttribute("data-route-transition", "animating")
    expect(wrapper()).toHaveClass("animate-route-fade")
  })

  it("animates programmatic navigate() the same way", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Shell />
      </MemoryRouter>
    )
    const before = wrapper()
    await user.click(screen.getByRole("button", { name: "Programmatic cart" }))
    expect(wrapper()).not.toBe(before)
    expect(wrapper()).toHaveClass("animate-route-fade")
  })

  it("animates again on every later navigation, including back to the first page", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Shell />
      </MemoryRouter>
    )
    await user.click(screen.getByRole("link", { name: "Furniture" }))
    const furniture = wrapper()
    await user.click(screen.getByRole("link", { name: "Sofa" }))
    expect(wrapper()).not.toBe(furniture)
    expect(wrapper()).toHaveClass("animate-route-fade")
  })

  it("does not remount or replay when only the query string changes", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={["/products?sort=newest"]}>
        <Shell />
      </MemoryRouter>
    )
    const before = wrapper()
    await user.click(screen.getByRole("link", { name: "Popular" }))
    expect(wrapper()).toBe(before)
    expect(wrapper()).toHaveAttribute("data-route-transition", "idle")
  })

  it("does not replay when the current page is clicked again", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={["/category/furniture"]}>
        <Shell />
      </MemoryRouter>
    )
    const before = wrapper()
    await user.click(screen.getByRole("link", { name: "Furniture" }))
    expect(wrapper()).toBe(before)
  })

  it("keeps re-renders (such as cart updates) from replaying the animation", async () => {
    const user = userEvent.setup()
    const { rerender } = render(
      <MemoryRouter initialEntries={["/"]}>
        <Shell />
      </MemoryRouter>
    )
    await user.click(screen.getByRole("link", { name: "Furniture" }))
    const after = wrapper()
    rerender(
      <MemoryRouter initialEntries={["/"]}>
        <Shell />
      </MemoryRouter>
    )
    expect(wrapper()).toBe(after)
  })

  it("applies no animation class when the visitor prefers reduced motion", async () => {
    mockReducedMotion(true)
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Shell />
      </MemoryRouter>
    )
    await user.click(screen.getByRole("link", { name: "Furniture" }))
    expect(wrapper()).toHaveAttribute("data-route-transition", "idle")
    expect(wrapper()).not.toHaveClass("animate-route-fade")
    expect(screen.getByTestId("page")).toBeInTheDocument() // content still renders immediately
  })

  it("lets a caller choose a custom key", async () => {
    const user = userEvent.setup()
    render(
      <MemoryRouter initialEntries={["/"]}>
        <PageTransition transitionKey="fixed">
          <Routes>
            <Route path="*" element={<Link to="/other">go</Link>} />
          </Routes>
        </PageTransition>
      </MemoryRouter>
    )
    const before = wrapper()
    await act(async () => {
      await user.click(screen.getByRole("link", { name: "go" }))
    })
    expect(wrapper()).toBe(before)
  })
})
