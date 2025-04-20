import { useEffect, useRef, useState, useCallback } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { fetchAddedPackages } from "../../services/authService";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Skeletoncom from "../Skeleton";
import Like from "src/Additional/Like";
import SaveToggle from "src/Additional/Save";

const tabs = [
  { name: "Packages", path: "/posts" },
  { name: "Organized", path: "/posts/package/organized" },
  { name: "Guides", path: "/posts/package/guides" },
];

const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

const Navigation = () => {
  const [loading, setLoading] = useState(false);
  const [fetchedData, setFetchedData] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialLoadComplete, setInitialLoadComplete] = useState(false);

  const observer = useRef();
  const pageRef = useRef(1);
  const initialFetchDone = useRef(false); 

  const navigate = useNavigate();

  const fetchPackages = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
     
      const response = await fetchAddedPackages(pageRef.current, 4);
      if (response?.fetchedAgency?.length > 0) {
        setFetchedData((prev) => [...prev, ...response.fetchedAgency]);
        if (response.fetchedAgency.length < 4) {
          setHasMore(false);
        } else {
          pageRef.current += 1;
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Failed to fetch packages:", error);
    } finally {
      setLoading(false);
      setInitialLoadComplete(true);
    }
  }, [loading, hasMore]);


  useEffect(() => {
    if (!initialFetchDone.current) {
      initialFetchDone.current = true;
      fetchPackages();
    }
  }, [fetchPackages]);

   console.log(fetchedData, "this is data");
   
  const lastItemRef = useCallback(
    (node) => {
      if (loading || !initialLoadComplete) return; 
      if (observer.current) observer.current.disconnect();// this clean  previous observer

      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting && hasMore && !loading) {
            fetchPackages();
          }
        },
        { threshold: 0.5 }
      );

      if (node) observer.current.observe(node);
    },
    [fetchPackages, loading, hasMore, initialLoadComplete]
  );

  const handleNavigation = (id) => {
    const props = fetchedData.find((item) => item._id === id);
    navigate("/posts/package/more", { state: props });
  };

  const categories = [
    { destinationCategory: "All" },
    { destinationCategory: "Historical Places" },
    { destinationCategory: "Top Cities" },
    { destinationCategory: "Industries" },
    { destinationCategory: "Beach" },
    { destinationCategory: "Forest" },
    { destinationCategory: "Adventure" },
  ];

  return (
    <div className="w-full">
      {/* Navigation Tabs */}
      <div className="mt-4 flex justify-center items-center space-x-6 shadow-md bg-white h-16 sticky top-0 z-50">
        {tabs.map((tab) => (
          <NavLink
            key={tab.name}
            to={tab.path}
            className={({ isActive }) =>
              `text-gray-800 transition-colors ${
                isActive
                  ? "text-blue-600 font-bold"
                  : "hover:text-blue-500 hover:font-semibold"
              }`
            }
          >
            {tab.name}
          </NavLink>
        ))}
      </div>


      <div className="flex justify-center p-4">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search packages..."
          className="w-1/2 p-2 border border-gray-300 rounded-lg"
        />
      </div>

      
      <div className="flex flex-wrap gap-2 p-4 justify-center">
        {categories.map((category, index) => (
          <button
            key={index}
            className="text-white px-4 py-2 text-sm rounded-full transition duration-300 w-32 h-10 flex items-center justify-center truncate bg-purple-700 hover:bg-blue-950"
          >
            {category.destinationCategory}
          </button>
        ))}
      </div>

      
      <div className="py-10 px-5">
        <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">
          Featured Posts
        </h2>

        {!initialLoadComplete && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeletoncom key={i} />
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {fetchedData.map((post, index) => {
            const isLastItem = fetchedData.length === index + 1;
            return (
              <div
                key={post._id}
                ref={isLastItem ? lastItemRef : null}
                className="w-full bg-white rounded-lg shadow-md overflow-hidden transition-all duration-500 ease-in-out hover:shadow-xl hover:-translate-y-1"
              >
                {post.images && (
                  <Slider {...sliderSettings}>
                    {post.images.map((img, i) => (
                      <div key={i}>
                        <img
                          src={img}
                          alt={`Post ${i + 1}`}
                          className="w-full h-40 object-cover"
                        />
                      </div>
                    ))}
                  </Slider>
                )}
                <div className="p-4">
                  <span className="px-3 py-1 text-sm font-semibold rounded">
                    {post.destination}
                  </span>
                  <h3 className="mt-2 text-lg font-semibold">
                    {post.destinationCategory}
                  </h3>
                  <h3 className="mt-2 text-lg font-semibold">
                    {post.agencyId?.companyName}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {post.packageDescription.length >100 ? post.packageDescription.slice(0,100)+"...":post.packageDescription }
                  </p>
                  <div className="flex items-center justify-between mt-2">
                    <button
                      onClick={() => handleNavigation(post._id)}
                      className="text-purple-600 font-semibold text-sm"
                    >
                      Read More →
                    </button>
                    <div className="flex items-center gap-2">
                      <Like />
                      <SaveToggle />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {loading && initialLoadComplete && (
          <div className="text-center py-4 font-semibold text-gray-500">
            Loading more...
          </div>
        )}
        {!hasMore && (
          <div className="text-center py-4 font-medium text-gray-500">
            You've reached the end.
          </div>
        )}
      </div>

      <div style={{ height: "100px" }}></div>

      {/* Floating Add Button */}
      <div className="fixed bottom-5 right-5">
        <a
          href="/addPackage"
          className="bg-blue-500 text-white text-3xl w-16 h-16 flex items-center justify-center rotate-45 rounded-3xl"
        >
          ×
        </a>
      </div>
    </div>
  );
};

export default Navigation;