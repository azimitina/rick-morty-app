import { useEffect, useState, useCallback, useMemo } from 'react';
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
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const currentPage = parseInt(searchParams.get('page') || '1', 10) || 1;
  const searchTerm = searchParams.get('name') || '';
  const status = searchParams.get('status') || '';
  const species = searchParams.get('species') || '';

  const updateUrl = useCallback(
    (page: number, name: string, statusVal: string, speciesVal: string) => {
      const newParams = new URLSearchParams();

      if (page > 1) newParams.set('page', String(page));
      if (name) newParams.set('name', name);
      if (statusVal) newParams.set('status', statusVal);
      if (speciesVal) newParams.set('species', speciesVal);

      setSearchParams(newParams);
    },
    [setSearchParams]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      updateUrl(page, searchTerm, status, species);
    },
    [searchTerm, status, species, updateUrl]
  );

  const handleSearchChange = useCallback(
    (newSearch: string) => {
      updateUrl(1, newSearch, status, species);
    },
    [status, species, updateUrl]
  );

  const handleStatusChange = useCallback(
    (newStatus: string) => {
      updateUrl(1, searchTerm, newStatus, species);
    },
    [searchTerm, species, updateUrl]
  );

  const handleSpeciesChange = useCallback(
    (newSpecies: string) => {
      updateUrl(1, searchTerm, status, newSpecies);
    },
    [searchTerm, status, updateUrl]
  );

  const handleClearAll = useCallback(() => {
    updateUrl(1, '', '', '');
  }, [updateUrl]);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = buildQueryString({
          page: currentPage,
          name: searchTerm || undefined,
          status: (status as 'alive' | 'dead' | 'unknown' | undefined) || undefined,
          species: species || undefined,
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
  }, [currentPage, searchTerm, status, species]);

  const sortedCharacters = useMemo(() => {
    return [...characters].sort((a, b) => {
      const cmp = a.name.localeCompare(b.name);
      return sortDirection === 'asc' ? cmp : -cmp;
    });
  }, [characters, sortDirection]);

  return (
    <section className="px-4 py-8">
      <div className="container max-w-7xl mx-auto">
        <h2 className="text-l font-bold text-gray-500 mb-6">
          Characters
          {pageInfo ? ` (${pageInfo.count} total • Page ${currentPage} of ${pageInfo.pages})` : ''}
        </h2>

        <FilterControls
          searchTerm={searchTerm}
          status={status}
          species={species}
          sortDirection={sortDirection}
          onSearchChange={handleSearchChange}
          onStatusChange={handleStatusChange}
          onSpeciesChange={handleSpeciesChange}
          onSortToggle={() => setSortDirection((d) => (d === 'asc' ? 'desc' : 'asc'))}
          onClearAll={handleClearAll}
        />

        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
              {sortedCharacters.length === 0 ? (
                <p className="text-zinc-400 col-span-2 text-center py-8">
                  No characters found matching your search.
                </p>
              ) : (
                sortedCharacters.map((character) => (
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
