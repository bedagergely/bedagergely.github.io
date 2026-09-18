export interface MuscleGroup {
  id: string;
  name: string;
  /** Anatomical names as they appear in the model, without the (left)/(right) suffix. */
  muscles: string[];
}

export const MUSCLE_GROUPS: MuscleGroup[] = [
  {
    id: 'lats',
    name: 'Latissimus dorsi',
    muscles: ['Latissimus dorsi muscle'],
  },
  {
    id: 'trapezius',
    name: 'Trapezius',
    muscles: [
      'Descending part of trapezius muscle',
      'Transverse part of trapezius muscle',
      'Ascending part of trapezius muscle',
    ],
  },
  {
    id: 'rhomboids',
    name: 'Rhomboids',
    muscles: ['Rhomboid major muscle', 'Rhomboid minor muscle', 'Levator scapulae'],
  },
  {
    id: 'teres-major',
    name: 'Teres major',
    muscles: ['Teres major muscle'],
  },
  {
    id: 'rotator-cuff',
    name: 'Rotator cuff',
    muscles: [
      'Supraspinatus muscle',
      'Infraspinatus muscle',
      'Teres minor muscle',
      'Subscapularis muscle',
    ],
  },
  {
    id: 'pectoralis-major',
    name: 'Pectoralis major',
    muscles: [
      'Clavicular head of pectoralis major muscle',
      'Sternocostal head of pectoralis major muscle',
      'Abdominal part of pectoralis major muscle',
    ],
  },
  {
    id: 'pectoralis-minor',
    name: 'Pectoralis minor',
    muscles: ['Pectoralis minor muscle', 'Subclavius muscle'],
  },
  {
    id: 'serratus-anterior',
    name: 'Serratus anterior',
    muscles: ['Serratus anterior muscle'],
  },
  {
    id: 'front-delt',
    name: 'Anterior deltoid',
    muscles: ['Clavicular part of deltoid muscle'],
  },
  {
    id: 'side-delt',
    name: 'Lateral deltoid',
    muscles: ['Acromial part of deltoid muscle'],
  },
  {
    id: 'rear-delt',
    name: 'Posterior deltoid',
    muscles: ['Scapular spinal part of deltoid muscle'],
  },
  {
    id: 'biceps',
    name: 'Biceps brachii',
    muscles: ['Long head of biceps brachii', 'Short head of biceps brachii'],
  },
  {
    id: 'brachialis',
    name: 'Brachialis & brachioradialis',
    muscles: ['Brachialis muscle', 'Brachioradialis muscle'],
  },
  {
    id: 'triceps',
    name: 'Triceps brachii',
    muscles: [
      'Long head of triceps brachii',
      'Lateral head of triceps brachii',
      'Medial head of triceps brachii',
      'Anconeus muscle',
    ],
  },
  {
    id: 'coracobrachialis',
    name: 'Coracobrachialis',
    muscles: ['Coracobrachialis muscle'],
  },
  {
    id: 'forearm-flexors',
    name: 'Forearm flexors & grip',
    muscles: [
      'Flexor carpi radialis',
      'Humeral head of flexor carpi ulnaris',
      'Ulnar head of flexor carpi ulnaris',
      'Palmaris longus muscle',
      'Humero-ulnar head of flexor digitorum superficialis',
      'Radial head of flexor digitorum superficialis',
      'Flexor digitorum profundus',
      'Flexor pollicis longus',
    ],
  },
  {
    id: 'forearm-extensors',
    name: 'Forearm extensors',
    muscles: [
      'Extensor carpi radialis longus',
      'Extensor carpi radialis brevis',
      'Extensor digitorum',
      'Extensor digiti minimi',
      'Humeral head of extensor carpi ulnaris',
      'Ulnar head of extensor carpi ulnaris',
    ],
  },
  {
    id: 'rectus-abdominis',
    name: 'Rectus abdominis',
    muscles: ['Rectus abdominis muscle', 'Pyramidalis muscle'],
  },
  {
    id: 'obliques',
    name: 'Obliques',
    muscles: ['External abdominal oblique muscle', 'Internal abdominal oblique muscle'],
  },
  {
    id: 'transversus-abdominis',
    name: 'Transversus abdominis',
    muscles: ['Transversus abdominis muscle'],
  },
  {
    id: 'erector-spinae',
    name: 'Erector spinae',
    muscles: [
      'Iliocostalis lumborum muscle',
      'Iliocostalis thoracis muscle',
      'Iliocostalis colli muscle',
      'Longissimus thoracis muscle',
      'Longissimus colli muscle',
      'Longissimus capitis muscle',
      'Spinalis thoracis muscle',
      'Spinalis colli muscle',
      'Spinalis capitis muscle',
    ],
  },
  {
    id: 'deep-spinal',
    name: 'Deep spinal stabilisers',
    muscles: [
      'Multifidus lumborum muscle',
      'Multifidus thoracis muscle',
      'Multifidus colli muscle',
      'Semispinalis thoracis muscle',
      'Semispinalis colli muscle',
      'Rotatores',
      'Interspinales lumborum muscles',
      'Interspinales thoracis muscles',
      'Interspinales colli muscles',
    ],
  },
  {
    id: 'quadratus-lumborum',
    name: 'Quadratus lumborum',
    muscles: ['Quadratus lumborum muscle'],
  },
  {
    id: 'hip-flexors',
    name: 'Hip flexors',
    muscles: ['Psoas major', 'Iliacus muscle', 'Pectineus muscle', 'Sartorius muscle'],
  },
  {
    id: 'gluteus-maximus',
    name: 'Gluteus maximus',
    muscles: ['Gluteus maximus muscle'],
  },
  {
    id: 'gluteus-medius',
    name: 'Gluteus medius & minimus',
    muscles: ['Gluteus medius muscle', 'Gluteus minimus muscle'],
  },
  {
    id: 'deep-hip-rotators',
    name: 'Deep hip rotators',
    muscles: [
      'Piriformis muscle',
      'Obturator internus',
      'Obturator externus',
      'Superior gemellus muscle',
      'Inferior gemellus muscle',
      'Quadratus femoris muscle',
    ],
  },
  {
    id: 'quadriceps',
    name: 'Quadriceps',
    muscles: [
      'Rectus femoris muscle',
      'Vastus lateralis muscle',
      'Vastus medialis muscle',
      'Vastus intermedius muscle',
    ],
  },
  {
    id: 'hamstrings',
    name: 'Hamstrings',
    muscles: [
      'Long head of biceps femoris',
      'Short head of biceps femoris',
      'Semitendinosus muscle',
      'Semimembranosus muscle',
    ],
  },
  {
    id: 'adductors',
    name: 'Adductors',
    muscles: [
      'Adductor longus',
      'Adductor brevis',
      'Adductor magnus',
      'Adductor minimus',
      'Gracilis muscle',
    ],
  },
  {
    id: 'calves',
    name: 'Calves',
    muscles: [
      'Medial head of gastrocnemius',
      'Lateral head of gastrocnemius',
      'Soleus muscle',
      'Plantaris muscle',
    ],
  },
  {
    id: 'shin',
    name: 'Tibialis & fibularis',
    muscles: [
      'Tibialis anterior muscle',
      'Tibialis posterior muscle',
      'Fibularis longus muscle',
      'Fibularis brevis muscle',
      'Fibularis tertius muscle',
    ],
  },
  {
    id: 'neck',
    name: 'Neck',
    muscles: [
      'Sternocleidomastoid muscle',
      'Splenius capitis muscle',
      'Splenius colli muscle',
      'Scalenus anterior muscle',
      'Scalenus medius muscle',
      'Scalenus posterior muscle',
      'Longus colli muscle',
      'Longus capitis muscle',
    ],
  },
  {
    id: 'breathing',
    name: 'Diaphragm & intercostals',
    muscles: [
      'Diaphragm',
      'External intercostal muscles',
      'Internal intercostal muscles',
      'Innermost intercostal muscles',
      'Serratus posterior superior muscle',
      'Serratus posterior inferior muscle',
    ],
  },
];

