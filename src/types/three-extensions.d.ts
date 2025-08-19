// Portfolio/src/types/three-extensions.d.ts

declare module 'three/examples/jsm/lights/RectAreaLightUniformsLib' {
  export const RectAreaLightUniformsLib: {
    init: () => void;
  };
}

declare module 'three/examples/jsm/helpers/RectAreaLightHelper' {
  import { Object3D, Light } from 'three';
  export class RectAreaLightHelper extends Object3D {
    constructor(light: Light);
  }
} 