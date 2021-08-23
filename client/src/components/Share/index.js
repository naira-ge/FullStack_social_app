import { useEffect, useState } from 'react';
import { FaRegImages } from "react-icons/fa";
import { IoSendSharp } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { createPost } from '../../features/posts/postAction';
import styles from './styles.module.scss';

const initialFormData = {
    title: "",
    desc: "",
}

const Share = () => {
    const { user } = useSelector(state => state.users);
    const dispatch = useDispatch();

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    
    const [formData, setFormData] = useState(initialFormData);
    const { title, desc } = formData;

    useEffect(() => {}, [user, formData]);

    
    const handleOnChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value,
            })
    };


    const handleOnSubmit = (e) => {
        e.preventDefault();

        if (formData) {
            dispatch(createPost(formData));
            setFormData({ title: '', desc: '' });
    }
}
    return (
        <section className={styles.share}>
            <div className={styles.shareWrapper}>
                <div className={styles.shareTop}>
                    <div className = {styles.imageContainer}>
                    <img className = {styles.shareProfileImg} 
                    src = {user.profilePicture ||  PF+"person/defaultAvatar.png" } alt = "user" />
                    </div>
                    <div className={styles.shareInput}>
                        <input
                        name="title"
                        type = "text"
                        placeholder={'Share your idea'}
                        value={title}
                        className = {styles.postTitle}
                        onChange={handleOnChange}
                        />
                        <textarea
                        name="desc"
                        placeholder={`What's on your mind ${user.username || ""}?`}
                        value={desc}
                        onChange={handleOnChange}/>
                    </div>
                </div>
                <hr className={styles.shareHr} />
                <div className={styles.shareBottom}>
                    <div className={styles.shareOptions}>
                        <div className ={styles.shareOption}>
                            <FaRegImages className={styles.shareIcon}/>
                            <span className = {styles.shareOptionText}>Photo or Video</span>
                        </div>
                    </div>
                    <button
                    type = "submit"    
                    className = {styles.shareButton}
                    onClick={handleOnSubmit}>
                    <IoSendSharp />
                    </button>
                </div>
            </div>
        </section>
    )
}



export default Share;
