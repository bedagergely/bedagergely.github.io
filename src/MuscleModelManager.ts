import * as THREE from 'three';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';
import { normalizeMuscleName } from './muscleGroups';

export type MuscleTargetLevel = 'primary' | 'secondary' | 'selected' | 'inactive';

export interface MuscleManagerOptions {
  modelUrl: string;
  scene: THREE.Scene;
  onLoaded?: () => void;
}

export class MuscleModelManager {
  scene: THREE.Scene;
  options: MuscleManagerOptions;
  muscleMeshes: Map<string, THREE.Mesh> = new Map();
  originalMaterials: Map<string, THREE.Material | THREE.Material[]> = new Map();
  /** Normalized anatomical name (no side suffix) -> every mesh belonging to it. */
  meshesByMuscle: Map<string, THREE.Mesh[]> = new Map();

  // 1. Pre-allocate Raycaster and Mesh Array to prevent GC memory thrashing
  raycaster: THREE.Raycaster = new THREE.Raycaster();
  cachedMeshes: THREE.Mesh[] = [];

  // Highlight Materials
  readonly defaultMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: 0x5a2d2d,
    roughness: 0.7,
    metalness: 0.1,
    opacity: 0.4,
    transparent: true,
  });

  readonly primaryMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: 0xff2222,
    emissive: 0x550000,
    roughness: 0.4,
  });

  readonly secondaryMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: 0xffaa00,
    emissive: 0x442200,
    roughness: 0.5,
  });

  readonly selectedMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: 0x00d2ff,
    emissive: 0x003355,
    roughness: 0.3,
  });

  constructor(options: MuscleManagerOptions) {
    this.options = options;
    this.scene = options.scene;
    this.loadModel(options.modelUrl);
  }

  loadModel(url: string): void {
    const loader = new GLTFLoader();
    const dracoLoader = new DRACOLoader();
    dracoLoader.setDecoderPath('https://www.gstatic.com/draco/versioned/decoders/1.5.6/');
    loader.setDRACOLoader(dracoLoader);

    loader.load(
      url,
      (gltf: GLTF) => {
        const root = gltf.scene;

        root.traverse((child: THREE.Object3D) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;

            this.muscleMeshes.set(mesh.name, mesh);
            this.originalMaterials.set(mesh.name, mesh.material);

            // 2. Cache the mesh reference here once
            this.cachedMeshes.push(mesh);

            const key = normalizeMuscleName(mesh.name);
            const siblings = this.meshesByMuscle.get(key) ?? [];
            siblings.push(mesh);
            this.meshesByMuscle.set(key, siblings);

            mesh.material = this.defaultMaterial;
            mesh.castShadow = true;
            mesh.receiveShadow = true;
          }
        });

        this.scene.add(root);

        if (this.options.onLoaded) {
          this.options.onLoaded();
        }
      },
      undefined,
      (error: unknown) => {
        console.error('Failed to load muscle model:', error);
      }
    );
  }

  resetHighlights(): void {
    this.muscleMeshes.forEach((mesh) => {
      mesh.material = this.defaultMaterial;
    });
  }

  selectMuscleByName(name: string): string {
    this.resetHighlights();
    this.applyTargetMaterial([name], this.selectedMaterial);
    return name;
  }

  /**
   * Identifiers may be exact mesh names or side-agnostic anatomical names
   * ("Soleus muscle" highlights both sides).
   */
  applyTargetMaterial(muscleIdentifiers: string[], material: THREE.Material): void {
    for (const id of muscleIdentifiers) {
      const exact = this.muscleMeshes.get(id);
      if (exact) {
        exact.material = material;
        continue;
      }

      for (const mesh of this.meshesByMuscle.get(normalizeMuscleName(id)) ?? []) {
        mesh.material = material;
      }
    }
  }

  highlightExercise(primaryMuscles: string[], secondaryMuscles: string[]): void {
    this.resetHighlights();
    this.applyTargetMaterial(secondaryMuscles, this.secondaryMaterial);
    this.applyTargetMaterial(primaryMuscles, this.primaryMaterial);
  }

  /**
   * Fast Raycast: Uses persistent raycaster and pre-cached mesh array.
   */
  getMuscleAtPointer(
    pointer: THREE.Vector2,
    camera: THREE.Camera
  ): THREE.Mesh | null {
    // 3. Reuse instance and pass existing array directly
    this.raycaster.setFromCamera(pointer, camera);

    const intersects = this.raycaster.intersectObjects(this.cachedMeshes, false);

    if (intersects.length > 0) {
      return intersects[0].object as THREE.Mesh;
    }
    return null;
  }
}