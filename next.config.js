/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental : {
        appDir : true,
    },
    images : {
        domains : ["static.vecteezy.com",
        "aiimagegenerator2d432ca.blob.core.windows.net"
    ],
    }
}

module.exports = nextConfig
