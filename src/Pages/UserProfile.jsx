import React, { useState } from 'react'
import { User, SquarePen, Trash, X } from 'lucide-react'
import { Editor, EditorProvider } from 'react-simple-wysiwyg';
import { Toolbar, BtnBold, BtnStyles, BtnItalic, BtnUnderline, BtnBulletList, BtnNumberedList, BtnLink, BtnRedo, BtnUndo, BtnStrikeThrough, BtnClearFormatting, HtmlButton, Separator } from 'react-simple-wysiwyg';
import './User.css'
import { toast, ToastContainer } from 'react-toastify';
import { useAuth } from '../Hooks/useAuth';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isPreview, setIsPreview] = useState(false);
  const [isCreatePost, setIsCreatePost] = useState(false)
  const [blogContent, setBlogContent] = useState('<p>Your Content Here</p>');
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');
  const [loading, setLoading] = useState(false);
  const [editingPostId, setEditingPostId] = useState(null);
  const [newTag, setNewTag] = useState(null)
  const { user, updateName, logout } = useAuth();
  const [name, setName] = useState(user?.name || '');
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const handleEditorChange = (e) => {
    setBlogContent(e.target.value);
  };

  function formatDateToReadableString(isoDateString) {
    const date = new Date(isoDateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }

  const handleEditOpen = (id, title, description, tags, content) => {
    setIsEditOpen(true);
    setEditingPostId(id);
    setTitle(title);
    setDescription(description);
    setTags(tags);
    setBlogContent(content);
  }

  const handleDeletePost = async (postId) => {

    try {


      await axios.delete(`https://blog-backend-ly16.onrender.com/api/posts/delete/${postId}`);
      toast.success('Post deleted successfully!');

      // Update posts state by filtering out deleted post
      setPosts(prevPosts => prevPosts.filter(post => post._id !== postId));
    } catch (error) {
      console.error('Failed to delete post:', error);
      toast.error('Failed to delete post. Please try again.');
    }
  };

  const sortedPosts = [...posts].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));


  const handleSubmit = async (e) => {
    e.preventDefault();

    const tagArray = Array.isArray(tags) ? tags : tags.split(',').map(t => t.trim()).filter(t => t);

    const postData = {
      title,
      description,
      tags: tagArray,
      content: blogContent,
    };

    try {
      if (isEditOpen && editingPostId) {

        await axios.put(`https://blog-backend-ly16.onrender.com/api/posts/update/${editingPostId}`, postData);
        toast.success('Post updated successfully!');
      } else {

        await axios.post('https://blog-backend-ly16.onrender.com/api/posts/create', postData);
        toast.success('Post published successfully!');
      }

      // Close modal & reset states
      setIsEditOpen(false);
      setIsCreatePost(false);
      setEditingPostId(null);
      setTitle('');
      setDescription('');
      setTags([]);
      setBlogContent('');


      fetchUserPosts();

    } catch (error) {
      toast.error('Something went wrong. Please try again.');
      console.error(error);
    }
  };

  const handleCancle = () => {
    setIsCreatePost(false);
    setIsEditOpen(false);
    setTitle('');
    setDescription('');
    setTags([]);
    setBlogContent('')
  }
  useEffect(() => {

    fetchUserPosts();
  }, [user]);

  const fetchUserPosts = async () => {
    if (!user || !user._id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://blog-backend-ly16.onrender.com/api/posts/user/${user._id}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching user posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    if (name && name !== user.name) {
      updateName(name);
    }
    setEditing(false);
  };

  const handleCancel = () => {
    setName(user.name);
    setEditing(false);
  };


  return (
    <div className='m-4 lg:mx-[25%] md:mx-4 mt-20 flex flex-col'>
      <ToastContainer />
      <div className='relative border mt-5 flex flex-col gap-2 border-gray-200 rounded-xl h-auto p-2 mx-2'>
        <div className='flex flex-row gap-2'>
          <div className='bg-gray-200 p-2 w-18 rounded-full'>
            <User size={55} />
          </div>
          <div className='flex flex-col text-xs m-1 justify-center items-center'>
            {editing ? (
              <input
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='text-sm min-w-44 w-[20vw] bg-gray-100 focus:outline-none rounded px-2 py-1'
              />
            ) : user ? (
              <h4 className='text-2xl'>{user.name}</h4>
            ) : (
              <h4 className='text-2xl text-gray-400'>Loading...</h4>
            )}

          </div>
        </div>

        <div className='m-2'>
          <h4 className='text-xs text-gray-500'>{posts.length} published posts</h4>
        </div>

        {editing ? (
          <div className='absolute top-2 right-2 flex gap-2'>
            <button
              className='text-xs font-semibold py-1 px-2 border border-gray-300 text-black rounded-lg'
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              className='text-xs font-semibold py-1 px-2 bg-black text-white rounded-lg'
              onClick={handleSave}
            >
              Save
            </button>
            <button
              className='text-xs font-semibold py-1 px-2 bg-red-500 text-white rounded-lg'
              onClick={() => { logout() }}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className='absolute top-2 right-2 flex gap-2'>
            <button
              className=' text-xs font-semibold py-1 px-2 bg-black text-white rounded-lg'
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
            <button
              className='text-xs font-semibold py-1 px-2 bg-red-500 text-white rounded-lg'
              onClick={() => { logout() }}
            >
              Logout
            </button>
          </div>
        )}
      </div>


      <div className='mt-4 mx-4 flex flex-row justify-between'>
        <h3>Published Posts ({posts.length})</h3>
        <button
          className='text-xs font-semibold py-2 px-4 bg-black text-white rounded-lg'
          onClick={() => setIsCreatePost(true)}
        >
          + New Post
        </button>
      </div>

      {posts?.length === 0 && (
        <div className='border mt-2 flex flex-col gap-5 border-gray-200 rounded-xl h-auto p-2 mx-2'>
          <div className='m-2'>
            <h4 className='text-sm text-gray-500'>
              You haven't published any posts yet.
            </h4>
          </div>
        </div>
      )}


      {loading ? (
        <p>Loading posts...</p>
      ) : (
        sortedPosts.map(post =>
          <div key={post._id}
            className=' border mt-5 flex flex-col gap-5 border-gray-200 rounded-xl h-auto p-2 mx-2'>
            <div className='flex flex-row gap-2 '>
              <div className='flex flex-col text-xs m-1'>
                <p className=' text-[9px] text-gray-500'>Published at: {formatDateToReadableString(post.timestamp)}</p>
              </div>
            </div>
            <div className='m-2 cursor-pointer ' onClick={() => navigate(`/post/${post._id}`)}>
              <h2 className=''>
                {post.title}
              </h2>
              <h4 className='text-sm text-gray-500'>
                {post.description}
              </h4>
              <div className="flex flex-row flex-wrap gap-2 mt-2">
                {post?.tags?.map(tag => (
                  <span key={tag} className="bg-gray-200 text-black text-xs px-2.5 py-0.5 rounded-full">
                    {tag}
                  </span>
                ))}
              </div>

            </div>

            <div className='mx-2'>
              <div className='flex flex-row gap-2 font-medium'>
                <button className="flex flex-row border border-gray-200 hover:bg-gray-200 text-black text-xs px-2.5 gap-2 py-1 rounded-md" onClick={() => handleEditOpen(post._id, post.title, post.description, post.tags, post.content)}
                >
                  <SquarePen size={16} /> <p>Edit</p>
                </button>
                <button onClick={() => handleDeletePost(post._id)} className="flex flex-row border border-gray-200 hover:bg-gray-200 text-black text-xs px-2.5 gap-2 py-1 rounded-md">
                  <Trash size={16} /> <p>Delete</p>
                </button>
              </div>
            </div>
          </div>
        )
      )}
      {/* Editor Modal */}
      {(isEditOpen || isCreatePost) && (
        <div className='fixed inset-0 bg-black/50 flex justify-center items-center z-50 px-4'>
          <div className='p-4 w-full max-w-[700px] max-h-[80vh] overflow-y-auto bg-white text-xs font-semibold rounded-xl'>
            <h1 className='text-lg my-2'>
              Add Post
            </h1>
            <form
              className='flex flex-col w-full'
              onSubmit={(e) => {
                e.preventDefault();
                setIsEditOpen(false);
              }}
            >
              <label className='mb-2'>Title</label>
              <input type="text" className='focus:outline-none p-1 rounded mb-2 py-2 px-4 bg-gray-100'
                value={title} onChange={e => setTitle(e.target.value)} />

              <label className='mb-2'>Description</label>
              <input type="text" className='focus:outline-none p-1 rounded mb-2 py-2 px-4 bg-gray-100'
                value={description} onChange={e => setDescription(e.target.value)} />

              <label className='mb-2'>Tags</label>
              <div className="flex flex-row justify-between items-start gap-2 ">
                <input
                  type="text"
                  className="focus:outline-none  rounded mb-2 py-2 px-4 w-[80%] bg-gray-100"
                  placeholder="Type a tag"
                  value={newTag}
                  onChange={e => setNewTag(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter' && newTag.trim()) {
                      e.preventDefault()
                      // add tag if not duplicate
                      if (!tags.includes(newTag.trim())) {
                        setTags([...tags, newTag.trim()])
                      }
                      setNewTag('')
                    }
                  }}
                />

                <button
                  type="button"
                  className="text-[9px]  font-semibold py-2.5 px-4 bg-black text-white rounded-md hover:bg-gray-800"
                  onClick={() => {
                    if (newTag.trim() && !tags.includes(newTag.trim())) {
                      setTags([...tags, newTag.trim()])
                    }
                    setNewTag('')
                  }}
                >
                  + Add
                </button>
              </div>
              <div className='flex flex-row gap-2 mt-2'>
                {tags && tags.length > 0 && (
                  tags.map((label, index) => (
                    <div
                      key={index}
                      className="flex items-center bg-gray-200 text-black text-[9px] px-2.5 py-0.5 rounded-full gap-1"
                    >
                      <span>{label}</span>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          setTags(tags.filter((_, i) => i !== index));
                        }}
                        className="hover:text-red-500"
                      >
                        <X size={8} />
                      </button>
                    </div>
                  ))
                )}


              </div>

              <div className='flex flex-row  justify-between mb-2'>
                <label className='mt-2'>Content</label>
                <div className='flex flex-row gap-2'>
                  <button
                    type="button"
                    onClick={() => setIsPreview(false)}
                    className='text-[9px] font-semibold py-1 px-2 border border-gray-200 hover:bg-gray-200 text-black rounded-md'
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setIsPreview(true)}
                    type='button'
                    className='text-[9px] font-semibold py-1 px-2 bg-black text-white rounded-md'
                  >
                    Preview
                  </button>
                </div>
              </div>
              {!isPreview ? (
                <EditorProvider>
                  <Editor value={blogContent} onChange={handleEditorChange}>
                    <Toolbar>
                      <BtnUndo />
                      <BtnRedo />
                      <Separator />
                      <BtnBold />
                      <BtnItalic />
                      <BtnUnderline />
                      <BtnStrikeThrough />
                      <Separator />
                      <BtnNumberedList />
                      <BtnBulletList />
                      <Separator />
                      <BtnLink />
                      <BtnStyles />
                      <BtnClearFormatting />
                      <HtmlButton />
                    </Toolbar>
                  </Editor>
                </EditorProvider>
              ) : (
                <div
                  className="preview-content  border border-gray-200 p-4 rounded-md min-h-[200px] text-xs"
                  dangerouslySetInnerHTML={{ __html: blogContent }}
                />
              )}

              <div className='flex flex-row gap-2 justify-end mt-4'>
                <button
                  type="button"
                  onClick={() => handleCancle()}
                  className='text-[9px] font-semibold py-2 px-4 border border-gray-200 hover:bg-gray-200 text-black rounded-md'
                >
                  Cancel
                </button>

                {isEditOpen ? (
                  <button
                    type='submit'
                    onClick={handleSubmit}
                    className='text-[9px] font-semibold py-2 px-4 bg-black text-white rounded-md'
                  >
                    Edit
                  </button>
                ) : (
                  <button
                    type='submit'
                    onClick={handleSubmit}
                    className='text-[9px] font-semibold py-2 px-4 bg-green-600 text-white rounded-md'
                  >
                    Publish
                  </button>
                )}

              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default UserProfile
