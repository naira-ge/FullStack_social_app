import styles from './styles.module.scss';
import Rating from './Rating/index';


const Rightbar = ({ profile }) => {
    
    
    return (
        <div className ={styles.rightbar}>
            <div className ={styles.rightbarWrapper}>
                {profile ? < Rating profile/> : < Rating />}
            </div>
        </div>
    )
}

export default Rightbar;
