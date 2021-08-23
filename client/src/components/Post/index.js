import React, {useState, useEffect} from "react";
import { useDispatch } from 'react-redux';
import { format } from 'timeago.js';
import { Link } from 'react-router-dom';
import { FaEllipsisV } from "react-icons/fa";

import { getUserProfile } from '../../features/users/userAction';
import { likeDislikePost } from '../../features/posts/postAction';
import styles from './styles.module.scss';


const Post = ({post, account}) => {
    const [save, setLike] = useState(post.like.length);
    const [isLiked, setIsLiked] = useState(false);

    const dispatch = useDispatch();

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {

        getUserProfile(post.userId);

    }, [post, dispatch]);

    const likeHandler = () => {
        dispatch(likeDislikePost(post._id));
        setLike(isLiked ? save - 1 : save + 1);
        setIsLiked(!isLiked);
    }

        return (
            <div className = {styles.post}>
                <div className = {styles.postWrapper}>
                    <div className = {styles.postTop}>
                        <div className = {styles.postTopLeft}>
                            <Link to = {`/profile/${account.username}`}>
                            <img 
                                className ={styles.postProfileImg}
                                src = {account.profilePicture || PF+"person/defaultAvatar.png"} 
                                alt = "user" />
                            </Link>
                            <span className = {styles.userName}>{account.username}</span>
                        </div>
                        <div className = {styles.postTopRight}>
                        <span className = {styles.postDate}>{format(post.createdAt)}</span>
                            <FaEllipsisV />
                        </div>
                    </div>
                    <div className={styles.postCenter}>
                        <h3 className = {styles.postTitle}>{post?.title || "Title"}</h3>
                        <p className = {styles.postText}>{post?.desc || ""}</p>
                        <img
                            className={styles.postImg}
                            src={post?.img || null}
                            alt={post?.img ? "post_image" : null}/>
                    </div>
                    <div className = {styles.postButton}>
                        <div className = {styles.postButtonLeft}>
                            <span className ={styles.likeIcon}
                                    onClick={likeHandler}>
                                {save === 0 ? <span>💙</span> : <span>❤️</span>} 
                            </span>
                            <span className = {styles.postLike} onClick={likeHandler}>{save} like</span>
                        </div>
                        <Link to={`/post/${post._id}`}>
                            <div className={styles.postButtonRight}>
                                <span className={styles.postInfo}>Show more ...</span>
                            </div>
                        </Link>
                        {/*<div className={styles.postButtonRight}>
                            <span className={styles.postCommentText}>{post.comment} comments</span>
                        </div>*/}
                </div>
            </div>
        </div>
        )
    }
    

export default Post;
