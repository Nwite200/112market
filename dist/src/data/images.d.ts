/**
 * Image helpers.
 *
 * Catalogue images are stored as single Unsplash URLs. The helpers here let the
 * UI request a different width for the same asset (for `srcset`) without
 * duplicating URLs across the data files.
 */
/** Build a catalogue image URL from an Unsplash photo id. */
export declare const img: (id: string, width?: number, quality?: number) => string;
/** Re-point an existing image URL at a different width. */
export declare const imageUrl: (url: string, width: number) => string;
/** Build a `srcset` for an image URL. */
export declare const imageSrcSet: (url: string, widths?: number[]) => string;
