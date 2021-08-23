import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ImageUpload from './ImageUpload';
import styles from './styles.module.scss';


const Topbar = (props) => {
    const [userBio, setUserBio] = useState('');
    
    const user = useSelector(state => state.users.user)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    const onContentChanged = (e) => setUserBio(e.target.value);
    
    return (
    <div className={styles.profileRightTop}>
        <div className={styles.profileCover}>
            <img className={styles.profileCoverImg} 
                    src={user.coverPicture || PF + "person/defaultCover.jpg"} alt="cover" />
        <Link to = {`/profile/${user.username}`}>
        <div className={styles.profileUserImgContainer}>
            <img className={styles.profileUserImg} 
            src = {user.profilePicture || PF+"person/defaultAvatar.png" } alt = "profile"/>
        </div>
        </Link>
            {!props.user && <ImageUpload/> } 
        </div>
        <div className={styles.profileInfo}>
                <h4 className={styles.profileInfoName}>{user.username || ""}</h4>
                <div className={styles.userBioContainer}>
                        <textarea
                        id="bioContent"
                        name="bioContent"
                        placeholder={user.desc || "Add bio"}
                        value={userBio}
                        onChange={onContentChanged}/>
                </div>
      </div>
    </div>
    )
}

export default Topbar;