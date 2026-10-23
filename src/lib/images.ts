/** Builds a cropped, compressed Unsplash URL from a photo id. Placeholder images only. */
export const unsplash = (id: string, width = 1200) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`;
