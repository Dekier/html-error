<script setup lang="ts">
import { VSMShadowMap, SRGBColorSpace, ACESFilmicToneMapping } from "three";
const storeControl = useControlsStore();
const storeGeneral = useGeneralStore();
const { isStartedGame } = storeToRefs(storeGeneral);
const title = ref("Marcin Dekier");
import { useControls, TresLeches, Perf } from "@tresjs/leches";

const description = ref("Marcin Dekier Sandbox (Portfolio)");
useHead({
  title,
  meta: [
    {
      name: "description",
      content: description,
    },
  ],
});
const characterStore = useCharacterStore();
const { positionCharacter } = storeToRefs(characterStore);

const { isMobile } = useDevice();
const gl = {
  alfa: true,
  shadows: true,
  physicallyCorrectLights: true,
  gammaFactor: 2.2,
  gammaOutput: true,
  outputColorSpace: SRGBColorSpace,
  toneMapping: ACESFilmicToneMapping,
  toneMappingExposure: 2.2,
  shadowMap: { enabled: true, type: VSMShadowMap },
  powerPreference: "high-performance",
  stencil: false,
};
const { value: color } = useControls({
  grass: storeGeneral.color,
});

// const { value: colorFlower } = useControls({
//   flower: storeGeneral.colorFlower,
// });
// const { value: colorTrees } = useControls({
//   trees: storeGeneral.colorTrees,
// });
watch(color, (value) => {
  storeGeneral.setColor(value);
  // directionalLight.position.Z = value;
});

// watch(colorFlower, (value) => {
//   storeGeneral.setColorFlower(value);
//   // directionalLight.position.Z = value;
// });

// watch(colorTrees, (value) => {
//   storeGeneral.setColorTrees(value);
//   // directionalLight.position.Z = value;
// });
const isActiveAntialias = ref(false);
isActiveAntialias.value = isMobile ? false : true;
</script>

<template>
  <canvas id="drawing-canvas" height="160" width="160" />
  <HudGeneral />
  <LoadingScreen />
  <client-only>
    <TresLeches />
  </client-only>
  <TresCanvas
    :class="{ 'hide-cursor': isStartedGame }"
    clear-color="#80CBF8"
    window-size
    v-bind="gl"
    :antialias="isActiveAntialias"
  >
    <Perf />
    <Camera />
    <Light v-if="positionCharacter" />

    <Suspense>
      <Ground v-if="positionCharacter" />
    </Suspense>
    <Suspense>
      <ModelsGrass v-if="positionCharacter" />
    </Suspense>

    <Suspense>
      <ModelsCharacterAll />
    </Suspense>
    <Suspense>
      <ModelsWardrobeAll v-if="positionCharacter" />
    </Suspense>
  </TresCanvas>
</template>

<style lang="scss">
.hide-cursor {
  // cursor: none;
}

#drawing-canvas {
  position: absolute;
  background-color: #000000;
  top: 20px;
  left: 0px;
  right: 0px;
  margin: 0 auto;
  z-index: 2;
  opacity: 1;
  cursor: crosshair;
  touch-action: none;
  width: 160px;
  height: 160px;
}
</style>
