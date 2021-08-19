<script lang="ts">
    import { ColorPicker, Color } from 'svelte-colorpick'
    export let color = '#000';
    export let showHex = false;
    export let collapse = false;

    $: colorObj = Color.hex(color)

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    $: {
        dispatch('change', {color: colorObj.toHex()});
    }

    const showSliders= {
        "lab.l": true,
    }
</script>

<div class="demo">
    <ColorPicker
    bind:color={colorObj}
    background='#fff'

    collapse={collapse}

    handleWidth="32"
    handleHeight="32"

    tabbed={false}
    selectedTab="lab"

    selectedDimension="lab.l"

    showMatrix="true"
    showSliders={showSliders}
    bind:showHex={showHex}
    showLabels="true"
    showNumeric="true"
    selectDimensions="true"

    matrixWidth="200"
    matrixHeight="200"
    scrollbarHeight="20"
    />
</div>
