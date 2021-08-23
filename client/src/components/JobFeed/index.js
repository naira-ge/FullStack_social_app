import React, {useState} from 'react';
import Job from '../Job/index';
import Share from '../Share/index';
import styles from './styles.module.scss';
import axios from 'axios';

const GITHUB_JOBS_API_URL = 'https://remotive.io/api/remote-jobs';


const JobFeed = (props) => {
    const [feeds, setFeeds] = useState([]);

    /*useEffect(()=>{
            axios.request(GITHUB_JOBS_API_URL).then((response) => {
                console.log(response.data.jobs);
    
                props.setJob(response.data.jobs);
            }).catch(function (error) {
                console.error(error);
            
            });
    }, []);*/

    const removeFeed = (id) => {
        const newFeeds = props.jobs.filter((feed) => feed.id !== id);
        setFeeds(newFeeds);
    }

    return (
    <section className ={styles.feed}>
        <div className ={styles.feedWrapper}>
            <Share />
            {props.jobs.map((job)=>{
                return <Job key = {job.id} {...job} removeFeed = {removeFeed} />
            })}
        </div>
    </section>
    )
}

const mapStateToProps = (state) => {
    return {
        jobs: state.jobs.jobs,
    }
}

export default JobFeed;