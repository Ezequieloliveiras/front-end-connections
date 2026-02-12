// next.config.js
const path = require("path")

/** @type {import('next').NextConfig} */
module.exports = {
  compiler: { styledComponents: true },

  // Ajuda em setups tipo "workspace com vários projetos"
  outputFileTracingRoot: path.join(__dirname),

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: "http://localhost:4000/api/:path*",
      },
    ]
  },
}
