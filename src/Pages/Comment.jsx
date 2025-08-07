import React, { useState, useEffect } from 'react';
import { User } from 'lucide-react';
import { useAuth } from '../Hooks/useAuth';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';


const Comment = () => {
  const { user } = useAuth();
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await axios.get(`https://blog-backend-ly16.onrender.com/api/posts/${postId}/comments`);
        setComments(res.data);
      } catch (err) {
        toast.error('Failed to load comments');
      }
    };

    fetchComments();
  }, [postId]);

  const handleComment = async () => {
  if (!user) {
    toast.info('Please login to comment.');
    navigate('/login');
    return;
  }

  if (!comment.trim()) {
    toast.warning('Write something for the comment.');
    return;
  }

  try {
    const res = await axios.post(
      `https://blog-backend-ly16.onrender.com/api/posts/${postId}/comments`,
      { content: comment },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      }
    );

    toast.success('Comment posted!');
    setComments([...comments, res.data]); // Add new comment to list
    setComment('');
  } catch (err) {
    toast.error('Failed to post comment');
  }
};

 function formatDateToReadableString(isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  return (
    <div className='m-4 flex flex-col'>
<ToastContainer/>
      <div className='border mt-5 flex flex-col gap-2 border-gray-200 rounded-xl h-auto p-2 mx-2'>
        <div className='flex flex-row gap-2'>
          <div className='bg-gray-200 p-2 w-9 rounded-full'>
            <User size={20} />
          </div>
          <div className='flex flex-col text-xs m-1'>
            <h4>{user ? user.name : 'Guest'}</h4>
          </div>
        </div>

        <div className='m-2 flex flex-row justify-between gap-2'>
          {user ? (
            <>
              <input
                type='text'
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder='Share your thoughts'
                className='w-[80%] text-xs h-8 focus:outline-none p-2 bg-gray-100 rounded-lg'
              />
              <button
                onClick={handleComment}
                className='text-xs bg-black text-white font-semibold px-2 rounded-lg'
              >
                Comment
              </button>
            </>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className='text-xs bg-blue-500 text-white px-4 py-1 rounded-lg'
            >
              Login to comment
            </button>
          )}
        </div>
      </div>

      {/* Fetched comments */}
      {comments.length > 0 ? (
        comments.map((cmt) => (
          <div
            key={cmt._id}
            className='border mt-5 flex flex-col gap-2 border-gray-200 rounded-xl h-auto p-2 mx-2'
          >
            <div className='flex flex-row gap-2'>
              <div className='bg-gray-200 p-2 w-9 rounded-full'>
                <User size={20} />
              </div>
              <div className='flex flex-col text-xs m-1'>
                <h4>{cmt.userName}</h4>
                <p className='text-[9px] text-gray-500'>
                  {formatDateToReadableString(cmt.createdAt)}
                </p>
              </div>
            </div>
            <div className='m-2'>
              <p className='text-sm text-gray-700'>{cmt.content}</p>
            </div>
          </div>
        ))
      ) : (
        <p className='text-xs text-gray-400 mt-4 mx-2'>No comments yet.</p>
      )}
    </div>
  );
};

export default Comment;
