import React, {  useEffect, useState } from 'react';
import styles from './styles.module.scss';


const AddComment = ({newComment}) => {
    const [message, setMessage] = useState("");

    useEffect(() => {}, [message]);

    const handleNewComment = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (message) {
            newComment(message);
            setMessage('');
        }
    }


    return (
        <form 
            onSubmit = {handleSubmit} 
            className = {styles.addForm}>
            <input
                name = "message"
                onChange = {handleNewComment}
                className = {styles.commentInput} 
                value = {message}
                placeholder = "What do you think? Add explore other thoughts"
                type = "text" />
            <input 
                className = {styles.addBtn}
                type="submit"
                value="Add"
                onSubmit = {handleSubmit} />
        </form>
        )
}


export default AddComment;