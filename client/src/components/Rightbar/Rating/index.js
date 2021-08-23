import React, {useState, useEffect} from "react";
import { FaHotjar, } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { GoCheck } from "react-icons/go";
import styles from '../styles.module.scss';

const Rating = (props) => {
    const [isLiked, setIsLiked] = useState(false);
    
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const dispatch = useDispatch();
    const postRating = useSelector(state => state.posts.userPosts);

     useEffect(() => {

    }, [postRating, dispatch]);

    const followHandler = (postId) => {
        setIsLiked(!isLiked);

    }


    return(
        <div className ={styles.jobsContainer}>
            {props.profile ?
                <img className={styles.jobImg} src={PF + "/job/logo.job.png"} alt="jobs" /> :
                <img className={styles.jobImg} src={PF + "/unicorn.png"} alt="jobs" />}
                    <span className ={styles.jobsText}>
                    <FaHotjar /> <b>{/*props.jobs.length*/} </b> hot ideas rating
                    </span>
            <div className={styles.jobsWrapper}>
                <ul>
                    {postRating.map((post) => {
                    return (
                    <li key = {post._id}
                    className = {styles.companyDetails}>
                        <div className = {styles.companyLogoContainer}>
                        <img className = {styles.companyLogo} src ={post.img || PF + "/job/logo.job.png"} alt = "user"/>
                        </div>
                        <div className = {styles.companyDesc}>
                        <h4 className = {styles.position}>{post.title} LLC</h4>
                        </div>
                        <div className = {styles.follow}>
                        {post.follow 
                        ? (<span onClick = {() => followHandler(post._id)}><GoCheck /> Follow </span>)
                        : (<span onClick = {() => followHandler(post._id)}> Unfollow </span>) }
                        </div>
                    </li>)})}
                </ul>
            </div>
               {/* <button className = {styles.rightbarButton}>Show more</button> */}
        </div>
    )
}

export default Rating;