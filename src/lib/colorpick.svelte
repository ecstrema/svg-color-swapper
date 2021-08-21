<script lang="ts">
    import { ColorPicker, Color } from 'svelte-colorpick'
    export let color = '#000';

    $: colorObj = Color.hex(color)

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    $: {
        dispatch('change', {color: colorObj.toHex()});
    }

    const showSliders = {
        "hsl.h": true,
        "hsl.s": true,
        "hsl.l": true,
        "hcl.h": true,
        "hcl.c": true,
        "hcl.l": true,
        "lab.l": true,
        "lab.a": true,
        "lab.b": true,
        "rgb.r": true,
        "rgb.g": true,
        "rgb.b": true,
    }
</script>

<div class="demo">
    <ColorPicker
    bind:color={colorObj}
    background='#fff'

    collapse={false}

    handleWidth="32"
    handleHeight="32"

    tabbed={true}
    selectedTab="lab"

    selectedDimension="lab.l"

    showMatrix="true"
    showSliders={showSliders}
    showHex={true}
    showLabels="true"
    showNumeric="true"
    selectDimensions="true"

    matrixWidth="300"
    matrixHeight="200"
    scrollbarHeight="20"
    />
</div>
