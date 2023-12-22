<template>
  <div class="m-0 p-5 flex items-center flex-col h-[100vh]">
    <h1 class="text-2xl">SVG Color Swapper</h1>
    <p class="text-gray-500 dark:text-gray-300">
      A simple tool to change the color of SVGs
    </p>
    <div class="flex flex-grow justify-between gap-4">
      <div>
        <input
          type="file"
          accept="image/svg+xml"
          class="mt-5 w-full rounded-md bg-gray-100 dark:bg-blue-500 p-2 text-center"
          @change="fileChanged"
        />
        <!-- Swatches -->
        <div
          class="grid gap-1 mt-5 grid-flow-col place-items-center"
          :style="{
            gridTemplateRows:
              'repeat(' + (Object.keys(colorData).length + 1) + ', 1fr)',
          }"
        >
          <div class="text-center text-bold text-lg">Original</div>
          <div
            v-for="(color, key) in colorData"
            :key="key + 'original'"
            class="rounded-sm h-full w-full"
            :style="{ backgroundColor: color.originalColor || 'transparent' }"
          ></div>
          <div class="text-center text-bold text-lg">New Stroke</div>
          <div v-for="(color, index) in colorData" :key="index + 'stroke'">
            <input
              v-if="color.stroked.length > 0"
              v-model="color.newStrokeColor"
              type="color"
              @input="() => updateStroke(color)"
            />
          </div>
          <div class="text-center text-bold text-lg">New Fill</div>
          <div v-for="(color, index) in colorData" :key="index + 'fill'">
            <input
              v-if="color.filled.length > 0"
              v-model="color.newFillColor"
              type="color"
              @input="() => updateFill(color)"
            />
          </div>
        </div>
        <button
          class="mt-5 py-2 w-full rounded-md bg-blue-500 text-center"
          @click="download"
        >
          Download
        </button>
      </div>
      <div ref="svg" class="h-full grow">
        <!-- Starting SVG -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="-60 -60 120 120"
          stroke-width="2"
        >
          <g fill="none">
            <ellipse stroke="#66899a" rx="6" ry="44" />
            <ellipse stroke="#e1d85d" rx="6" ry="44" transform="rotate(-66)" />
            <ellipse stroke="#80a3cf" rx="6" ry="44" transform="rotate(66)" />
            <circle stroke="#4b541f" r="44" />
          </g>
          <g fill="#66899a" stroke="white">
            <circle fill="#80a3cf" r="13" />
            <circle cy="-44" r="9" />
            <circle cx="-40" cy="18" r="9" />
            <circle cx="40" cy="18" r="9" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Color from 'color'
import { ColorInfo } from '~/types'

const svg = ref<HTMLInputElement | null>(null)
const colorData = ref<ColorInfo[]>([])

onMounted(updateColors)

function updateStroke(color: ColorInfo) {
  for (const node of color.stroked) {
    node.style.stroke = color.newStrokeColor
  }
}

function updateFill(color: ColorInfo) {
  for (const node of color.filled) {
    node.style.fill = color.newFillColor
  }
}

function recursively(node: HTMLElement, callback: (node: HTMLElement) => void) {
  callback(node)
  if (node.children.length > 0) {
    for (const child of Array.from(node.children)) {
      recursively(child as HTMLElement, callback)
    }
  }
}

function updateColors() {
  if (!svg.value) return
  colorData.value = []
  const colors: { [id: string]: ColorInfo } = {}

  recursively(svg.value, getColors)

  for (const key in colors) {
    colorData.value.push(colors[key])
  }

  function getColors(node: HTMLElement) {
    let fill = node.style.fill
    if (fill === '') {
      fill = node.getAttribute('fill') || ''
    }
    if (fill && fill !== 'none' && fill !== '') {
      try {
        const color = Color(fill)
        const hex = color.hex().toUpperCase()
        if (colors[hex]) {
          colors[hex].filled.push(node)
        } else {
          colors[hex] = {
            filled: [node],
            stroked: [],
            originalColor: hex,
            newFillColor: hex,
            newStrokeColor: hex,
          }
        }
      } catch (e) {
        console.log(
          fill +
            ' is not a valid color. It will be ignored. Note that gradients are not supported.'
        )
      }
    }
    let stroke = node.style.stroke
    if (stroke === '') {
      stroke = node.getAttribute('stroke') || ''
    }
    if (stroke && stroke !== 'none' && stroke !== '') {
      try {
        const color = Color(stroke)
        const hex = color.hex().toUpperCase()
        if (colors[hex]) {
          colors[hex].stroked.push(node)
        } else {
          colors[hex] = {
            filled: [],
            stroked: [node],
            originalColor: hex,
            newFillColor: hex,
            newStrokeColor: hex,
          }
        }
      } catch (e) {
        console.log(
          stroke +
            ' is not a valid color. It will be ignored. Note that gradients are not supported.'
        )
      }
    }
  }
}

function fileChanged(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (e) => {
    if (!svg.value) return
    if (!e.target || typeof e.target.result !== 'string') {
      alert('Something went wrong.')
      return
    }
    svg.value.innerHTML = e.target.result
    updateColors()
  }
  reader.onerror = () => {
    alert('Something went wrong.')
  }
  reader.readAsText(file)
}

function download() {
  if (!svg.value) return
  const svgData = svg.value.outerHTML
  const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' })
  const svgUrl = URL.createObjectURL(svgBlob)
  const downloadLink = document.createElement('a')
  downloadLink.href = svgUrl
  downloadLink.download = 'recolored.svg'
  document.body.appendChild(downloadLink)
  downloadLink.click()
  document.body.removeChild(downloadLink)
}
</script>

<style>
svg {
  width: 100%;
  height: 100%;
}
</style>
