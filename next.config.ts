import type { NextConfig } from "next";
import NextFederationPlugin from "@module-federation/nextjs-mf";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  transpilePackages: ["@dasjideepak/mf-shared-ui"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dummyjson.com",
      },
    ],
  },

  webpack(config, { isServer }) {
    const location = isServer ? "ssr" : "chunks";

    config.plugins.push(
      new NextFederationPlugin({
        name: "host",
        filename: "static/chunks/remoteEntry.js",
        remotes: {
          remote1: `remote1@${process.env.REMOTE1_URL}/_next/static/${location}/remoteEntry.js`,
          remote2: `remote2@${process.env.REMOTE2_URL}/_next/static/${location}/remoteEntry.js`,
        },
        exposes: isServer
          ? {}
          : {
              "./GlobalContext": "./src/context/GlobalContext",
            },
        shared: isServer
          ? {}
          : {
              react: {
                singleton: true,
                eager: true,
                requiredVersion: false,
                strictVersion: false,
              },
              "react-dom": {
                singleton: true,
                eager: true,
                requiredVersion: false,
                strictVersion: false,
              },
            },
        extraOptions: {},
      }),
    );

    return config;
  },
};

export default nextConfig;
