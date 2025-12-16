import { useEffect, useState } from "react";
import { Crown, Star, Zap, Shield, Award, Sparkles, Gift, Calendar, Users, BarChart, Heart } from "lucide-react";

const PremiumWelcomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Animation on load
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          >
            <Sparkles size={20} className="text-amber-400 opacity-60" />
          </div>
        ))}
      </div>

      <div className={`max-w-4xl w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 transform transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
        
        {/* Header Section */}
        <div className="relative p-8 md:p-12 text-center bg-gradient-to-r from-blue-500 to-purple-600">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-1/4 w-72 h-72 bg-white rounded-full filter blur-3xl"></div>
            <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-purple-300 rounded-full filter blur-3xl"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-400 rounded-full animate-ping opacity-40"></div>
                <div className="relative bg-gradient-to-br from-amber-400 to-yellow-500 w-28 h-28 rounded-full flex items-center justify-center shadow-lg">
                  <Crown size={48} className="text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Welcome to Premium!</h1>
            <p className="text-blue-100 text-xl max-w-2xl mx-auto">
              You've joined an exclusive community of top-tier advertisers
            </p>
          </div>
        </div>

        <div className="p-8 md:p-12">
          {/* Appreciation Message */}
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Thank You for Choosing Excellence</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
              Your decision to upgrade to our Premium plan shows your commitment to quality and growth. 
              We're honored to be part of your success journey and can't wait to see your business thrive.
            </p>
          </div>

          {/* Premium Benefits */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100 hover:border-purple-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="text-blue-600 mb-4">
                <Zap size={32} />
              </div>
              <h3 className="text-gray-800 font-semibold text-xl mb-2">Priority Visibility</h3>
              <p className="text-gray-600">Your listings appear first in search results, getting you more customers faster.</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-100 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="text-purple-600 mb-4">
                <BarChart size={32} />
              </div>
              <h3 className="text-gray-800 font-semibold text-xl mb-2">Advanced Analytics</h3>
              <p className="text-gray-600">Get detailed insights into your ad performance and customer engagement.</p>
            </div>
            
            <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100 hover:border-amber-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="text-amber-600 mb-4">
                <Award size={32} />
              </div>
              <h3 className="text-gray-800 font-semibold text-xl mb-2">Premium Badge</h3>
              <p className="text-gray-600">Stand out with an exclusive badge that showcases your premium status.</p>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl p-6 border border-green-100 hover:border-green-300 transition-all duration-300 shadow-sm hover:shadow-md">
              <div className="text-green-600 mb-4">
                <Shield size={32} />
              </div>
              <h3 className="text-gray-800 font-semibold text-xl mb-2">Dedicated Support</h3>
              <p className="text-gray-600">Get priority access to our expert support team for personalized assistance.</p>
            </div>
          </div>

          {/* Exclusive Offer */}
          <div className="bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl p-6 mb-12 text-center border border-purple-200 shadow-sm">
            <div className="flex justify-center mb-4">
              <Gift size={48} className="text-amber-500" />
            </div>
            <h3 className="text-gray-800 font-bold text-2xl mb-2">Special Welcome Gift</h3>
            <p className="text-purple-700 mb-4">As a thank you, we've added an extra week to your subscription!</p>
            <div className="inline-flex items-center bg-white px-4 py-2 rounded-full border border-amber-200 shadow-sm">
              <Calendar size={20} className="text-amber-500 mr-2" />
              <span className="text-gray-800">Extended until {new Date(Date.now() + 95 * 24 * 60 * 60 * 1000).toLocaleDateString()}</span>
            </div>
          </div>

          {/* Community Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
              <Users size={24} className="text-blue-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">5,000+</div>
              <div className="text-gray-600 text-sm">Premium Members</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
              <Star size={24} className="text-amber-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">97%</div>
              <div className="text-gray-600 text-sm">Satisfaction Rate</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
              <Zap size={24} className="text-purple-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">3.2x</div>
              <div className="text-gray-600 text-sm">More Visibility</div>
            </div>
            <div className="bg-white rounded-xl p-4 text-center border border-gray-200 shadow-sm">
              <Heart size={24} className="text-pink-500 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gray-800">24/7</div>
              <div className="text-gray-600 text-sm">Priority Support</div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="text-center">
            <h3 className="text-gray-800 text-2xl font-bold mb-6">Ready to Maximize Your Premium Experience?</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-1">
                <Zap size={20} />
                Explore Premium Features
              </button>
              <button className="bg-white hover:bg-gray-50 text-gray-800 font-medium py-3 px-8 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 border border-gray-300 shadow-sm hover:shadow-md">
                <BarChart size={20} />
                View Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 text-sm flex items-center justify-center gap-1">
          Made with <Heart size={14} className="text-pink-500" /> for our premium members
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
          50% { transform: translateY(-15px) rotate(5deg); opacity: 0.7; }
          100% { transform: translateY(0) rotate(0deg); opacity: 0.4; }
        }
        .animate-float {
          animation: float 10s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default PremiumWelcomePage;