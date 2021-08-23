import { useState } from 'react';
import SignIn from "../SignForm/SignIn";
import SignUp from "../SignForm/SignUp";
import PasswordReset from '../SignForm/PasswordReset';
import styles from './styles.module.scss';
import { FaHubspot } from "react-icons/fa";



const Entry = (props) => {
    const [frmLoad, setFrmLoad] = useState("login");

    const handleOnResetSubmit = e => {
		e.preventDefault();

	};

	const formSwitcher = (frmType) => {
		setFrmLoad(frmType);
	};

    function cancelHandler(){
        props.onCancel();
    }

    function confirmHandler(){
        props.onConfirm();
    }

    return(
        <div className={styles.modal}>
            <div className={styles.login}>
            <div className={styles.signUpContainerHeader}>
                <span onClick={cancelHandler}>X</span>
            </div>
            <div className={styles.loginWrapper}>
                <div className={styles.loginLeft}
                    style={{ backgroundImage: `url(/gif/logo.gif)` }}>
                    <h3 className={styles.loginLogo}><FaHubspot /> TalentHouse</h3>
                    <span className={styles.loginDesc}>
                    Connect talented people around the world 
                    </span>
                    </div>
                    {frmLoad === 'login' && (
                    props.register ?
                        <SignUp onConfirm={confirmHandler} /> :
                        <SignIn
                                formSwitcher={formSwitcher}
                                onConfirm={confirmHandler}
                                formSwitcher={formSwitcher}/>
                    )}

                    {frmLoad === 'rest' && 
                        <PasswordReset
                            formSwitcher={formSwitcher}
                            handleOnResetSubmit={handleOnResetSubmit}
                            formSwitcher={formSwitcher}/>}
                </div>
            </div>
        </div>
    )
}


export default Entry;
