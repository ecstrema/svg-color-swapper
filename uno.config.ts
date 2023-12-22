// uno.config.ts
import {
  defineConfig,
  presetIcons,
  presetUno,
  presetTypography,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno({ dark: "media" }),
    presetIcons(),
    presetTypography(),
  ],
})