/**
 * Model names carry side suffixes, optional wrapping parentheses and — once loaded by
 * GLTFLoader — underscores instead of spaces. Reduce all of that to a comparable key.
 */
export function normalizeMuscleName(name: string): string {
  return name
    .replace(/_/g, ' ')
    .replace(/\s*\((left|right)\)\s*$/i, '')
    .replace(/^\((.*)\)$/, '$1')
    .trim()
    .toLowerCase();
}

const GROUPS_BY_MUSCLE = new Map<string, MuscleGroup[]>();
for (const group of MUSCLE_GROUPS) {
  for (const muscle of group.muscles) {
    const key = normalizeMuscleName(muscle);
    const groups = GROUPS_BY_MUSCLE.get(key) ?? [];
    groups.push(group);
    GROUPS_BY_MUSCLE.set(key, groups);
  }
}

export function groupsForMuscle(muscleName: string): MuscleGroup[] {
  return GROUPS_BY_MUSCLE.get(normalizeMuscleName(muscleName)) ?? [];
}

export function musclesForGroups(groupIds: string[]): string[] {
  const muscles: string[] = [];
  for (const id of groupIds) {
    const group = MUSCLE_GROUPS.find((candidate) => candidate.id === id);
    if (group) muscles.push(...group.muscles);
  }
  return muscles;
}
