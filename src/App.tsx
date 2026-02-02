import { useState, useEffect } from 'react';
import { Cat as CatIcon, Sparkles } from 'lucide-react';
import { Cat } from './types';
import { generateCats } from './utils/catApi';
import { SwipeCard } from './components/SwipeCard';
import { Summary } from './components/Summary';

function App() {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [likedCats, setLikedCats] = useState<Cat[]>([]);
  const [showSummary, setShowSummary] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCats = async () => {
      setIsLoading(true);
      const generatedCats = generateCats();
      setCats(generatedCats);
      setTimeout(() => setIsLoading(false), 500);
    };
    loadCats();
  }, []);

  const handleSwipe = (liked: boolean) => {
    if (liked) {
      setLikedCats([...likedCats, cats[currentIndex]]);
    }

    if (currentIndex === cats.length - 1) {
      setTimeout(() => setShowSummary(true), 300);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setLikedCats([]);
    setShowSummary(false);
    const generatedCats = generateCats();
    setCats(generatedCats);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4 animate-bounce">
            <CatIcon className="w-10 h-10 text-pink-500" />
          </div>
          <p className="text-xl font-semibold text-gray-700">Loading adorable kitties...</p>
        </div>
      </div>
    );
  }

  if (showSummary) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex items-center justify-center py-12">
        <Summary likedCats={likedCats} totalCats={cats.length} onRestart={handleRestart} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50 flex flex-col">
      <header className="pt-8 pb-4 px-4">
        <div className="max-w-sm mx-auto text-center">
          <div className="inline-flex items-center gap-2 mb-2">
            <CatIcon className="w-8 h-8 text-pink-500" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Paws & Preferences
            </h1>
            <Sparkles className="w-6 h-6 text-purple-500" />
          </div>
          <p className="text-gray-600">Find your favorite kitty</p>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-4 pb-20">
        <div className="relative w-full max-w-sm h-[500px]">
          {cats.slice(currentIndex, currentIndex + 2).map((cat, index) => (
            <SwipeCard
              key={cat.id}
              cat={cat}
              onSwipe={handleSwipe}
              isTop={index === 0}
            />
          ))}

          {currentIndex >= cats.length && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-xl font-semibold text-gray-600">No more cats!</p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="fixed bottom-8 left-0 right-0 px-4">
        <div className="max-w-sm mx-auto bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">
              <span className="font-bold text-pink-600">{currentIndex + 1}</span> / {cats.length}
            </span>
            <span className="text-gray-600">
              <span className="font-bold text-green-600">{likedCats.length}</span> liked
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
