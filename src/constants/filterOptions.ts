export const STATUS_OPTIONS = ['', 'alive', 'dead', 'unknown'] as const;

export const STATUS_LABELS: Record<string, string> = {
  '': 'All Status',
  alive: 'Alive',
  dead: 'Dead',
  unknown: 'Unknown',
};

export const SPECIES_OPTIONS = [
  '',
  'Human',
  'Alien',
  'Humanoid',
  'Robot',
  'Animal',
  'Mythological Creature',
  'Poopybutthole',
  'Cronenberg',
] as const;

export const SPECIES_LABELS: Record<string, string> = {
  '': 'All Species',
  Human: 'Human',
  Alien: 'Alien',
  Humanoid: 'Humanoid',
  Robot: 'Robot',
  Animal: 'Animal',
  'Mythological Creature': 'Mythological Creature',
  Poopybutthole: 'Poopybutthole',
  Cronenberg: 'Cronenberg',
};
