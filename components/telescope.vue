<script setup lang="ts">
import { useGLTF, Html } from "@tresjs/cientos";

const { nodes } = await useGLTF("/models/telescope.glb", {
  draco: true,
});

const model = nodes.telescope;

const isActiveLabel = ref(false);

setTimeout(() => {
  isActiveLabel.value = true;
  console.log("changed");
}, 3000);
</script>

<template>
  <primitive :object="model">
    <Html center transform :distance-factor="5" :position="[0, 1, 0]" portal="">
      <div
        class="Label__content"
        :class="{ 'Label__content--active': isActiveLabel }"
      >
        TEXT
      </div>
    </Html>
  </primitive>
</template>
