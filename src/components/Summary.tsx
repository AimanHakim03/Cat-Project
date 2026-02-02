import { Cat } from '../types';
import { Heart, RotateCcw } from 'lucide-react';

interface SummaryProps {
  likedCats: Cat[];
  totalCats: number;
  onRestart: () => void;
}

export const Summary = ({ likedCats, totalCats, onRestart }: SummaryProps) => {
  const likedCount = likedCats.length;
  const likedPercentage = Math.round((likedCount / totalCats) * 100);

  return (
    <div className="w-full max-w-4xl mx-auto px-4">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-pink-500 to-rose-500 rounded-full mb-4">
          <Heart className="w-10 h-10 text-white fill-white" />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Your Results</h1>
        <p className="text-xl text-gray-600">
          You liked <span className="font-bold text-pink-600">{likedCount}</span> out of{' '}
          <span className="font-bold">{totalCats}</span> cats
        </p>
        <p className="text-lg text-gray-500 mt-2">
          That's {likedPercentage}% approval rate!
        </p>
      </div>

      {likedCount > 0 ? (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            Your Favorite Kitties
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
            {likedCats.map((cat) => (
              <div
                key={cat.id}
                className="relative group overflow-hidden rounded-xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <img
                  src={cat.imageUrl}
                  alt="Liked cat"
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-3">
                  <Heart className="w-6 h-6 text-white fill-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center mb-8 p-8 bg-gray-50 rounded-2xl">
          <p className="text-xl text-gray-600">
            No cats won your heart this time! 😿
          </p>
          <p className="text-gray-500 mt-2">Maybe try again with a fresh perspective?</p>
        </div>
      )}

      <div className="text-center">
        <button
          onClick={onRestart}
          className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95"
        >
          <RotateCcw className="w-5 h-5" />
          Start Over
        </button>
      </div>
    </div>
  );
};
