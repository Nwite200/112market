import { StrictMode } from "react"
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest"
import { act, render } from "@testing-library/react"
import LogoIntro from "../LogoIntro"

const KEY = "112-market-intro-seen"
const intro = () => document.querySelector<HTMLElement>("[data-brand-intro]")

/** Let the logo "decode" (a resolved promise in jsdom) so the sequence starts. */
async function start() {
  await act(async () => {
    await Promise.resolve()
  })
}

beforeEach(() => vi.useFakeTimers())
afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

describe("LogoIntro", () => {
  it("is on screen in the very first render of a new session (no flash of the page)", () => {
    render(<LogoIntro />)
    expect(intro()).toBeInTheDocument()
  })

  it("runs the 600ms fade in, 500ms hold, 700ms fade out sequence (1800ms)", async () => {
    render(<LogoIntro />)
    await start()
    expect(intro()).toHaveAttribute("data-state", "playing")

    const logo = intro()!.firstElementChild as HTMLElement
    expect(logo.style.animation).toContain("brand-intro-in 600ms")
    // overlay: 700ms fade that begins after 600 + 500 = 1100ms
    expect(intro()!.style.animation).toContain("brand-intro-out 700ms")
    expect(intro()!.style.animation).toContain("1100ms")
  })

  it("unmounts itself and records that it was seen", async () => {
    render(<LogoIntro />)
    await start()
    act(() => vi.advanceTimersByTime(1800 + 200))
    expect(intro()).not.toBeInTheDocument()
    expect(window.sessionStorage.getItem(KEY)).toBe("1")
  })

  it("starts anyway if the logo takes too long to decode", () => {
    vi.stubGlobal(
      "Image",
      class {
        src = ""
        decode() {
          return new Promise(() => {}) // never resolves
        }
      }
    )
    render(<LogoIntro />)
    expect(intro()).toHaveAttribute("data-state", "loading")
    act(() => vi.advanceTimersByTime(300))
    expect(intro()).toHaveAttribute("data-state", "playing")
  })

  it("never blocks clicks, before, during or after", async () => {
    render(<LogoIntro />)
    expect(intro()).toHaveClass("pointer-events-none")
    await start()
    expect(intro()).toHaveClass("pointer-events-none")
    act(() => vi.advanceTimersByTime(2000))
    expect(intro()).not.toBeInTheDocument()
  })

  it("does not show again in the same session", () => {
    window.sessionStorage.setItem(KEY, "1")
    render(<LogoIntro />)
    expect(intro()).not.toBeInTheDocument()
  })

  it("is not left stuck on screen by React StrictMode's double effect run", async () => {
    render(
      <StrictMode>
        <LogoIntro />
      </StrictMode>
    )
    expect(intro()).toBeInTheDocument()
    await start()
    act(() => vi.advanceTimersByTime(2000))
    expect(intro()).not.toBeInTheDocument()
  })

  it("is skipped for visitors who prefer reduced motion", () => {
    vi.stubGlobal(
      "matchMedia",
      vi.fn().mockImplementation((query: string) => ({
        matches: query.includes("prefers-reduced-motion"),
        media: query,
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
      }))
    )
    render(<LogoIntro />)
    expect(intro()).not.toBeInTheDocument()
  })
})
