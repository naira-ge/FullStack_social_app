import Header from "../Header/index";
import Content from "../Content/index";
import Footer from "../../../components/Footer/index";
import styles from './styles.module.scss';


export default function LogIn(props) {
  return (
    <div className={styles.titlePage}>
        <Header />
        <Content />
        <Footer />
    </div>
  )
}
