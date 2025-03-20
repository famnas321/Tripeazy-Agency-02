import React from 'react'

function Sample() {
 return (
    <div className="py-10 px-5">
  <h2 className="text-2xl font-bold text-center text-purple-600 mb-6">Features Posts</h2>
  <div className="overflow-x-auto">
    <div className="flex space-x-6 w-max px-4">
      
      {yourData.map((post, index) => (
        <div key={index} className="w-80 bg-white rounded-lg shadow-md overflow-hidden">
       
          {post.img && (
            <img src={post.img} alt="Post" className="w-full h-40 object-cover" />
          )}
          <div className="p-4">
        
            <span className={`px-3 py-1 text-sm font-semibold rounded ${post.categoryColor}`}>
              {post.category}
            </span>
            
            <h3 className="mt-2 text-lg font-semibold">{post.title}</h3>
           
            <p className="text-gray-600 text-sm mt-1">{post.description}</p>
            
            <a href="#" className="text-purple-600 font-semibold text-sm mt-2 inline-block">Read More →</a>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
  );
}

export default Sample
