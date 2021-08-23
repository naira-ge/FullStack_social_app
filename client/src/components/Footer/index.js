import styles from './styles.module.scss';
import { FaHubspot } from "react-icons/fa";

const Footer = () => {
    return(
        <div className={styles.footer}>
            <div className={styles.footerLogo}>
                <h3><FaHubspot /> Talent House</h3>
            </div>
            <div className={styles.footerInfo}>
                <p>Email: info@talenthouse.com</p>
                <p>Tel: 012345678</p>
                <p>Talent House &copy; 2021</p>
            </div>
        </div>
    )
}

export default Footer;