import Rightbar from '../../components/Rightbar/index';
import PostInfo from './PostInfo/index';
import styles from './styles.module.scss';

export default function PostDetail() {
  
  return (
    <div className={styles.profileRight}>
          <Rightbar />
          <PostInfo />
      </div>
  )
  };
  