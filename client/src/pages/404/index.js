import Layout from '../../components/Layout/index';
import styles from './styles.module.scss';


export default function PageNotFound() {
  return (
    <Layout>
      <div className={styles.errorContainer}>
          <h1 className = {styles.content}>404 Page not found</h1>
      </div>
    </Layout>
  );
}


