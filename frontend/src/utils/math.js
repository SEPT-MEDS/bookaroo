// Function to clamp a value between min and max
export const clamp = (v, min, max) =>
  Math.min(Math.max(v, min), max)
