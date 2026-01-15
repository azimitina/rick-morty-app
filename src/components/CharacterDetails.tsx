import type { Character } from '../types';
import { getStatusColor } from '../utils/helpers';

export const CharacterDetails = ({ character }: { character: Character }) => {
  const { name, image, status, species, gender, origin, location, id } = character;

  return (
    <div className="bg-zinc-700 rounded-2xl shadow-xl overflow-hidden">
      <div className="sm:flex">
        <div className="sm:w-1/3">
          <img src={image} alt={name} className="w-full h-full object-cover" />
        </div>

        <div className="p-6 sm:p-8 sm:w-2/3">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-white">{name}</h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium text-white ${getStatusColor(status)}`}
            >
              {status}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
                  Species
                </h3>
                <p className="text-lg text-white">{species}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
                  Gender
                </h3>
                <p className="text-lg text-white">{gender}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
                  Origin
                </h3>
                <p className="text-lg text-white">{origin.name}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium text-zinc-400 uppercase tracking-wider">
                  Last Known Location
                </h3>
                <p className="text-lg text-white">{location.name}</p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-zinc-600">
            <p className="text-zinc-400 text-sm">
              Character ID: <span className="text-white font-mono">{id}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
