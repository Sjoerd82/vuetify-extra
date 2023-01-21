import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import typeScript2 from "rollup-plugin-typescript2"
import { visualizer } from "rollup-plugin-visualizer"

// Utilities
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { resolve, dirname } from 'node:path'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({
      styles: { configFile: 'src/components/style.css' }
    }),
    typeScript2({
      check: false,
      include: ["src/components/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        }
      },
      exclude: [
        "vite.config.ts"
      ]
    }),
    visualizer() as PluginOption
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    cssCodeSplit: true, // default
    lib: {
      entry: './src/components/index.ts',
      formats: ["es", "cjs"],
      name: "CommonVtfyPlugin",
      fileName: format => (format == "es" ? "index.js" : "index.cjs"),
    },
    rollupOptions: {
      external: ["vue", "vuetify", "vuetify/lib", 'vuetify/lib/util/colors.mjs', "vuetify/styles"],
      output: {
        //exports: 'named',
        globals: {
          vue: "Vue",
          vuetify: "Vuetify",
          'vuetify/components': "VuetifyComponents",
          'vuetify/directives': "VuetifyDirectives",
          'vuetify/lib/util/colors.mjs': 'colors'
        }
      }
    }
  }
})
/*
import { defineConfig, type UserConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vuetify from 'vite-plugin-vuetify';
import typeScript2 from "rollup-plugin-typescript2"
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig(async ({ command }): Promise<UserConfig> => {
  const config: UserConfig = {
    resolve: {
      // https://vitejs.dev/config/shared-options.html#resolve-alias
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
        '~': fileURLToPath(new URL('./node_modules', import.meta.url)),
      },
      // External
      dedupe: ['vue', 'vuetify'],
    },
    // https://vitejs.dev/config/#server-options
    server: {
      fs: {
        // Allow serving files from one level up to the project root
        allow: ['..'],
      },
    },
    plugins: [
      // Vue3
      vue(),
      // Vuetify Loader
      // https://github.com/vuetifyjs/vuetify-loader
      vuetify({
        autoImport: true,
        // styles: 'sass',
      }),
      typeScript2({
        check: false,
        include: ["src/components/*.vue"],
        tsconfigOverride: {
          compilerOptions: {
            sourceMap: true,
            declaration: true,
            declarationMap: true,
          }
        },
        exclude: [
          "vite.config.ts"
        ]
      })
    ],
    optimizeDeps: {
      exclude: ['vue', 'vuetify'],
    },
    // Build Options
    // https://vitejs.dev/config/#build-options
    build: {
      lib: {
        entry: "./src/CommonVtfyPlugin.ts",
        formats: ["es", "cjs"],
        name: "CommonVtfyPlugin",
        fileName: format => (format == "es" ? "index.js" : "index.cjs"),
      },
      rollupOptions: {
        external: ['vue', 'vuetify/lib', 'vuetify/lib/util/colors.mjs'],
        output: {
          exports: 'named',
          globals: {
            vue: 'Vue',
            vuetify: 'Vuetify',
            'vuetify/components': 'VuetifyComponents',
            'vuetify/directives': 'VuetifyDirectives',
            'vuetify/lib/util/colors.mjs': 'colors',
          },
        },
      },
      target: 'esnext',
      minify: false,
    },
    esbuild: {
      drop: command === 'serve' ? [] : ['console'],
    },
  };
  // Export vite config
  return config;
});
*/