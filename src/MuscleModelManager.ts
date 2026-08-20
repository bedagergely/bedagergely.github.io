import * as THREE from 'three';
import { type GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader.js';

export type MuscleTargetLevel = 'primary' | 'secondary' | 'selected' | 'inactive';

export interface ExerciseDefinition {
  id: string;
  name: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
}

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

  // 1. Pre-allocate Raycaster and Mesh Array to prevent GC memory thrashing
  raycaster: THREE.Raycaster = new THREE.Raycaster();
  cachedMeshes: THREE.Mesh[] = [];

  // Highlight Materials
  readonly defaultMaterial: THREE.MeshStandardMaterial = new THREE.MeshStandardMaterial({
    color: 0x5a2d2d,
    roughness: 0.7,
    metalness: 0.1,
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
            const normalizedName = mesh.name.toLowerCase().trim();

            this.muscleMeshes.set(normalizedName, mesh);
            this.originalMaterials.set(normalizedName, mesh.material);

            // 2. Cache the mesh reference here once
            this.cachedMeshes.push(mesh);

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

  highlightExercise(exercise: ExerciseDefinition): void {
    this.resetHighlights();
    this.applyTargetMaterial(exercise.primaryMuscles, this.primaryMaterial);
    this.applyTargetMaterial(exercise.secondaryMuscles, this.secondaryMaterial);
  }

  getBaseMuscleName(rawName: string): string {
    return rawName
      .toLowerCase()
      .trim()
      .replace(/(_l|_r|\.l|\.r|_left|_right|-l|-r)$/i, '');
  }

  selectMuscleByName(rawName: string): string {
    this.resetHighlights();
    const baseName = this.getBaseMuscleName(rawName);
    this.applyTargetMaterial([baseName], this.selectedMaterial);
    return baseName;
  }

  applyTargetMaterial(muscleIdentifiers: string[], material: THREE.Material): void {
    for (const id of muscleIdentifiers) {
      const normalized = id.toLowerCase().trim();

      this.muscleMeshes.forEach((mesh, meshName) => {
        if (
          meshName === normalized ||
          meshName.startsWith(`${normalized}_`) ||
          meshName.startsWith(`${normalized}.`) ||
          meshName.startsWith(`${normalized}-`)
        ) {
          mesh.material = material;
        }
      });
    }
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