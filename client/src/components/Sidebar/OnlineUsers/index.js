import React from 'react';
import styles from '../styles.module.scss';
import Online from './Online/index';
import {users} from './dummyData';

const OnlineUsers = ({profile}) => {
    return (
        <div className = {styles.sidebarUserWrapper}>
                <h4 className = {styles.sidebarUserTitle}>{profile ? "Online Friends" : "Online Users"}</h4>
                <div className = {styles.sidebarFriendWrapper}>
                <ul>
                    {users.map(u => {
                        return <Online key = {u.id} user = {u}/>
                    })} 
                </ul>
            </div>
        </div>
    )
}

export default OnlineUsers;