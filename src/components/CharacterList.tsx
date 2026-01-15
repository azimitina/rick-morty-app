import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading } from './Loading';
import { ErrorDisplay } from './ErrorDisplay';
import { CharacterCard } from './CharacterCard';
import type { Character, PaginationInfo } from '../types';
import { buildQueryString } from '../api/config';
import { Pagination } from '../components/Pagination';
import { FilterControls } from '../components/FilterControls';

export const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState<PaginationInfo | null>(null);

  const currentPage = parseInt(searchParams.get('page') || '1', 10) || 1;
  const searchTerm = searchParams.get('name') || '';

  const updateUrl = useCallback(
    (page: number, search?: string) => {
      const newParams = new URLSearchParams();

      if (page > 1) newParams.set('page', String(page));
      if (search) newParams.set('name', search);

      setSearchParams(newParams);
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateUrl(page);
    },
    [updateUrl]
  );

  const handleSearchChange = useCallback(
    (newSearch: string) => {
      updateUrl(1, newSearch);
    },
    [updateUrl]
  );

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = buildQueryString({
          page: currentPage,
          name: searchTerm || undefined,
        });
        const response = await fetch(apiUrl);

        if (response.status === 404) {
          setCharacters([]);
          setPageInfo(null);
          return;
        }

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCharacters(data.results);

        setPageInfo(data.info);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, [currentPage, searchTerm]);

  return (
    <section className="bg-zinc-800 px-4 py-8">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-l font-bold text-gray-500 mb-6">
          Characters
          {pageInfo ? ` (${pageInfo.count} total • Page ${currentPage} of ${pageInfo.pages})` : ''}
        </h2>
        <FilterControls searchTerm={searchTerm} onSearchChange={handleSearchChange} />
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
              {characters.length === 0 ? (
                <p className="text-zinc-400 col-span-2 text-center py-8">
                  No characters found matching your search.
                </p>
              ) : (
                characters.map((character) => (
                  <CharacterCard key={character.id} character={character} />
                ))
              )}
            </div>
            <Pagination
              currentPage={currentPage}
              pageInfo={pageInfo}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </section>
  );
};
