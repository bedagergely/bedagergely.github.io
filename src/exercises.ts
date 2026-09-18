import { groupsForMuscle } from './muscleGroups';

export interface Exercise {
  id: string;
  name: string;
  category: 'push' | 'pull' | 'legs' | 'core';
  primaryGroups: string[];
  secondaryGroups: string[];
}

export const EXERCISES: Exercise[] = [
  {
    id: 'push-up',
    name: 'Push-up',
    category: 'push',
    primaryGroups: ['pectoralis-major', 'triceps', 'front-delt'],
    secondaryGroups: ['serratus-anterior', 'rectus-abdominis', 'transversus-abdominis', 'rotator-cuff'],
  },
  {
    id: 'diamond-push-up',
    name: 'Diamond push-up',
    category: 'push',
    primaryGroups: ['triceps', 'pectoralis-major'],
    secondaryGroups: ['front-delt', 'rectus-abdominis', 'forearm-extensors'],
  },
  {
    id: 'wide-push-up',
    name: 'Wide push-up',
    category: 'push',
    primaryGroups: ['pectoralis-major'],
    secondaryGroups: ['front-delt', 'triceps', 'serratus-anterior'],
  },
  {
    id: 'decline-push-up',
    name: 'Decline push-up',
    category: 'push',
    primaryGroups: ['pectoralis-major', 'front-delt'],
    secondaryGroups: ['triceps', 'serratus-anterior', 'rectus-abdominis'],
  },
  {
    id: 'pike-push-up',
    name: 'Pike push-up',
    category: 'push',
    primaryGroups: ['front-delt', 'side-delt', 'triceps'],
    secondaryGroups: ['trapezius', 'serratus-anterior', 'rotator-cuff'],
  },
  {
    id: 'handstand-push-up',
    name: 'Handstand push-up',
    category: 'push',
    primaryGroups: ['front-delt', 'side-delt', 'triceps'],
    secondaryGroups: ['trapezius', 'serratus-anterior', 'rotator-cuff', 'forearm-flexors', 'rectus-abdominis'],
  },
  {
    id: 'handstand-hold',
    name: 'Handstand hold',
    category: 'push',
    primaryGroups: ['front-delt', 'side-delt', 'trapezius'],
    secondaryGroups: ['triceps', 'forearm-flexors', 'forearm-extensors', 'rectus-abdominis', 'gluteus-maximus'],
  },
  {
    id: 'dip',
    name: 'Parallel bar dip',
    category: 'push',
    primaryGroups: ['triceps', 'pectoralis-major'],
    secondaryGroups: ['front-delt', 'pectoralis-minor', 'rhomboids', 'rectus-abdominis'],
  },
  {
    id: 'bench-dip',
    name: 'Bench dip',
    category: 'push',
    primaryGroups: ['triceps'],
    secondaryGroups: ['front-delt', 'pectoralis-major'],
  },
  {
    id: 'planche-lean',
    name: 'Planche lean',
    category: 'push',
    primaryGroups: ['front-delt', 'pectoralis-major', 'serratus-anterior'],
    secondaryGroups: ['biceps', 'forearm-flexors', 'rectus-abdominis', 'hip-flexors'],
  },
  {
    id: 'pull-up',
    name: 'Pull-up',
    category: 'pull',
    primaryGroups: ['lats', 'teres-major', 'biceps'],
    secondaryGroups: ['rhomboids', 'trapezius', 'rear-delt', 'brachialis', 'forearm-flexors', 'rectus-abdominis'],
  },
  {
    id: 'chin-up',
    name: 'Chin-up',
    category: 'pull',
    primaryGroups: ['biceps', 'lats'],
    secondaryGroups: ['brachialis', 'teres-major', 'rhomboids', 'pectoralis-major', 'forearm-flexors'],
  },
  {
    id: 'wide-pull-up',
    name: 'Wide-grip pull-up',
    category: 'pull',
    primaryGroups: ['lats', 'teres-major'],
    secondaryGroups: ['rhomboids', 'trapezius', 'rear-delt', 'rotator-cuff', 'forearm-flexors'],
  },
  {
    id: 'inverted-row',
    name: 'Inverted row',
    category: 'pull',
    primaryGroups: ['rhomboids', 'lats', 'rear-delt'],
    secondaryGroups: ['trapezius', 'biceps', 'brachialis', 'erector-spinae', 'gluteus-maximus'],
  },
  {
    id: 'muscle-up',
    name: 'Muscle-up',
    category: 'pull',
    primaryGroups: ['lats', 'triceps', 'pectoralis-major', 'biceps'],
    secondaryGroups: ['teres-major', 'trapezius', 'rhomboids', 'front-delt', 'rectus-abdominis', 'forearm-flexors'],
  },
  {
    id: 'scapular-pull-up',
    name: 'Scapular pull-up',
    category: 'pull',
    primaryGroups: ['trapezius', 'rhomboids'],
    secondaryGroups: ['lats', 'rotator-cuff', 'forearm-flexors'],
  },
  {
    id: 'dead-hang',
    name: 'Dead hang',
    category: 'pull',
    primaryGroups: ['forearm-flexors'],
    secondaryGroups: ['lats', 'trapezius', 'rotator-cuff', 'forearm-extensors'],
  },
  {
    id: 'front-lever',
    name: 'Front lever',
    category: 'pull',
    primaryGroups: ['lats', 'rectus-abdominis', 'teres-major'],
    secondaryGroups: ['rhomboids', 'trapezius', 'triceps', 'gluteus-maximus', 'hip-flexors', 'erector-spinae'],
  },
  {
    id: 'back-lever',
    name: 'Back lever',
    category: 'pull',
    primaryGroups: ['lats', 'biceps', 'pectoralis-major'],
    secondaryGroups: ['rear-delt', 'erector-spinae', 'gluteus-maximus', 'forearm-flexors'],
  },
  {
    id: 'squat',
    name: 'Bodyweight squat',
    category: 'legs',
    primaryGroups: ['quadriceps', 'gluteus-maximus'],
    secondaryGroups: ['hamstrings', 'adductors', 'erector-spinae', 'calves', 'gluteus-medius'],
  },
  {
    id: 'pistol-squat',
    name: 'Pistol squat',
    category: 'legs',
    primaryGroups: ['quadriceps', 'gluteus-maximus'],
    secondaryGroups: ['gluteus-medius', 'hamstrings', 'adductors', 'shin', 'deep-hip-rotators', 'rectus-abdominis'],
  },
  {
    id: 'lunge',
    name: 'Lunge',
    category: 'legs',
    primaryGroups: ['quadriceps', 'gluteus-maximus'],
    secondaryGroups: ['hamstrings', 'adductors', 'gluteus-medius', 'calves', 'hip-flexors'],
  },
  {
    id: 'bulgarian-split-squat',
    name: 'Bulgarian split squat',
    category: 'legs',
    primaryGroups: ['quadriceps', 'gluteus-maximus'],
    secondaryGroups: ['hamstrings', 'gluteus-medius', 'adductors', 'deep-hip-rotators'],
  },
  {
    id: 'step-up',
    name: 'Step-up',
    category: 'legs',
    primaryGroups: ['quadriceps', 'gluteus-maximus'],
    secondaryGroups: ['hamstrings', 'gluteus-medius', 'calves'],
  },
  {
    id: 'glute-bridge',
    name: 'Glute bridge',
    category: 'legs',
    primaryGroups: ['gluteus-maximus', 'hamstrings'],
    secondaryGroups: ['erector-spinae', 'adductors', 'rectus-abdominis'],
  },
  {
    id: 'nordic-curl',
    name: 'Nordic hamstring curl',
    category: 'legs',
    primaryGroups: ['hamstrings'],
    secondaryGroups: ['gluteus-maximus', 'calves', 'erector-spinae'],
  },
  {
    id: 'calf-raise',
    name: 'Calf raise',
    category: 'legs',
    primaryGroups: ['calves'],
    secondaryGroups: ['shin'],
  },
  {
    id: 'wall-sit',
    name: 'Wall sit',
    category: 'legs',
    primaryGroups: ['quadriceps'],
    secondaryGroups: ['gluteus-maximus', 'adductors', 'calves'],
  },
  {
    id: 'jump-squat',
    name: 'Jump squat',
    category: 'legs',
    primaryGroups: ['quadriceps', 'gluteus-maximus', 'calves'],
    secondaryGroups: ['hamstrings', 'adductors', 'erector-spinae'],
  },
  {
    id: 'plank',
    name: 'Plank',
    category: 'core',
    primaryGroups: ['rectus-abdominis', 'transversus-abdominis'],
    secondaryGroups: ['obliques', 'serratus-anterior', 'front-delt', 'gluteus-maximus', 'quadriceps'],
  },
  {
    id: 'side-plank',
    name: 'Side plank',
    category: 'core',
    primaryGroups: ['obliques', 'quadratus-lumborum'],
    secondaryGroups: ['gluteus-medius', 'transversus-abdominis', 'side-delt', 'adductors'],
  },
  {
    id: 'hollow-body-hold',
    name: 'Hollow body hold',
    category: 'core',
    primaryGroups: ['rectus-abdominis', 'hip-flexors'],
    secondaryGroups: ['obliques', 'transversus-abdominis', 'quadriceps'],
  },
  {
    id: 'hanging-leg-raise',
    name: 'Hanging leg raise',
    category: 'core',
    primaryGroups: ['rectus-abdominis', 'hip-flexors'],
    secondaryGroups: ['obliques', 'lats', 'forearm-flexors', 'quadriceps', 'adductors'],
  },
  {
    id: 'l-sit',
    name: 'L-sit',
    category: 'core',
    primaryGroups: ['rectus-abdominis', 'hip-flexors', 'triceps'],
    secondaryGroups: ['quadriceps', 'front-delt', 'lats', 'serratus-anterior'],
  },
  {
    id: 'crunch',
    name: 'Crunch',
    category: 'core',
    primaryGroups: ['rectus-abdominis'],
    secondaryGroups: ['obliques', 'hip-flexors', 'neck'],
  },
  {
    id: 'russian-twist',
    name: 'Russian twist',
    category: 'core',
    primaryGroups: ['obliques'],
    secondaryGroups: ['rectus-abdominis', 'transversus-abdominis', 'deep-spinal', 'hip-flexors'],
  },
  {
    id: 'superman',
    name: 'Superman / back extension',
    category: 'core',
    primaryGroups: ['erector-spinae', 'gluteus-maximus'],
    secondaryGroups: ['deep-spinal', 'quadratus-lumborum', 'hamstrings', 'rear-delt', 'trapezius'],
  },
  {
    id: 'bird-dog',
    name: 'Bird dog',
    category: 'core',
    primaryGroups: ['deep-spinal', 'erector-spinae'],
    secondaryGroups: ['gluteus-maximus', 'transversus-abdominis', 'obliques', 'rear-delt'],
  },
  {
    id: 'mountain-climber',
    name: 'Mountain climber',
    category: 'core',
    primaryGroups: ['hip-flexors', 'rectus-abdominis'],
    secondaryGroups: ['obliques', 'front-delt', 'quadriceps', 'serratus-anterior', 'triceps'],
  },
  {
    id: 'burpee',
    name: 'Burpee',
    category: 'core',
    primaryGroups: ['quadriceps', 'pectoralis-major', 'rectus-abdominis'],
    secondaryGroups: ['gluteus-maximus', 'triceps', 'front-delt', 'calves', 'hamstrings', 'hip-flexors'],
  },
  {
    id: 'human-flag',
    name: 'Human flag',
    category: 'core',
    primaryGroups: ['obliques', 'lats', 'side-delt'],
    secondaryGroups: ['quadratus-lumborum', 'rectus-abdominis', 'triceps', 'forearm-flexors', 'gluteus-medius'],
  },
];

export interface ExerciseInvolvement {
  exercise: Exercise;
  level: 'primary' | 'secondary';
}

/** Exercises that train the muscle behind a model mesh name, primary ones first. */
export function exercisesForMuscle(muscleName: string): ExerciseInvolvement[] {
  const groupIds = new Set(groupsForMuscle(muscleName).map((group) => group.id));
  if (groupIds.size === 0) return [];

  const involvements: ExerciseInvolvement[] = [];
  for (const exercise of EXERCISES) {
    if (exercise.primaryGroups.some((id) => groupIds.has(id))) {
      involvements.push({ exercise, level: 'primary' });
    } else if (exercise.secondaryGroups.some((id) => groupIds.has(id))) {
      involvements.push({ exercise, level: 'secondary' });
    }
  }
  return involvements.sort((a, b) => (a.level === b.level ? 0 : a.level === 'primary' ? -1 : 1));
}
