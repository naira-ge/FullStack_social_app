import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Share from '../Share/index';
import Post from '../Post/index';
import Loader from '../Loader/index';
import { fetchAllPosts } from '../../features/posts/postAction';
import styles from './styles.module.scss';


const Feed = () => {
    const dispatch = useDispatch();

    const account = useSelector(state => state.users.user);
    const { searchPost, isLoading, error }= useSelector(state => state.posts);

    let accountId = account._id;

    useEffect(() => {
        if (!searchPost.length) {
            dispatch(fetchAllPosts());
        }
    }, [account, dispatch, searchPost]);
    

// Sort posts in reverse chronological order by date time string
const orderedPosts = Array.isArray(searchPost) 
? ( searchPost
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))) 
: (
    [searchPost]
    .slice()
    .sort((a, b) => b.createdAt.localeCompare(a.createdAt))
        );
    
if(error) return <h4 style = {{margin: '70px auto', color: 'grey'}}>{error}</h4>;

return (
    <div className ={styles.feed}>
        <div className ={styles.feedWrapper}>
            <Share />
            {isLoading ?
                <Loader /> :
                ((!searchPost.length) ?
                    (<h3 className={styles.content}>No post for show</h3>) :
                    (searchPost && orderedPosts.map((post) => {
                        return <Post key={post._id} post={post} account={account} />
                })
                ))
            }
        </div>
    </div>
)
}

export default Feed;
