import SliderBarVue from './SliderBar.vue';
import type { App } from 'vue';

SliderBarVue.install = (Vue: App) => {
  Vue.component(SliderBarVue.name, SliderBarVue);
};

export default SliderBarVue;
