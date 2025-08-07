import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User } from 'lucide-react';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const searchQuery = searchParams.get('q') || '';
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('https://blog-backend-ly16.onrender.com/api/posts');
        setPosts(res.data);
      } catch (err) {
        console.error('Failed to fetch posts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  function formatDateToReadableString(isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const sortedPosts = [...posts].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  const filteredPosts = sortedPosts.filter((post) => {
    const title = post.title.toLowerCase();
    const description = post.description?.toLowerCase() || '';
    const terms = searchQuery.toLowerCase().split(' ').filter(Boolean);

    return terms.every((term) =>
      title.includes(term) || description.includes(term)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="m-4 lg:mx-[25%] md:mx-4 flex flex-col mt-20">
      <div className=''>
        <h3 className="text-xl font-semibold">Latest Blog Posts</h3>
        <h3 className="text-gray-500 font-light mt-2">
          Discover insights, tutorials, and stories from our community of writers.
        </h3>

        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => {
            const val = e.target.value;
            setSearchTerm(val);
            setSearchParams(val ? { q: val } : {});
          }}
          className="focus:outline-none bg-gray-100 px-3 py-1 rounded mt-4 w-full"
        />
      </div>

      {filteredPosts.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No posts found.</p>
      )}
      <div className=' mt-2 hide-scrollbar overflow-y-auto max-h-[80vh] s'>
        {filteredPosts.map((post) => (
          <div
            key={post._id}
            onClick={() => navigate(`/post/${post._id}`)}
            className="cursor-pointer border mt-5 flex flex-col gap-12 border-gray-200 rounded-xl h-auto p-2 mx-2 hover:shadow-lg"
          >
            <div className="flex flex-row gap-2">
              <div className="bg-gray-200 p-2 w-9 rounded-full">
                <User size={20} />
              </div>
              <div className="flex flex-col text-xs m-1">
                <h4>{post.authorName || 'Unknown'}</h4>
                <p className="text-[9px] text-gray-500">
                  {formatDateToReadableString(post.timestamp)}
                </p>
              </div>
            </div>

            <div className="m-2">
              <h2>{post.title}</h2>
              <h4 className="text-sm text-gray-500">{post.description}</h4>
              <div className="flex flex-row gap-2 mt-2">
                {post.tags?.map((tag, i) => (
                  <span
                    key={i}
                    className="inline-block bg-gray-200 text-black text-xs px-2.5 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ); 
};

export default Home;
