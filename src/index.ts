import type { App } from 'vue';

const components = [

];

const directives = [

];

function install (Vue: App) {
    components.forEach((comp) => {
        Vue.component(comp.name, comp);
    })
    directives.forEach((dir) => {
        Vue.directive(dir.name, dir.directive);
    })
}