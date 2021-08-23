import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { format } from 'timeago.js';
import { useParams } from "react-router-dom";
import Loader from '../../../components/Loader/index';
import AddComment from '../AddComment/index';
import { fetchSinglePosts,createComment } from '../../../features/posts/postAction';
import styles from './styles.module.scss';


const PostInfo = () => {
    const { pId } = useParams();
    const dispatch = useDispatch();

    const { isLoading, error, selectedPost } = useSelector(state => state.posts);

    const createNewComment = (message) => {
        dispatch(createComment(pId,  message ));
    }

    const [save, setLike] = useState(0);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        dispatch(fetchSinglePosts(pId));
    }, [pId, dispatch]);

    const likeHandler = () => {
        setLike(isLiked ? save - 1 : save + 1);
        setIsLiked(!isLiked);
    }


        return (
            <div className = {styles.post}>
                <div className={styles.postWrapper}>
                    {isLoading && <Loader />}
                        <h2 className={styles.postTitle}>{selectedPost?.title || "Title"}</h2>
                        <div className = {styles.postTopLeft}>
                                <span className={styles.postDate}>Created: {format(selectedPost.createdAt)}</span>
                        </div>
                        <div className = {styles.postCenter}>
                            <p className = {styles.postText}>{selectedPost?.desc || ""}</p>
                            <img
                                className={styles.postImg}
                                src={selectedPost?.img || null}
                                alt={selectedPost?.img ? "post_image" : null}/>
                        </div>
                    </div>
                    <div className = {styles.postButton}>
                        <div className = {styles.postButtonLeft}>
                            <span className ={styles.likeIcon}
                                    onClick={likeHandler}>
                                {save ? <span>💙</span> : <span>❤️</span>} 
                            </span>
                            <span className = {styles.postLike} onClick={likeHandler}>{save} like </span>
                        </div>
                </div>
                <ul>
                {selectedPost.conversations ? (selectedPost.conversations.map(mess => {
                    return <li key={mess._id}>
                                <span className= {styles.postTop}>
                                    <h4>{mess.sender || "Secret Men"}</h4>
                                    <span className = {styles.postDate}>{format(mess.msgAt)}</span>
                                </span>
                                <p>{mess.message}</p>
                            </li>
                })) : ""}
                </ul>
                <AddComment newComment={createNewComment} />
            </div>
        )
    }
    

export default PostInfo;
