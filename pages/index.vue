<script setup lang="ts">
import { StatsGl, Stats } from "@tresjs/cientos";
</script>

<template>
  <TresCanvas clear-color="#333" window-size>
    <TresPerspectiveCamera :position="[0, 2, 15]" />
    <Stats />
    <OrbitControls />
    <Torus ref="torusRef" :args="[0.75, 0.4, 16, 80]" :position="[-2, 6, 0]">
      <TresMeshToonMaterial color="cyan" />
    </Torus>
    <TresGridHelper :args="[10, 10]" />
  </TresCanvas>
</template>
