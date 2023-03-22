import type { App } from 'vue';

import SliderBar from './components/Slider/SliderBar';

const components = [
    SliderBar
];

// const directives = [

// ];

function install (Vue: App) {
    components.forEach((comp) => {
        Vue.component(comp.name, comp);
    })
    // directives.forEach((dir) => {
    //     Vue.directive(dir.name, dir.directive);
    // })
}

export default install;

export { default as SliderBar } from './components/Slider/SliderBar';