import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MuscleModelManager } from './MuscleModelManager';

// --- Scene Setup ---
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xaaaaaa);

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  100
);
camera.position.set(0, 1.2, 2.5);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// --- Controls ---
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.target.set(0, 1, 0);

// --- Lighting ---
const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
scene.add(ambientLight);

const keyLight = new THREE.DirectionalLight(0xffffff, 1.5);
keyLight.position.set(3, 5, 4);
keyLight.castShadow = true;
scene.add(keyLight);

const fillLight = new THREE.DirectionalLight(0x88bbff, 0.6);
fillLight.position.set(-3, 2, -2);
scene.add(fillLight);

// --- Selected Muscle Info Box UI ---
const infoBox = document.createElement('div');
infoBox.style.position = 'fixed';
infoBox.style.top = '20px';
infoBox.style.right = '20px';
infoBox.style.padding = '14px 20px';
infoBox.style.backgroundColor = 'rgba(20, 20, 25, 0.85)';
infoBox.style.color = '#fff';
infoBox.style.borderRadius = '8px';
infoBox.style.border = '1px solid #333';
infoBox.style.fontFamily = 'system-ui, -apple-system, sans-serif';
infoBox.style.minWidth = '220px';
infoBox.style.zIndex = '100';
infoBox.innerHTML = `
  <div style="font-size: 11px; text-transform: uppercase; color: #888; margin-bottom: 4px;">Selected Muscle</div>
  
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 15px;">
    <button id="prev-muscle" style="background: #333; color: white; border: none; padding: 4px 10px; cursor: pointer; border-radius: 4px;">&larr;</button>
    <div id="muscle-title" style="font-size: 16px; font-weight: 600; color: #00d2ff; text-align: center; flex-grow: 1; padding: 0 10px;">Click any</div>
    <button id="next-muscle" style="background: #333; color: white; border: none; padding: 4px 10px; cursor: pointer; border-radius: 4px;">&rarr;</button>
  </div>
  
  <div style="border-top: 1px solid #333; padding-top: 10px;">
    <div style="font-size: 11px; text-transform: uppercase; color: #888; margin-bottom: 4px;">Base Opacity</div>
    <input type="range" id="opacity-slider" min="0" max="1" step="0.01" value="0.4" style="width: 100%; cursor: pointer;">
  </div>
`;
document.body.appendChild(infoBox);

const muscleTitle = document.getElementById('muscle-title')!;
const prevButton = document.getElementById('prev-muscle')!;
const nextButton = document.getElementById('next-muscle')!;
const opacitySlider = document.getElementById('opacity-slider') as HTMLInputElement;

let currentMuscleIndex = -1;

// GLTFLoader replaces whitespace in object names with underscores.
function formatMuscleName(name: string): string {
  return name.replace(/_/g, ' ');
}

function stepMuscle(direction: number) {
  // Ensure the model is loaded and we have meshes in the cache
  if (!muscleManager || muscleManager.cachedMeshes.length === 0) return;

  currentMuscleIndex += direction;

  // Wrap around the array if we go out of bounds
  if (currentMuscleIndex < 0) {
    currentMuscleIndex = muscleManager.cachedMeshes.length - 1;
  } else if (currentMuscleIndex >= muscleManager.cachedMeshes.length) {
    currentMuscleIndex = 0;
  }

  // Get the mesh at the new index and update the UI
  const targetMesh = muscleManager.cachedMeshes[currentMuscleIndex];
  const baseName = muscleManager.selectMuscleByName(targetMesh.name);
  muscleTitle.textContent = formatMuscleName(baseName);
}

prevButton.addEventListener('click', () => stepMuscle(-1));
nextButton.addEventListener('click', () => stepMuscle(1));

// Keep the previous opacity slider logic
opacitySlider.addEventListener('input', (event) => {
  const value = parseFloat((event.target as HTMLInputElement).value);
  if (muscleManager && muscleManager.defaultMaterial) {
    muscleManager.defaultMaterial.opacity = value;
  }
});

// --- Muscle Manager Initialization ---
let muscleManager: MuscleModelManager;

muscleManager = new MuscleModelManager({
  modelUrl: './models/muscles.glb',
  scene: scene,
  onLoaded: () => {
    // createUI();
  },
});

// --- Click-Only Raycasting ---
const pointer = new THREE.Vector2();
const startPointer = new THREE.Vector2();
const DRAG_THRESHOLD_PX = 5; // Ignore clicks if mouse moved more than 5px (user was orbiting)

window.addEventListener('pointerdown', (event: MouseEvent) => {
  startPointer.set(event.clientX, event.clientY);
});

window.addEventListener('pointerup', (event: MouseEvent) => {
  const deltaX = Math.abs(event.clientX - startPointer.x);
  const deltaY = Math.abs(event.clientY - startPointer.y);

  // If the user was dragging/rotating the camera, skip raycasting
  if (deltaX > DRAG_THRESHOLD_PX || deltaY > DRAG_THRESHOLD_PX) {
    return;
  }

  // Convert click coordinates to Normalized Device Coordinates (-1 to +1)
  pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
  pointer.y = -(event.clientY / window.innerHeight) * 2 + 1;

  if (muscleManager) {
    const intersectedMesh = muscleManager.getMuscleAtPointer(pointer, camera);
    if (intersectedMesh) {
      const baseName = muscleManager.selectMuscleByName(intersectedMesh.name);
      muscleTitle.textContent = formatMuscleName(baseName);
        
      // Update the index so the next arrow click picks up from the selected muscle
      currentMuscleIndex = muscleManager.cachedMeshes.findIndex(m => m === intersectedMesh);
    }
  }
});

// --- Window Resize Handling ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// --- Clean Render Loop (No per-frame raycasting) ---
function animate(): void {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

animate();