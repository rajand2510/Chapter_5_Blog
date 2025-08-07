import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { Link, useParams, useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, MessageCircle, User } from 'lucide-react';
import './User.css';

const MainPost = () => {
    const { postId } = useParams();
    const [post, setPost] = useState('');
    const [commentCount, setCommentCount] = useState('');
    const [loadingPost, setLoadingPost] = useState(true);
    const [loadingComments, setLoadingComments] = useState(true);
    const navigate = useNavigate();

    const handleBack = useCallback(() => {
        if (/^\/post\/[^/]+\/comment$/.test(location.pathname)) {
            navigate(-2);
        } else {
            navigate(-1);
        }
    }, [navigate]);

    useEffect(() => {
        const cachedPost = sessionStorage.getItem(`post_${postId}`);
        const cachedCommentCount = sessionStorage.getItem(`comment_count_${postId}`);

        if (cachedPost) {
            setPost(JSON.parse(cachedPost));
            setLoadingPost(false);
        } else {
            axios.get(`https://blog-backend-ly16.onrender.com/api/posts/${postId}`)
                .then(res => {
                    setPost(res.data);
                    sessionStorage.setItem(`post_${postId}`, JSON.stringify(res.data));
                })
                .catch(err => console.error('Failed to fetch post:', err))
                .finally(() => setLoadingPost(false));
        }

        if (cachedCommentCount) {
            setCommentCount(cachedCommentCount);
            setLoadingComments(false);
        } else {
            axios.get(`https://blog-backend-ly16.onrender.com/api/posts/${postId}/comments/count`)
                .then(res => {
                    setCommentCount(res.data.count);
                    sessionStorage.setItem(`comment_count_${postId}`, res.data.count);
                })
                .catch(err => console.error('Failed to fetch comment count:', err))
                .finally(() => setLoadingComments(false));
        }
    }, [postId]);

    const formattedDate = useMemo(() => {
        if (!post?.timestamp) return '';
        const date = new Date(post.timestamp);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }, [post?.timestamp]);

    const memoizedTags = useMemo(() => {
        return post?.tags?.map((tag) => (
            <span key={tag} className="inline-block bg-gray-200 text-black text-xs px-2.5 py-0.5 rounded-full">
                {tag}
            </span>
        ));
    }, [post?.tags]);

    if (loadingPost)
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="w-12 h-12 border-4 border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );

    if (!post)
        return (
            <div className="flex flex-col mt-20 justify-center items-center h-screen text-center px-4 bg-white">
                <div className="mb-8 animate-bounce">
                    <div className="w-32 h-32 mx-auto mb-6 bg-gray-100 rounded-full flex items-center justify-center">
                        <svg className="w-16 h-16 text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </div>
                </div>
                <div className="space-y-4 max-w-md ">
                    <h2 className="text-3xl font-bold text-black animate-pulse">Oops! Post Vanished!</h2>
                    <p className="text-gray-800 leading-relaxed">
                        Looks like the post you’re hunting for has gone on an adventure of its own!
                    </p>
                    <div className="pt-6">
                        <a
                            href="/"
                            className="inline-block bg-black hover:bg-gray-900 text-white px-4 txet-sm rounded-md py-1 transition-colors duration-200 transform hover:scale-105"
                        >
                            Back to Home
                        </a>
                    </div>
                </div>
            </div>
        );

    return (
        <div className='m-4 mt-20 lg:mx-[25%] md:mx-4 flex flex-col'>
            <div className='flex flex-row justify-between items-center'>
                <button
                    onClick={handleBack}
                    className='px-2 py-2 flex flex-row gap-2 text-xs rounded-lg hover:bg-gray-200'>
                    <ArrowLeft className='pt-1' size={14} />
                    <h1>back to posts</h1>
                </button>
                <div className='flex flex-row gap-2 '>
                    <div className='bg-gray-200 p-2 w-9 rounded-full'><User size={20} /></div>
                    <div className='flex flex-col text-xs m-1'>
                        <h4>{post.authorName}</h4>
                        <p className='text-[9px] text-gray-500'>{formattedDate}</p>
                    </div>
                </div>
            </div>

            <div className='mt-5 flex flex-col gap-12 rounded-xl h-auto p-2 '>
                <div className='m-2'>
                    <h2 className='text-lg'>{post.title}</h2>
                    <h4 className='text text-gray-500'>{post.description}</h4>
                    <div className='flex flex-row flex-wrap gap-2 mt-2'>
                        {memoizedTags}
                    </div>
                </div>
            </div>

            <div className='m-4'>
                <div
                    className="preview-content rounded-md min-h-[200px] text-xs"
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />
            </div>

            <div className='border-t border-b border-gray-200 p-4 m-2'>
                <Link to="comment" className='flex flex-row gap-2 cursor-pointer'>
                    <MessageCircle size={18} color="#99a1af" />
                    <p className='text-sm text-gray-500'>{commentCount} Comments</p>
                </Link>
            </div>

            <Outlet />
        </div>
    );
};

export default MainPost;
