import { useEffect, useState, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Loading } from './Loading';
import { ErrorDisplay } from './ErrorDisplay';
import { CharacterCard } from './CharacterCard';
import type { Character, PaginationInfo } from '../types';
import { buildQueryString } from '../api/config';
import { Pagination } from '../components/Pagination';

export const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [pageInfo, setPageInfo] = useState<PaginationInfo | null>(null);

  const currentPage = parseInt(searchParams.get('page') || '1', 10) || 1;

  const updateUrl = useCallback(
    (page: number) => {
      const newParams = new URLSearchParams();

      if (page > 1) newParams.set('page', String(page));

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

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = buildQueryString({
          page: currentPage,
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
  }, [currentPage]);

  return (
    <section className="bg-zinc-800 px-4 py-8">
      <div className="container max-w-7xl mx-auto">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
              {characters.map((character) => (
                <CharacterCard key={character.id} character={character} />
              ))}
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
