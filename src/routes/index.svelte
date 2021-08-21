<script lang="ts">
    import { onMount } from "svelte";
    import Color from "color";

    import { recursively } from "$lib/recursively";
    import Colorpick from '$lib/colorpick.svelte';

    let svgHeight = 60;
    let svgWrapper: HTMLDivElement;

    let modifyStrokes = true;
    let modifyFills = true;

    type ColorTargets = { filled: HTMLElement[], stroked: HTMLElement[] };
    type ColorData = { [key: string]: ColorTargets };
    let colorData: ColorData = {};

    let currentColor: string = "#000";

    $: allColors = Array.from(Object.keys(colorData));

    $: allModifiedColors = Array.from(allColors);

    $: if (svgWrapper) svgWrapper.setAttribute("style", "height: " + svgHeight + "vh");

    function getColors(node: HTMLElement) {
        let fill = node.style.fill;
        if (fill === "") {
            fill = node.getAttribute("fill");
        }
        if (fill && fill !== "none" && fill !== "") {
            const color = Color(fill);
            const hex = color.hex().toUpperCase();
            if (colorData.hasOwnProperty(hex)) {
                colorData[hex].filled.push(node);
            }
            else {
                colorData[hex] = { filled: [node], stroked: [] };
            }
        }
        let stroke = node.style.stroke;
        if (stroke === "") {
            stroke = node.getAttribute("stroke");
        }
        if (stroke && stroke !== "none" && stroke !== "") {
            const color = Color(stroke);
            const hex = color.hex().toUpperCase();
            if (colorData.hasOwnProperty(hex)) {
                colorData[hex].stroked.push(node);
            }
            else {
                colorData[hex] = { filled: [], stroked: [node] };
            }
        }
    }

    function updateColors() {
        recursively(svgWrapper, getColors);
        colorData = colorData;
        currentColor = Array.from(Object.keys(colorData))[0];
    }


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

            // reset color data
            colorData = {};

            updateColors();
        }
        reader.readAsText(file);
    }

    /**
    * Sets all of the svg elements with initialColor to the new color.
    *
    * The model doesn't update to the new color, so that no confusion is possible
    * between the modified colors.
    */
    function colorChanged(initialColor: string, newColor: string) {
        // Happens on init.
        if (!initialColor || !newColor) return;

        initialColor = initialColor.toUpperCase();
        newColor = newColor.toUpperCase();

        if (!colorData.hasOwnProperty(initialColor)) return;

        if (modifyFills) {
            const filled = colorData[initialColor].filled;
            for (const f of filled) {
                //https://stackoverflow.com/a/2028029/9329985
                f.style.fill = "";
                f.setAttribute("fill", newColor);
            }
        }

        if (modifyStrokes) {
            const stroked = colorData[initialColor].stroked;
            for (const s of stroked) {
                //https://stackoverflow.com/a/2028029/9329985
                s.style.stroke = "";
                s.setAttribute("stroke", newColor);
            }
        }

        const i = allColors.indexOf(initialColor);
        if (i !== -1) allModifiedColors[i] = newColor;
    }

    function download() {
        const svg = svgWrapper.outerHTML;
        const blob = new Blob([svg], { type: "image/svg+xml" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "recolored.svg";
        a.click();
    }

    onMount(updateColors)
</script>

<div class="container">
    <div class="leftSide">
        <h2>Controls</h2>
        <div class="controls">
            <div class="leftControls">
                <input type="file" accept=".svg" on:change="{onFileChange}" />
                <div>
                    <input id='modifyStrokes' type='checkbox' bind:checked={modifyStrokes}/>
                    <label for='modifyStrokes'>Modify Strokes</label>
                </div>
                <div>
                    <input id='modifyFills' type='checkbox' bind:checked={modifyFills}/>
                    <label for='modifyFills'>Modify Fills</label>
                </div>
                {#if !modifyFills && !modifyStrokes}
                <p style="color: red;">Nothing will be modified, since neither the strokes nor the fills will be.</p>
                {/if}
                <button on:click={download}>Download Result</button>
            </div>
            <div class="rightControls">
                <input id="svgHeight" type="range" orient="vertical" bind:value={svgHeight}/>
                <label for='svgHeight'>SVG Height</label>
            </div>
        </div>
        <h2>Color Picker</h2>
        <div class="colorPicker">
            <Colorpick color="{currentColor}" on:change={(ev) => colorChanged(currentColor, ev.detail.color)}/>
        </div>
    </div>
    <div class="rightSide">
        <h2>Swatches</h2>
        <div class="swatches">
            {#each allModifiedColors as color, index (color)}
            <button
                class="swatch"
                on:click="{() => currentColor = color}"
                class:selectedSwatch="{currentColor === color}"
                >
                <div class="swatchPart" style="background: {allColors[index]};"/>
                <div class="swatchPart" style="background: {color};"/>
            </button>
            {:else}
            <p style="margin: 24px">
                No color found in your svg element
            </p>
            {/each}
        </div>
        <h2>SVG</h2>
        <div bind:this={svgWrapper} class="svgWrapper">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="-52 -53 100 100" stroke-width="2"><g fill="none"><ellipse stroke="#66899a" rx="6" ry="44"/><ellipse stroke="#e1d85d" rx="6" ry="44" transform="rotate(-66)"/><ellipse stroke="#80a3cf" rx="6" ry="44" transform="rotate(66)"/><circle stroke="#4b541f" r="44"/></g><g fill="#66899a" stroke="white"><circle fill="#80a3cf" r="13"/><circle cy="-44" r="9"/><circle cx="-40" cy="18" r="9"/><circle cx="40" cy="18" r="9"/></g></svg>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        height: 100vh;
    }
    .leftSide {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .controls {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .leftControls {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        align-items: flex-start;
    }
    .rightControls {
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .colorPicker {
        flex-grow: 1;
    }
    .rightSide {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
    }
    .swatches {
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
    }
    .swatch {
        width: 24px;
        height: 48px;
        margin: 4px;
        border-radius: 12px;
        border: 1px solid black;
        padding: 0px;
    }
    .swatch:hover, .selectedSwatch {
        border: 1px solid #ff0000;
    }
    .swatchPart {
        width: 100%;
        height: 50%;
        border-radius: 12px;
        border: 1px solid black;
    }
    .svgWrapper {
        flex-grow: 1;
    }
    :global(svg) {
        height: 100%;
        width: auto;
    }
</style>
