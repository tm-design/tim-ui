<script setup lang="ts">
import { ref } from 'vue';
import { SliderBar } from '.';
import still from './assets/img/Nyan.png';
import anim from './assets/img/nyan.gif';

const sliderValue = ref(0);
const sliderSlotValue = ref(0);
const cat = ref();

cat.value = still;

function catOver(): void {
    cat.value = anim;
}

function catOut(): void {
    cat.value = still;
}

</script>

<template>
    <main>
        <div>
            <h2>Slider Bar Example</h2>
            <h3>Value: {{ sliderValue }}</h3>
            <SliderBar class="slider" v-model="sliderValue"></SliderBar>
        </div>
        <br />
        <br />
        <div>
            <h2>Slider Bar Slot Example</h2>
            <h3>Value: {{ sliderSlotValue }}</h3>
            <SliderBar class="slot-slider" v-model="sliderSlotValue" height="50px">
                <template v-slot:progress>
                    <div class="slot-progress"></div>
                </template>
                <template v-slot:handle>
                    <img 
                        id="cat" 
                        class="slot-handle" 
                        :src="cat" 
                        draggable="false"
                        @mouseover="catOver"
                        @mouseout="catOut"
                    />
                </template>
            </SliderBar>
        </div>
    </main>
</template>

<style lang="scss">
.slider {
    max-width: 200px;
}

.slot-slider {
    max-width: 500px;
}

.slot-progress {
    width: 100%;
    height: 100%;
    background: rgb(254,0,0);
    background: linear-gradient(0deg, rgba(254,0,0,1) 0%, rgba(233,123,20,1) 15%, rgba(233,227,20,1) 32%, rgba(21,233,20,1) 50%, rgba(30,212,255,1) 66%, rgba(84,20,233,1) 83%, rgba(233,20,210,1) 100%);
}

.slot-handle {
    height: 89px;
    width: auto;

    &:hover {
        padding-top: 10px;
        height: 80px;
        width: auto;
    }
}
</style>