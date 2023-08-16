/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        serverActions: true,
        serverComponentsExternalPackages: ["mongoose"],
      },
      eslint: {
        // Warning: This allows production builds to successfully complete even if
        // your project has ESLint errors.
        ignoreDuringBuilds: true,
      },

    images: {
        domains: [
            "avatars.githubusercontent.com", "lh3.googleusercontent.com", "res.cloudinary.com"
        ],
        remotePatterns: [
            {
              protocol: "https",
              hostname: "img.clerk.com",
            },
            {
              protocol: "https",
              hostname: "images.clerk.dev",
            },
            {
              protocol: "https",
              hostname: "uploadthing.com",
            },
            {
              protocol: "https",
              hostname: "placehold.co",
            },
          ],
    }
}

module.exports = nextConfig



