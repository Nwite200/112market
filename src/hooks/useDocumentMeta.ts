import { useEffect } from "react"

export const SITE = {
  name: "112 Market",
  title:
    "112 Market — Fairly used household items, sourced in the UK and delivered in Nigeria",
  description:
    "Shop graded furniture, kitchen appliances, electronics and tools sourced from UK households. Every item is graded A–C, described in detail and dispatched from our Lagos depot.",
}

export interface PageMeta {
  /** Page title. The store name is appended automatically. */
  title?: string
  description?: string
  /** Absolute or root-relative canonical URL. */
  canonical?: string
  image?: string
  type?: string
}

const setMetaTag = (attr: "name" | "property", key: string, content: string) => {
  let tag = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`)
  if (!tag) {
    tag = document.createElement("meta")
    tag.setAttribute(attr, key)
    document.head.appendChild(tag)
  }
  tag.setAttribute("content", content)
}

const setCanonical = (href: string) => {
  let link = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!link) {
    link = document.createElement("link")
    link.setAttribute("rel", "canonical")
    document.head.appendChild(link)
  }
  link.setAttribute("href", href)
}

/**
 * Sets the document title, meta description, Open Graph tags and canonical
 * URL for the current page. Every route calls this with its own content so
 * titles never leak between pages.
 */
export function useDocumentMeta(meta: PageMeta = {}) {
  const { title, description, canonical, image, type } = meta

  useEffect(() => {
    const fullTitle = title ? `${title} | ${SITE.name}` : SITE.title
    const pageDescription = description ?? SITE.description
    const url = canonical ?? `${window.location.origin}${window.location.pathname}`

    document.title = fullTitle

    setMetaTag("name", "description", pageDescription)
    setMetaTag("name", "robots", "index,follow")
    setMetaTag("property", "og:site_name", SITE.name)
    setMetaTag("property", "og:title", fullTitle)
    setMetaTag("property", "og:description", pageDescription)
    setMetaTag("property", "og:url", url)
    setMetaTag("property", "og:type", type ?? "website")
    setMetaTag("name", "twitter:card", "summary_large_image")
    if (image) {
      setMetaTag("property", "og:image", image)
      setMetaTag("name", "twitter:image", image)
    }

    setCanonical(url)
  }, [title, description, canonical, image, type])
}

export default useDocumentMeta
