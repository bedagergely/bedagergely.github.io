import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { MuscleModelManager } from './MuscleModelManager';
import { EXERCISES, exercisesForMuscle, type Exercise } from './exercises';
import { MUSCLE_GROUPS, groupsForMuscle, musclesForGroups } from './muscleGroups';

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
  
  <div style="border-top: 1px solid #333; padding-top: 10px; margin-bottom: 12px;">
    <div style="font-size: 11px; text-transform: uppercase; color: #888; margin-bottom: 6px;">Exercises targeting it</div>
    <div id="muscle-exercises" style="max-height: 260px; overflow-y: auto; font-size: 13px;">
      <div style="color: #777;">Select a muscle to see its exercises.</div>
    </div>
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
const muscleExercises = document.getElementById('muscle-exercises')!;

let currentMuscleIndex = -1;

// GLTFLoader replaces whitespace in object names with underscores.
function formatMuscleName(name: string): string {
  return name.replace(/_/g, ' ');
}

// --- Exercise Library UI ---
const GROUP_NAMES = new Map(MUSCLE_GROUPS.map((group) => [group.id, group.name]));

const CATEGORY_LABELS: Record<Exercise['category'], string> = {
  push: 'Push',
  pull: 'Pull',
  legs: 'Legs',
  core: 'Core',
};

const exerciseBox = document.createElement('div');
exerciseBox.style.position = 'fixed';
exerciseBox.style.top = '20px';
exerciseBox.style.left = '20px';
exerciseBox.style.padding = '14px 18px';
exerciseBox.style.backgroundColor = 'rgba(20, 20, 25, 0.85)';
exerciseBox.style.color = '#fff';
exerciseBox.style.borderRadius = '8px';
exerciseBox.style.border = '1px solid #333';
exerciseBox.style.fontFamily = 'system-ui, -apple-system, sans-serif';
exerciseBox.style.width = '230px';
exerciseBox.style.maxHeight = 'calc(100vh - 40px)';
exerciseBox.style.overflowY = 'auto';
exerciseBox.style.zIndex = '100';

const exerciseHeader = document.createElement('div');
exerciseHeader.innerHTML = `
  <div style="font-size: 11px; text-transform: uppercase; color: #888;">Calisthenics exercises</div>
  <div style="font-size: 11px; color: #777; margin: 4px 0 10px;">
    <span style="color: #ff2222;">\u25cf</span> primary
    <span style="color: #ffaa00; margin-left: 8px;">\u25cf</span> secondary
  </div>
`;
exerciseBox.appendChild(exerciseHeader);

const exerciseButtons = new Map<string, HTMLButtonElement>();

for (const category of ['push', 'pull', 'legs', 'core'] as const) {
  const heading = document.createElement('div');
  heading.textContent = CATEGORY_LABELS[category];
  heading.style.cssText =
    'font-size: 11px; text-transform: uppercase; color: #00d2ff; margin: 10px 0 4px;';
  exerciseBox.appendChild(heading);

  for (const exercise of EXERCISES.filter((candidate) => candidate.category === category)) {
    const button = document.createElement('button');
    button.textContent = exercise.name;
    button.style.cssText =
      'display: block; width: 100%; text-align: left; background: transparent; color: #ddd;' +
      'border: none; padding: 4px 6px; border-radius: 4px; cursor: pointer; font-size: 13px;';
    button.addEventListener('click', () => selectExercise(exercise));
    exerciseBox.appendChild(button);
    exerciseButtons.set(exercise.id, button);
  }
}

document.body.appendChild(exerciseBox);

function setActiveExercise(exerciseId: string | null): void {
  exerciseButtons.forEach((button, id) => {
    const active = id === exerciseId;
    button.style.background = active ? '#00d2ff' : 'transparent';
    button.style.color = active ? '#04141b' : '#ddd';
    button.style.fontWeight = active ? '600' : '400';
  });
}

function selectExercise(exercise: Exercise): void {
  if (!muscleManager) return;

  muscleManager.highlightExercise(
    musclesForGroups(exercise.primaryGroups),
    musclesForGroups(exercise.secondaryGroups)
  );
  setActiveExercise(exercise.id);

  muscleTitle.textContent = exercise.name;
  muscleExercises.innerHTML = '';
  muscleExercises.appendChild(
    renderGroupList('Primary', exercise.primaryGroups, '#ff6666')
  );
  muscleExercises.appendChild(
    renderGroupList('Secondary', exercise.secondaryGroups, '#ffaa00')
  );
}

function renderGroupList(label: string, groupIds: string[], color: string): HTMLElement {
  const wrapper = document.createElement('div');
  wrapper.style.marginBottom = '8px';

  const heading = document.createElement('div');
  heading.textContent = label;
  heading.style.cssText = `font-size: 11px; text-transform: uppercase; color: ${color};`;
  wrapper.appendChild(heading);

  const names = document.createElement('div');
  names.textContent = groupIds
    .map((id) => GROUP_NAMES.get(id) ?? id)
    .join(', ');
  names.style.color = '#ddd';
  wrapper.appendChild(names);

  return wrapper;
}

function selectMuscle(mesh: THREE.Mesh): void {
  if (!muscleManager) return;

  muscleManager.selectMuscleByName(mesh.name);
  setActiveExercise(null);
  muscleTitle.textContent = formatMuscleName(mesh.name);
  renderMuscleExercises(mesh.name);
}

function renderMuscleExercises(muscleName: string): void {
  muscleExercises.innerHTML = '';

  const groups = groupsForMuscle(muscleName);
  const involvements = exercisesForMuscle(muscleName);

  if (involvements.length === 0) {
    const empty = document.createElement('div');
    empty.textContent = 'No calisthenics exercise mapped to this muscle.';
    empty.style.color = '#777';
    muscleExercises.appendChild(empty);
    return;
  }

  const groupLine = document.createElement('div');
  groupLine.textContent = groups.map((group) => group.name).join(', ');
  groupLine.style.cssText = 'color: #888; font-size: 11px; margin-bottom: 6px;';
  muscleExercises.appendChild(groupLine);

  for (const { exercise, level } of involvements) {
    const row = document.createElement('button');
    row.style.cssText =
      'display: flex; align-items: center; gap: 6px; width: 100%; text-align: left;' +
      'background: transparent; border: none; color: #ddd; padding: 3px 0; cursor: pointer; font-size: 13px;';

    const dot = document.createElement('span');
    dot.textContent = '\u25cf';
    dot.style.color = level === 'primary' ? '#ff2222' : '#ffaa00';
    row.appendChild(dot);

    const label = document.createElement('span');
    label.textContent = exercise.name;
    row.appendChild(label);

    row.addEventListener('click', () => selectExercise(exercise));
    muscleExercises.appendChild(row);
  }
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
  selectMuscle(muscleManager.cachedMeshes[currentMuscleIndex]);
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
      selectMuscle(intersectedMesh);

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