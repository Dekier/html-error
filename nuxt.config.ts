export default defineNuxtConfig({
  devtools: { enabled: true },
  imports: {
    dirs: ["stores"],
  },
  modules: ["@tresjs/nuxt", "@nuxt/devtools"],
});
