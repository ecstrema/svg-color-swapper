<script>
    import { HsvPicker } from 'svelte-color-picker';

    let allColors = ["#000000"]
    let selectedColorIndex = 0;

    let svgText = "";
    let svgHeight = 80;

    $: {
        const regs = [
            /fill:(#[a-f0-9]{3})/gi,
            /fill:(#[a-f0-9]{4})/gi,
            /fill:(#[a-f0-9]{6})/gi,
            /fill:(#[a-f0-9]{8})/gi,
            /fill="(#[a-f0-9]{3})"/gi,
            /fill="(#[a-f0-9]{4})"/gi,
            /fill="(#[a-f0-9]{6})"/gi,
            /fill="(#[a-f0-9]{8})"/gi,
            /stroke:(#[a-f0-9]{3})"/gi,
            /stroke:(#[a-f0-9]{4})"/gi,
            /stroke:(#[a-f0-9]{6})"/gi,
            /stroke:(#[a-f0-9]{8})"/gi,
            /stroke="(#[a-f0-9]{3})"/gi,
            /stroke="(#[a-f0-9]{4})"/gi,
            /stroke="(#[a-f0-9]{6})"/gi,
            /stroke="(#[a-f0-9]{8})"/gi,
        ]
        for (const reg of regs) {
            const matches = [...svgText.matchAll(reg)]
            if (matches.length) {
                for (const match of matches) {
                    if (allColors.indexOf(match[1]) === -1) {
                        allColors.push(match[1])
                    }
                }
            }
        }
        allColors = [...allColors];
    }

    /**
    * @param {number | string} r red
    * @param {number | string} g green
    * @param {number | string} b blue
    * @param {number | string | any} a alpha
    */
    function RGBAToHex(r, g, b, a) {
        r = r.toString(16);
        g = g.toString(16);
        b = b.toString(16);
        a = Math.ceil(a * 255).toString(16);

        if (r.length == 1)
            r = "0" + r;
        if (g.length == 1)
            g = "0" + g;
        if (b.length == 1)
            b = "0" + b;
        if (a.length == 1)
            a = "0" + a;

        return "#" + r + g + b + a;
    }
    function colorChanged(ev) {
        const {r, g, b, a} = ev.detail;
        const newColorStr = RGBAToHex(r, g, b, a);
        svgText = svgText.replace(new RegExp(allColors[selectedColorIndex], "gi"), newColorStr);
        allColors[selectedColorIndex] = newColorStr;
    }
    $: {
        const svgElement = document.querySelector("svg")
        if(svgElement) svgElement.setAttribute("style", svgHeight + "vh");
        }
</script>

<div style="display: flex; justify-content: space-around;">
    <HsvPicker on:colorChange={colorChanged} startColor={allColors[selectedColorIndex]}/>
    <div style="display: flex; flex-direction: column; align-items: center; text-align: center; flex-grow: 2; margin: 12px; justify-content: center; max-height: 300px; overflow: auto;">
        {#each allColors as color, index (color)}
        <div style='height: 20px; width: 100%; background-color: {color}; height: 30px; max-height: 30px; min-height: 30px; box-sizing: border-box; margin-top: 4px; cursor: pointer; {selectedColorIndex === index ? "border: 2px solid black;" : "padding: 2px;"}' on:click="{(() => selectedColorIndex = index)}"></div>
        {:else}
        <p style="margin: 24px">
            No color found in your svg element
        </p>
        {/each}
    </div>
    <input type="range" orient="vertical" bind:value={svgHeight}/>
</div>

<div style="text-align: center;">
    {@html svgText}
</div>

<textarea bind:value={svgText}></textarea>

<style>
    textarea {
        width: 100%;
        height: 200px;
    }
    :global(svg) {
        height: 60vh;
        width: auto;
    }
    input[type=range][orient=vertical] {
        writing-mode: bt-lr; /* IE */
        -webkit-appearance: slider-vertical; /* WebKit */
    }
</style>
