// postcss.config.js or postcss.config.mjs
export default {
  plugins: {
    "@tailwindcss/postcss": {},
    // You can keep autoprefixer if you still want it, but in v4 it's optional:
    autoprefixer: {},
  },
};
