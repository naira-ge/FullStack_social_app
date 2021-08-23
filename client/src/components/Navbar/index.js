import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { FaHubspot } from "react-icons/fa";
import { GoTerminal } from "react-icons/go";
import { userLogout } from '../../api/usersApi';
import Search from "../Search/index";
import styles from './styles.module.scss';

const Navbar = ( ) => {
    const account = useSelector(state => state.users.user);
    const posts = useSelector(state => state.posts.userPosts);

    const history = useHistory();

    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {}, [account]);

    const handleLogOut = () => {
        sessionStorage.removeItem("accessJWT");
        localStorage.removeItem("TalentHouse");
        userLogout();
        history.push('/');
    };

        return (
            <div className = {styles.navContainer}>
                <div className = {styles.navLeft}>
                <Link to="/home">
                    <span className = {styles.logo}><FaHubspot className = {styles.logoImg}/> TalentHouse</span>
                </Link>
                </div>
                <div className = {styles.navCenter}>
                    <Search />
                    <Link to="/home">
                        <div className={styles.navIconItem}>
                            <GoTerminal className = {styles.logoJob}/>
                        </div>
                    </Link>
                </div>
                <div className = {styles.navRight}>
                    <div className ={styles.navMenu}>
                        <Link to={`/profile/${account.username}`}>
                        <div className ={styles.userInfo}>
                            <span className={styles.profileInfoName}>{ account.username || "" }</span>
                                <div className={styles.navImgContainer}>
                                    <img src = {account.profilePicture || PF+"person/defaultAvatar.png"  } alt = "user" className={styles.navImg} />
                                </div>
                        </div>
                        </Link>
                        <div className={styles.logOut} onClick={ handleLogOut }>Log Out</div>
                    </div>
                </div>
            </div>
        )
}


export default Navbar;
