/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['images.unsplash.com'],
      },
      // Configuração corrigida para workstations:
      allowedDevOrigins: [
        'https://*.cloudworkstations.dev',
        'https://*.cluster-*.cloudworkstations.dev'
      ]
};

export default nextConfig;
