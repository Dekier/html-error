// https://nuxt.com/docs/api/configuration/nuxt-config
import glsl from "vite-plugin-glsl";
export default defineNuxtConfig({
  devServer: {
    port: 4000,
  },
  imports: {
    dirs: ["stores"],
  },
  modules: [
    "@tresjs/nuxt",
    [
      "@pinia/nuxt",
      {
        autoImports: ["defineStore", "definePiniaStore"],
      },
    ],
    ,
    "@nuxtjs/device",
  ],

  css: ["@/assets/styles/main.scss", "@tresjs/leches/dist/style.css"],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
            '@import "@/assets/styles/variables.scss"; @import "@/assets/styles/mixins.scss";',
        },
      },
    },
    plugins: [glsl({ root: "/public/shaders/" })],
  },
});
