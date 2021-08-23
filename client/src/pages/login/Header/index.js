import { useState } from 'react';
import { FaHubspot } from "react-icons/fa";
import styles from './styles.module.scss';
import Entry from '../../../components/LogIn/Entry';
import Backdrop from '../../../components/LogIn/Entry/Backdrop';


const Header = () => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [register, setRegister] = useState(false);

    function openModalHandler(signUp) {
        if (signUp) {
            setRegister(true)
            setModalIsOpen(true)
        };
        
        setModalIsOpen(true)
    }

    function closeModalHandler(){
        setModalIsOpen(false);
        setRegister(false);
    }
    
    return(
        <div className = {styles.navContainer}>
                <div className = {styles.navLeft}>
                <span className = {styles.logo}><FaHubspot className = {styles.logoImg}/> TalentHouse</span>
                </div>
                <div className = {styles.navRight}>
                <div className ={styles.navMenu}>
                    <p onClick={() => openModalHandler("signUp")}>Sign Up</p>
                    <span>/</span>
                    <p onClick={() => openModalHandler()}>Sign In</p>
                    </div>
                </div>
            {modalIsOpen && (
                register ?
                <Entry
                register
                onCancel = {closeModalHandler}
                onConfirm = {closeModalHandler}
                    /> :
                <Entry
                onCancel = {closeModalHandler}
                onConfirm = {closeModalHandler}
                />)}
                {modalIsOpen && <Backdrop onClick = {closeModalHandler}/>}
        </div>
    )
}


export default Header;