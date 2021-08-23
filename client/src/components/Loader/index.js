import { BiLoaderCircle } from "react-icons/bi";
import styles from './styles.module.scss';


function Loader() {
    return (
        <BiLoaderCircle className={styles.loader}/>
    )
}

export default Loader;
