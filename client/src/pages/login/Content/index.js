import styles from './styles.module.scss';

const Content = () => {
    return (
    <div className= {styles.container}>
        <div className={styles.contentWrapper}>
                <img  className = {styles.contentImage} src = "/assets/connected.png" alt="team"/>
                <div className = {styles.contentText}>
                <h2>Discuss Ideas. <pre>Start Startups.</pre> <pre> Find Co-Founders</pre> </h2> 
                    <h3>
                    Connects talented people around the world with the creative global startup community
                    </h3>
                </div>
        </div>
        <p className = {styles.info}>
            Discuss ideas, build your developers, product, marketing-sales global team all in one place.
        </p>
    </div>
    )
}

export default Content;