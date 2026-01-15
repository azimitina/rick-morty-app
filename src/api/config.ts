export const API_BASE_URL = 'https://rickandmortyapi.com/api';
export const CHARACTER_ENDPOINT = `${API_BASE_URL}/character`;

export const buildQueryString = (params: { page?: number; name?: string }) => {
  const searchParams = new URLSearchParams();

  if (params.page && params.page > 1) {
    searchParams.set('page', String(params.page));
  }
  if (params.name) {
    searchParams.set('name', params.name);
  }

  const queryString = searchParams.toString();
  return queryString ? `${CHARACTER_ENDPOINT}?${queryString}` : CHARACTER_ENDPOINT;
};
