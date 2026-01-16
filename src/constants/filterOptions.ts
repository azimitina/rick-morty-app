export const STATUS_OPTIONS = ['', 'alive', 'dead', 'unknown'] as const;

export const STATUS_LABELS: Record<string, string> = {
  '': 'All Status',
  alive: 'Alive',
  dead: 'Dead',
  unknown: 'Unknown',
};

export const SPECIES_OPTIONS = [
  '',
  'human',
  'alien',
  'humanoid',
  'robot',
  'animal',
  'mythological creature',
  'poopybutthole',
  'cronenberg',
] as const;

export const SPECIES_LABELS: Record<string, string> = {
  '': 'All Species',
  human: 'Human',
  alien: 'Alien',
  humanoid: 'Humanoid',
  robot: 'Robot',
  animal: 'Animal',
  'mythological creature': 'Mythological Creature',
  poopybutthole: 'Poopybutthole',
  cronenberg: 'Cronenberg',
};
