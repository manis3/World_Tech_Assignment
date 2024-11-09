/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/blog',
                has: [
                    {
                        type: 'query',
                        key: 'id',
                    },
                ],
                destination: '/blog/:id',
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
