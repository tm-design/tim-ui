<template>
  <div class="slider-container">
    <div class="track-container" ref="slider" @mousedown="sliderClicked" @mouseup="handleGrabbed = false">
      <slot name="track">
        <div class="slider-track" draggable="false"></div>
      </slot>
    </div>
    <div :class="['progress-container', animate ? 'transition' : '']" ref="progress">
      <slot name="progress">
        <div class="slider-progress" draggable="false"></div>
      </slot>
    </div>
    <div :class="['handle-container', animate ? 'transition' : '']" ref="handle" @mousedown="handleGrab">
      <slot name="handle">
        <div class="slider-handle"></div>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'SliderBar',
  props: {
    height: {
      type: String,
      default: '10px',
    },
    width: {
      type: String,
      default: '100%',
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 100,
    },
    modelValue: {
      type: Number,
      default: undefined,
    },
    step: {
      type: Number,
      default: 1,
    },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const heightCss = ref(props.height);
    const widthCss = ref(props.width);
    const slider = ref<HTMLDivElement>();
    const progress = ref<HTMLDivElement>();
    const handle = ref<HTMLDivElement>();
    const handleGrabbed = ref(false);
    const animate = ref(false);
    const position = ref(0);

    onMounted(() => {
      document.addEventListener('mousemove', (e) => {
        if (handleGrabbed.value) {
          handleMoved(e);
        }
      });
      document.addEventListener('mouseup', () => {
        if (handleGrabbed.value) {
          handleReleased();
        }
      });
      if (props.modelValue && props.modelValue != 0) {
        position.value = props.modelValue;
        updateHandlePostion((position.value / props.max) * 100);
      }
    });

    watch(props, (newProps) => {
      if (!handleGrabbed.value && newProps.modelValue != undefined) {
        let value = newProps.modelValue;
        if (value >= props.max) value = props.max;
        if (value <= props.min) value = props.min;
        updateHandlePostion(value);
      }
    });

    function handleGrab() {
      handleGrabbed.value = true;
    }

    function handleReleased() {
      handleGrabbed.value = false;
    }

    function handleMoved(e: MouseEvent) {
      if (
        handle.value != undefined &&
        slider.value != undefined &&
        progress.value != undefined &&
        handleGrabbed.value
      ) {
        if (animate.value) animate.value = false;
        let percent = ((e.clientX - slider.value.getBoundingClientRect().left) / slider.value.clientWidth) * 100;

        if (props.step != undefined) {
          let fixed = 0;
          let difference = Math.abs(props.max) - Math.abs(props.min);
          if (props.step.toString().includes('.')) {
            fixed = props.step.toString().split('.')[1].length;
          }
          if ((percent / 100) * difference >= position.value + props.step) {
            updateHandlePostion(parseFloat(percent.toFixed(fixed)));
            percent = ((position.value + props.step) / difference) * 100;
            position.value = position.value + props.step;
          } else if ((percent / 100) * difference <= position.value - props.step) {
            updateHandlePostion(parseFloat(percent.toFixed(fixed)));
            percent = ((position.value - props.step) / difference) * 100;
            position.value = position.value - props.step;
          }
        }
      }
    }

    function sliderClicked(e: MouseEvent) {
      if (handle.value && slider.value && progress.value && !handleGrabbed.value) {
        let percent = ((e.clientX - slider.value?.getBoundingClientRect().left) / slider.value.clientWidth) * 100;
        if (props.step) {
          let fixed = 0;
          if (props.step.toString().includes('.')) {
            fixed = props.step.toString().split('.')[1].length;
            percent = parseFloat(percent.toFixed(fixed));
          } else {
            percent = parseFloat(percent.toFixed(0));
          }

          animate.value = true;
          updateHandlePostion(percent);
          position.value = percent;
          handleGrabbed.value = true;
        }
      }
    }

    function updateHandlePostion(percent: number) {
      if (percent > 100) percent = 100;
      if (percent < 0) percent = 0;

      if (handle.value && progress.value) {
        handle.value.style.left = `${percent}%`;
        progress.value.style.width = `${percent}%`;
      }

      emit('update:modelValue', props.min + ((props.max - props.min) * percent) / 100);
    }

    return { heightCss, widthCss, slider, progress, handle, animate, handleGrabbed, sliderClicked, handleGrab };
  },
});
</script>

<style lang="scss" scoped>
@import '../../styles/main.scss';
.slider-container {
  width: v-bind(widthCss);
  height: v-bind(heightCss);
  position: relative;
  display: flex;
  pointer-events: none;

  .track-container {
    display: flex;
    width: 100%;
    height: 100%;
    pointer-events: all;
  }

  .progress-container {
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    width: 0%;
    height: 100%;
    pointer-events: none;

    &.transition {
      transition: width 0.3s;
    }
  }

  .handle-container {
    cursor: pointer;
    position: absolute;
    top: 50%;
    left: 0%;
    display: flex;
    transform: translate(-50%, -50%);
    pointer-events: all;

    &.transition {
      transition: left 0.3s;
    }
  }
}

.slider-track {
  @include noSelect;
  background: #bbbcc0;
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(50, 50, 93, 0.155) 1px 1px 5px 3px inset, rgba(0, 0, 0, 0.235) 0px 1px 1px 1px inset;
}

.slider-progress {
  @include noSelect;
  background: rgb(8, 191, 148);
  height: 100%;
  width: 100%;
  border-radius: 10px;
  box-shadow: rgba(255, 255, 255, 0.471) 1px 1px 2px 3px inset, rgba(0, 0, 0, 0.692) 0px -1px 2px 1px inset;
}

.slider-handle {
  @include noSelect;
  background: white;
  height: 15px;
  width: 15px;
  border-radius: 20px;
  box-shadow: rgba(17, 17, 26, 0.756) 0px 1px 5px;
}
</style>
