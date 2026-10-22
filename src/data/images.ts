/**
 * Image helpers.
 *
 * Catalogue images are stored as single Unsplash URLs. The helpers here let the
 * UI request a different width for the same asset (for `srcset`) without
 * duplicating URLs across the data files.
 */

/** Build a catalogue image URL from an Unsplash photo id. */
export const img = (id: string, width = 900, quality = 70): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=${quality}`

/** Re-point an existing image URL at a different width. */
export const imageUrl = (url: string, width: number): string =>
  url.replace(/([?&]w=)\d+/, `$1${width}`)

/** Build a `srcset` for an image URL. */
export const imageSrcSet = (url: string, widths: number[] = [320, 640, 960, 1280]): string =>
  widths.map((w) => `${imageUrl(url, w)} ${w}w`).join(", ")
