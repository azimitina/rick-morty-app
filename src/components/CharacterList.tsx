import { useEffect, useState } from 'react';
import type { Character } from '../types';
import { API_BASE_URL } from '../api/config';
import { Loading } from './Loading';
import { ErrorDisplay } from './ErrorDisplay';
import { CharacterCard } from './CharacterCard';

export const CharacterList = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/character`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCharacters(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch characters');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacters();
  }, []);

  return (
    <section className="bg-zinc-800 px-4 py-8">
      <div className="container max-w-7xl mx-auto">
        {loading ? (
          <Loading />
        ) : error ? (
          <ErrorDisplay message={error} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
            {characters.map((character) => (
              <CharacterCard key={character.id} character={character} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
