// eslint.config.mjs — monorepo root
import storybook from "eslint-plugin-storybook"
import tseslint from "typescript-eslint"
import { defineConfig, globalIgnores } from "eslint/config"
import nextVitals from "eslint-config-next/core-web-vitals"
import nextTs from "eslint-config-next/typescript"

export default defineConfig([

  // ── Global ignores ─────────────────────────────────────────
  globalIgnores([
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/.turbo/**",
    "next-lab/.next/**",
    "next-lab/next-env.d.ts",
    "express-lab/__tests__/**",
  ]),

  // ── Shared rules (all packages) ────────────────────────────
  {
    rules: {
      "eol-last": ["error", "always"],
      "semi": ["error", "never"],
    },
  },

  // ── Backend — type-aware TypeScript ────────────────────────
  ...tseslint.configs.recommendedTypeChecked.map(config => ({
    ...config,
    files: ["express-lab/**/*.ts"],
  })),
  {
    files: ["express-lab/**/*.ts"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // ── Frontend — Next.js ─────────────────────────────────────
  ...nextVitals.map(config => ({ ...config, files: ["next-lab/**/*.{ts,tsx}"] })),
  ...nextTs.map(config =>   ({ ...config, files: ["next-lab/**/*.{ts,tsx}"] })),

  // ── Frontend — Storybook ───────────────────────────────────
  ...storybook.configs["flat/recommended"].map(config => ({
    ...config,
    files: ["next-lab/**/*.stories.{ts,tsx}", "next-lab/.storybook/**"],
  })),

])
