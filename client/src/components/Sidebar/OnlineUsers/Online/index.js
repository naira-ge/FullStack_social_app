import React from 'react';
import styles from '../../styles.module.scss';

const Online = ({user}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

        return (
                <li className = {styles.sidebarFriend}>
                    <div className = {styles.profileImgContainer}>
                        <img className = {styles.sidebarProfileImg} src ={PF+user.profilePicture} alt = "user"/>
                        <span className ={styles.profileOnline}></span>
                    </div>
                    <span className = {styles.sidebarUserName}>{user.username}</span>
                </li>
        )
}

export default Online
