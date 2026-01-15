export interface Character {
  id: number;
  name: string;
  status: 'Alive' | 'Dead' | 'unknown';
  species: string;
  gender: string;
  image: string;
  origin: { name: string };
  location: { name: string };
}

export interface CharacterCardProps {
  character: Character;
}

export interface PaginationInfo {
  count: number;
  pages: number;
  next: string | null;
  prev: string | null;
}

export interface PaginationProps {
  currentPage: number;
  pageInfo: PaginationInfo | null;
  onPageChange: (page: number) => void;
}

export interface FilterControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}
