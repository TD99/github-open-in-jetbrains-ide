const HEX_PATTERN = /^#([0-9a-fA-F]{3}){1,2}$/;

/**
 * Convert a hex color string (#rgb or #rrggbb) to RGB components.
 * @param {string} hex
 * @returns {{r: number, g: number, b: number}}
 */
function hexToRgb(hex) {
  let c = hex.slice(1);
  if (c.length === 3) {
    c = c.split("").map((ch) => ch + ch).join("");
  }
  const num = parseInt(c, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

/**
 * Calculate relative luminance using the WCAG formula.
 * @param {{r: number, g: number, b: number}} rgb
 * @returns {number}
 */
function luminance({r, g, b}) {
  const transform = (v) =>
    (v /= 255) <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  return 0.2126 * transform(r) + 0.7152 * transform(g) + 0.0722 * transform(b);
}

/**
 * Apply the background color and adjust text color for contrast.
 * @param {string} hex
 */
function applyColor(hex) {
  document.body.style.backgroundColor = hex;

  const rgb = hexToRgb(hex);
  const textColor = luminance(rgb) > 0.5 ? "#000000" : "#ffffff";

  document.body.style.color = textColor;
  document.querySelectorAll("a[href]").forEach((link) => {
    link.style.color = textColor;
    link.style.textDecoration = "underline";
  });
}

/**
 * Check if a string is a valid hex color.
 * @param {string} value
 * @returns {boolean}
 */
function isValidHex(value) {
  return HEX_PATTERN.test(value);
}
