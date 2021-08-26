import React, {useState} from 'react';
import styles from './styles.module.scss';
import { Link} from "react-router-dom";
import users  from './userData';

import {FaJsSquare, FaChevronRight, FaChevronLeft, FaQuoteLeft, FaQuoteRight} from 'react-icons/fa';

const ExploreUsers = () =>{
    const [index, setIndex] = useState(0);
    //const {name, job, image, text, id} = users;

    const checkNumber = (number) => {
        if(number > users.length - 1){
            return 0;
        }
        if(number < 0){
            return users.length-1;
        }
        return number;
    }

    const nextPerson = () =>{
       setIndex((index) => {
           let newIndex = index + 1;
           return checkNumber(newIndex);
       });
    }

    const prevPerson = () =>{
        setIndex((index) =>{
            let newIndex = index - 1;
            return checkNumber(newIndex);
        })
    }

    const randomPerson = () => {
        let randomNumber = Math.floor(Math.random() * users.length);
        if(randomNumber === index){
            randomNumber = index + 1;
        }

        return setIndex(checkNumber(randomNumber));
    }

    function removePerson(id){
        let newPeople = users.filter((people) => people.id !== id);
    }

    return (
    <article className = {styles.review}>
        <div className = {styles.imgContainer}>
            <img src = {users[index].img} alt = {users[index].name} className ={styles.personImg} />
            <span className = {styles.quoteIcon}>
                <FaJsSquare />
            </span>
            </div>
            <div className = {styles.userInfo}>
            <Link to="/user-profile">
            <h4 className = {styles.author}>{users[index].title}</h4>
            </Link>
            <p className = {styles.job}>{users[index].prof}</p>
            </div>
            <div className = {styles.info}>
            <span className = {styles.quoteIconText}>
                <FaQuoteLeft />
            </span>
            <span className = {styles.description}>
                {users[index].text}
            </span>
            <span className = {styles.quoteIconText}>
                <FaQuoteRight />
            </span>
            </div>
            <footer className = {styles.reviewBtnContainer}> 
                <div className = {styles.buttonContainer}>
                <button className = {styles.prevBtn} onClick = {()=>{
            index < users.length - 1 && setIndex(index + 1);
        }}>
                    <FaChevronLeft />
                </button>
                <button className = {styles.nextBtn} onClick = {()=>{index > 0 && setIndex(index - 1)}} >
                    <FaChevronRight />
                </button>
                </div>

                <div className = {styles.buttonContainerRandom}>
                <button className = {styles.pass} onClick = {randomPerson}> pass </button>
                <button className = {styles.connect} onClick = {randomPerson}>connect</button>
                {/*"A different language is a different vision of life." <em>Fellini</em>*/}
                </div>
            </footer>
    </article>)
}

export default ExploreUsers;