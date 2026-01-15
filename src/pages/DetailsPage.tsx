import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { API_BASE_URL } from '../api/config';
import { CharacterDetails } from '../components/CharacterDetails';
import { Loading } from '../components/Loading';
import { ErrorDisplay } from '../components/ErrorDisplay';
import type { Character } from '../types';

export const DetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const [character, setCharacter] = useState<Character | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/character/${id}`);

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Character not found');
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Character = await response.json();
        setCharacter(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch character');
      } finally {
        setLoading(false);
      }
    };

    fetchCharacter();
  }, [id]);

  return (
    <section className="bg-zinc-800 min-h-screen px-4 py-8">
      <div className="container mx-auto max-w-4xl">
        {loading ? (
          <Loading />
        ) : error || !character ? (
          <ErrorDisplay message={error} />
        ) : (
          <>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 mt-6 mb-6 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Characters
            </Link>
            <CharacterDetails character={character} />
          </>
        )}
      </div>
    </section>
  );
};
