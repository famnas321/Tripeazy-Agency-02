import { Star, ChevronLeft, ChevronRight, User } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

const reviews = [
  {
    name: 'John Doe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    review: 'Amazing experience! Everything was smooth and on time.',
    rating: 5,
    color: 'from-pink-400 to-red-400'
  },
  {
    name: 'Jane Smith',
    avatar: 'https://i.pravatar.cc/150?img=2',
    review: 'Very helpful staff and great service. Would recommend!',
    rating: 4,
    color: 'from-cyan-400 to-blue-500'
  },
  {
    name: 'Michael Johnson',
    avatar: 'https://i.pravatar.cc/150?img=3',
    review: 'Not bad, but could improve customer support.',
    rating: 3,
    color: 'from-yellow-400 to-orange-400'
  },
  {
    name: 'Alice Brown',
    avatar: 'https://i.pravatar.cc/150?img=4',
    review: 'Super easy booking process. Will use again!',
    rating: 5,
    color: 'from-purple-500 to-indigo-500'
  },
  {
    name: 'David Lee',
    avatar: 'https://i.pravatar.cc/150?img=5',
    review: 'Affordable prices and reliable service.',
    rating: 4,
    color: 'from-teal-400 to-green-400'
  }
];

const ReviewSection = () => {
  const scrollRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scroll = (direction) => {
    const container = scrollRef.current;
    const scrollAmount = 320;

    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const container = scrollRef.current;
    const handleScroll = () => {
      const scrollLeft = container.scrollLeft;
      const width = container.offsetWidth;
      const index = Math.round(scrollLeft / 320);
      setActiveIndex(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gray-100 py-16 relative">
      <h2 className="text-center text-gray-800 text-3xl font-bold mb-12 tracking-wide">Customer Reviews</h2>

      {/* Scroll Buttons */}
      <button
        onClick={() => scroll('left')}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-800 p-3 rounded-full z-10 shadow-lg hover:bg-gray-400 transition"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={() => scroll('right')}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-300 text-gray-800 p-3 rounded-full z-10 shadow-lg hover:bg-gray-400 transition"
      >
        <ChevronRight size={24} />
      </button>

      {/* Scroll Container */}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-8 px-10 scroll-smooth snap-x snap-mandatory"
      >
        {reviews.map((item, index) => (
          <div
            key={index}
            className={`snap-center shrink-0 w-[280px] md:w-[300px] rounded-2xl p-6 text-white transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 cursor-pointer relative bg-gradient-to-br ${item.color} ${
              index === activeIndex
                ? 'scale-105 ring-2 ring-offset-2 ring-white/60'
                : 'opacity-90'
            }`}
          >
            <div className="flex items-center gap-4 mb-4">
              {item.avatar ? (
                <img src={item.avatar} alt={item.name} className="w-12 h-12 rounded-full ring-2 ring-white" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
                  <User className="text-white" />
                </div>
              )}
              <div>
                <p className="font-semibold text-lg">{item.name}</p>
                <p className="text-xs text-white/90">Rated {item.rating}/5</p>
              </div>
            </div>

            <hr className="border-white/40 my-3" />

            <p className="text-sm text-white/90 mb-4 italic">"{item.review}"</p>

            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < item.rating ? 'text-yellow-300' : 'text-white/30'}
                  fill={i < item.rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;
