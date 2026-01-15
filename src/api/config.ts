export const API_BASE_URL = 'https://rickandmortyapi.com/api';
export const CHARACTER_ENDPOINT = `${API_BASE_URL}/character`;

export const buildQueryString = (params: {
  page?: number;
  name?: string;
  status?: 'alive' | 'dead' | 'unknown';
  species?: string;
}) => {
  const searchParams = new URLSearchParams();

  if (params.page && params.page > 1) {
    searchParams.set('page', String(params.page));
  }
  if (params.name) {
    searchParams.set('name', params.name);
  }
  if (params.status) {
    searchParams.set('status', params.status);
  }
  if (params.species) {
    searchParams.set('species', params.species);
  }

  const queryString = searchParams.toString();
  return queryString ? `${CHARACTER_ENDPOINT}?${queryString}` : CHARACTER_ENDPOINT;
};
