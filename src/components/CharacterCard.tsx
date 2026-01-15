import { memo } from 'react';
import { Link } from 'react-router-dom';
import { getStatusColor } from '../utils/helpers';
import type { CharacterCardProps } from '../types';

export const CharacterCard = memo(({ character }: CharacterCardProps) => {
  const { name, image, status, species, origin, location, id } = character;
  return (
    <Link
      to={`/character/${id}`}
      className="bg-zinc-700 rounded-xl shadow-md overflow-hidden flex hover:bg-zinc-600 transition-colors cursor-pointer"
    >
      <img src={image} className="w-40 h-auto object-cover rounded-l-xl flex-shrink-0" />
      <div className="p-4 flex flex-col justify-center space-y-3">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}></span>
          <span className="text-sm text-white">
            {status} - {species}
          </span>
        </div>
        <div>
          <p className="text-xs text-zinc-400">Last known location:</p>
          <p className="text-sm text-white">{location.name}</p>
        </div>
        <div>
          <p className="text-xs text-zinc-400">First seen in:</p>
          <p className="text-sm text-white">{origin.name}</p>
        </div>
      </div>
    </Link>
  );
});
