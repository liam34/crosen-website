// The Lovable wrapper supplies the app plugins and build setup. Replace its
// deprecated tsconfig-paths plugin with Vite's native resolver.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import type { ConfigEnv, PluginOption, UserConfig } from "vite";

function removeLegacyTsconfigPathsPlugin(plugin: PluginOption): PluginOption {
  if (Array.isArray(plugin)) {
    return plugin.map(removeLegacyTsconfigPathsPlugin);
  }

  if (plugin && typeof plugin === "object" && "then" in plugin) {
    return Promise.resolve(plugin).then(removeLegacyTsconfigPathsPlugin);
  }

  if (plugin && typeof plugin === "object" && plugin.name === "vite-tsconfig-paths") {
    return false;
  }

  return plugin;
}

const lovableConfig = defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
  },
});

export default async (env: ConfigEnv): Promise<UserConfig> => {
  const config = await lovableConfig(env);

  return {
    ...config,
    plugins: config.plugins?.map(removeLegacyTsconfigPathsPlugin),
    resolve: {
      ...config.resolve,
      tsconfigPaths: true,
    },
  };
};
