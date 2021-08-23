import React, {useState} from 'react';
import { GoLocation } from "react-icons/go";
import { RiBuilding2Line } from "react-icons/ri";
import styles from './styles.module.scss';


const Job = (props) => {
    const [readMore, setReadMore] = useState(false);
    
    function removeFeed() {
    }

    let desc = `<span className=${styles.descriptionInfo}>We help managers lead better, teams perform better, and employees thrive personally and inspire professionally. Our mission is to help professionals everywhere pursue their lives with greater clarity, purpose, and passion. Our product was developed by a team of leading behavioral scientists, researchers, and technologists to bring evidence-based learning to professionals everywhere. We’re already transforming the way companies approach talent development at high-performing organizations like Airbnb, Genentech, Mars, LinkedIn, and Workday. Let’s build together! "</span>`;
    const short = `<span className=${styles.descriptionInfo}>${desc.substring(0, 200)}...</span>`;
    const descInfo = <span dangerouslySetInnerHTML={{ __html: desc }}></span>;
    const descShort = <span dangerouslySetInnerHTML={{ __html: short }}></span>;

    return (<article className={styles.containerJob} key = {props.id}> 
    <div className = {styles.logoContainer}>
        <img src={props.logo} alt={props.company} className = {styles.logo}/>
    </div>
        <footer>
            <div className={styles.companyInfo}>
                <div>
                <h4><a href={props.url} className = {styles.companyTitle} target="_blank" rel="noreferrer">{props.title}</a></h4>
                <p id="company"><a href={props.company_url} target="_blank" rel="noreferrer"><RiBuilding2Line /> {props.company_name}</a></p>
                </div>
                <div className={styles.location}>
                <h4 className={styles.companyPrice}><GoLocation/> USA{props.location}</h4>
                </div>
            </div>
            {readMore ? descInfo : descShort}
            <button className = {styles.showBtn} onClick = {()=> setReadMore(!readMore)}>
                {readMore ? ' show less' : ' read more'}
            </button>
            {props.created_at ? <h6>Created: 02.07.2021 {/*props.created_at.slice(0,10)*/}</h6> : null}
            <div className={styles.interestBtn}>
                {/*<button className={styles.deleteBtn} onClick ={() => props.removeFeed(props.id)}>Not interested</button>*/}
                <a className={styles.acceptBtn} href ={props.url} target="_blank" rel="noreferrer">Interested</a>
            </div>
        </footer>
    </article>);
}

export default Job;