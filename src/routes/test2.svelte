<script lang="ts">
    import Color from "color";

    import { recursively } from "$lib/recursively";
    import Colorpick from '$lib/colorpick.svelte';

    let svgHeight = 60;
    let svgWrapper: HTMLDivElement;

    type ColorTargets = { filled: HTMLElement[], stroked: HTMLElement[] };
    let colorData: Map<string, ColorTargets> = new Map();

    let selectedColorIndex: number = 0;
    $: allColors = Array.from(colorData.keys());
    $: selectedColor = allColors[selectedColorIndex];

    $: if (svgWrapper) svgWrapper.setAttribute("style", "height: " + svgHeight + "vh");

    function onFileChange(ev: Event) {
        const target = ev.target as HTMLInputElement;
        const files = target.files;
        const file = files[0];
        const reader = new FileReader();
        reader.onload = (e) => {
            if (typeof e.target.result !== "string") {
                console.error("Error reading file");
                return;
            }

            const svgText = e.target.result;
            svgWrapper.innerHTML = svgText;

            function getColors(node: HTMLElement) {
                const fill = node.style.fill;
                const stroke = node.style.stroke;
                if (fill) {
                    const color = Color(fill);
                    const hex = color.hex();
                    if (colorData.has(hex)) {
                        colorData.get(hex).filled.push(node);
                    }
                    else {
                        colorData.set(hex, { filled: [node], stroked: [] });
                    }
                }
                if (stroke) {
                    const color = Color(stroke);
                    const hex = color.hex();
                    if (colorData.has(hex)) {
                        colorData.get(hex).stroked.push(node);
                    }
                    else {
                        colorData.set(hex, { filled: [], stroked: [node] });
                    }
                }
            }

            recursively(svgWrapper, getColors)
            colorData = colorData;
            console.log(colorData);
        }
        reader.readAsText(file);
    }
</script>

<Colorpick/>

<input type="file" accept=".svg" on:change="{onFileChange}" />

<div class="controls">
    <div style="display: flex; flex-direction: column; align-items: center; text-align: center; flex-grow: 2; margin: 12px; justify-content: center; max-height: 300px; overflow: auto;">
        {#each allColors as color, index (color)}
        <button class="colorButton"
             style='background-color: {color}; {index === selectedColorIndex ? "border: 2px solid black;" : "padding: 2px;"}'
             on:click="{(() => selectedColorIndex = index)}"></button>
        {:else}
        <p style="margin: 24px">
            No color found in your svg element
        </p>
        {/each}
    </div>
    // @ts-ignore
    <input type="range" orient="vertical" bind:value={svgHeight}/>
</div>

<div bind:this={svgWrapper} class="svgWrapper">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-52 -53 100 100" stroke-width="2"><g fill="none"><ellipse stroke="#66899a" rx="6" ry="44"/><ellipse stroke="#e1d85d" rx="6" ry="44" transform="rotate(-66)"/><ellipse stroke="#80a3cf" rx="6" ry="44" transform="rotate(66)"/><circle stroke="#4b541f" r="44"/></g><g fill="#66899a" stroke="white"><circle fill="#80a3cf" r="13"/><circle cy="-44" r="9"/><circle cx="-40" cy="18" r="9"/><circle cx="40" cy="18" r="9"/></g></svg>
</div>

<style>
    .controls {
        display: flex; justify-content: space-around;
    }
    .colorButton {
        height: 20px; width: 100%;
        height: 30px;
        max-height: 30px;
        min-height: 30px;
        box-sizing: border-box;
        margin-top: 4px;
        cursor: pointer;
    }
    input[type=range][orient=vertical] {
        writing-mode: bt-lr; /* IE */
        -webkit-appearance: slider-vertical; /* WebKit */
    }
    .svgWrapper {
        text-align: center;
    }
    :global(svg) {
        height: 100%;
        width: auto;
    }
</style>
