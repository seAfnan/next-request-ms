/** @type {import('next').NextConfig} */
const nextConfig = {};

// If login user avatar don't work then change Referrer Policy of this avatar Google api call
// const nextConfig = {
//   async headers() {
//     return [
//       {
//         source: "/:path*",
//         headers: [{ key: "referrer-policy", value: "no-referrer" }],
//       },
//     ];
//   },
// };

module.exports = nextConfig;
