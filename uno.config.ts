// uno.config.ts
// @eslint-disable
import { defineConfig, presetIcons, presetUno, presetTypography } from 'unocss'

export default defineConfig({
  presets: [presetUno({ dark: 'media' }), presetIcons(), presetTypography()],
})
