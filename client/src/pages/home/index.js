import Sidebar from '../../components/Sidebar/index'
import Feed from '../../components/Feed/index'
import Rightbar from '../../components/Rightbar/index'
import styles from './styles.module.scss'

export default function Home() {
  
  return (
    <div className={styles.homeContainer}>
      <Rightbar />
      <Feed />
      <Sidebar />
    </div>
  );
}


