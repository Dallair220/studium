/** @type {import('next').NextConfig} */
const nextConfig = {
  // output: 'export',
  distDir: './dist', // Changes the build output directory to `./dist/`.
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ddragon.leagueoflegends.com',
        port: '',
        pathname: '/cdn/14.13.1/img/profileicon/**',
      },
    ],
  },
};

export default nextConfig;
