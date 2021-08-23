import styles from "./styles.module.scss";
import UserInfo from './UserInfo/index';
import ExploreUsers from './ExploreUsers/index';


const Sidebar = ({ user }) => {
    return (
        <div className ={styles.sidebar}>
            <div className ={styles.sidebarWrapper}>
            {user ? 
            <>
            <UserInfo user />   
            </> : 
            <>
            <ExploreUsers />
            </>
            }
            </div>
        </div>
    )
}

export default Sidebar;