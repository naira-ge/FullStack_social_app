import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import { updateUserProfile } from '../../../features/users/userAction';
import { getUserProfile } from '../../../features/users/userAction';
import { FaGithub, FaConnectdevelop, FaUserAstronaut, FaUserSecret } from "react-icons/fa";
import { GoLocation } from "react-icons/go";
import { HiOutlineMail } from "react-icons/hi";
import { BiNetworkChart, BiPencil } from 'react-icons/bi';
import styles from '../styles.module.scss';

const UserInfo = () => {
  const { userName } = useParams();
  const { user, updatePending, updateError } = useSelector(state => state.users);
  const dispatch = useDispatch();

  
  useEffect(() => {
    dispatch(getUserProfile());
  }, [ userName, updatePending, updateError, dispatch ]);


  const editFields = {
    username: user.username,
    skills: user.skills,
    position: user.position,
    email:  user.email,
    city: user.city,
    followers: user.followers,
    following:user.following,
  };
  
    const [{ username, skills, position, email, city, followers, following }, setFields] = useState(
    () => editFields,
  );

  const handleChange = ( name, value ) =>
    setFields(prevFields => ({
      ...prevFields,
      [name]: value,
    }));

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile({username, skills, position, email, city}));
  }

    
        return (
            <div className ={styles.sidebarList}>
                <ul>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><FaGithub className = {styles.sidebarIcon}/> Name: </span>
                        <input type="text" name="username" className={styles.sidebarListItemText}
                                value={username || ''}
                                placeholder="add name"
                                onChange={(e) => handleChange(e.target.name, e.target.value)}/>
                    </li>
                    <li className = {styles.sidebarListItem}>
                      <span className = {styles.sidebarListItemText}><FaConnectdevelop className = {styles.sidebarIcon}/> Skills: </span>
                      <input type="text" name="skills" className={styles.sidebarListItemText}
                            value={skills || ''}
                            placeholder = "add your skills"
                              onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><BiNetworkChart className = {styles.sidebarIcon}/> Position: </span>
                        <input type="text" name="position" className={styles.sidebarListItemText}
                                value={position || ''}
                                placeholder='add current position'
                                onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><HiOutlineMail className = {styles.sidebarIcon}/> Email: </span>
                        <input type="email" name="email" className={styles.sidebarListItemText}
                                    value={email || ''} 
                                    placeholder='add email'
                                    onChange={(e) => handleChange(e.target.name, e.target.value)}/>
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><GoLocation className = {styles.sidebarIcon}/> City: </span>
                        <input type="text" name="city" className={styles.sidebarListItemText}
                                value={city || ''}
                                placeholder='add city'
                                onChange={(e) => handleChange(e.target.name, e.target.value)} />
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><FaUserSecret className = {styles.sidebarIcon}/> Followers: </span>
                        <span className={styles.sidebarListItemText}>{user.followers ? user.followers.length : 0}</span>
                    </li>
                    <li className = {styles.sidebarListItem}>
                        <span className = {styles.sidebarListItemText}><FaUserAstronaut className = {styles.sidebarIcon}/> Following: </span>
                        <span className={styles.sidebarListItemText}>{user.following ? user.following.length : 0}</span>
                </li>
                </ul>
                <button className={styles.editBtn}
                        onClick={handleClick}
                        dispatch = {updatePending}>
                        Save <BiPencil />
                </button>
            {updateError && <span className={styles.error}>Something went wrong! </span>}
            {updatePending &&
              <span className={styles.success}>Account has been updated! </span>}
          </div>  
                
        );
}

export default UserInfo;
