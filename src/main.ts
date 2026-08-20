import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MuscleModelManager, /*type ExerciseDefinition*/ } from './MuscleModelManager';

// --- Sample Exercises Database ---
// const exercises: ExerciseDefinition[] = [
//   {
//     id: 'bench_press',
//     name: 'Barbell Bench Press',
//     primaryMuscles: ['pectoralis_major'],
//     secondaryMuscles: ['triceps_brachii', 'deltoid_anterior'],
//   },
//   {
//     id: 'bicep_curl',
//     name: 'Dumbbell Bicep Curl',
//     primaryMuscles: ['biceps_brachii'],
//     secondaryMuscles: ['brachialis', 'brachioradialis'],
//   },
//   {
//     id: 'squat',
//     name: 'Barbell Back Squat',
//     primaryMuscles: ['quadriceps_femoris', 'gluteus_maximus'],
//     secondaryMuscles: ['hamstrings', 'soleus', 'gastrocnemius'],
//   },
//   {
//     id: 'pull_up',
//     name: 'Pull-Up',
//     primaryMuscles: ['latissimus_dorsi'],
//     secondaryMuscles: ['biceps_brachii', 'trapezius', 'rhomboids'],
//   },
// ];

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
  <div id="muscle-title" style="font-size: 16px; font-weight: 600; color: #00d2ff;">Click any muscle</div>
`;
document.body.appendChild(infoBox);

const muscleTitle = document.getElementById('muscle-title')!;

function formatMuscleName(name: string): string {
  return name
    .replace(/[_.]/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

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
    }
  }
});

// --- Exercise Selector UI ---
// function createUI(): void {
//   const select = document.createElement('select');
//   select.style.position = 'fixed';
//   select.style.top = '20px';
//   select.style.left = '20px';
//   select.style.padding = '8px 12px';
//   select.style.fontSize = '14px';
//   select.style.borderRadius = '6px';
//   select.style.backgroundColor = '#1e1e24';
//   select.style.color = '#fff';
//   select.style.border = '1px solid #333';
//   select.style.zIndex = '100';

//   const defaultOption = document.createElement('option');
//   defaultOption.value = '';
//   defaultOption.textContent = '-- Select an Exercise Preset --';
//   select.appendChild(defaultOption);

//   exercises.forEach((exercise) => {
//     const option = document.createElement('option');
//     option.value = exercise.id;
//     option.textContent = exercise.name;
//     select.appendChild(option);
//   });

//   select.addEventListener('change', (e: Event) => {
//     const target = e.target as HTMLSelectElement;
//     const selectedExercise = exercises.find((ex) => ex.id === target.value);
//     if (selectedExercise) {
//       muscleManager.highlightExercise(selectedExercise);
//       muscleTitle.textContent = selectedExercise.name;
//     } else {
//       muscleManager.resetHighlights();
//       muscleTitle.textContent = 'Click any muscle';
//     }
//   });

//   document.body.appendChild(select);
// }

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