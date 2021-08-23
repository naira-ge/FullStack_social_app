import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { registerPending, registerSuccess, registerFail } from "../../../features/login/loginSlice";
import { registerNewUser } from '../../../features/users/userAction';
import { registerUser } from '../../../api/usersApi';
import styles from './styles.module.scss';


function SignUp(props) {
   const dispatch = useDispatch();
   const history = useHistory();
   let location = useLocation();

   const [userName, setUserName] = useState("");
   const [email, setEmail] = useState("");
   const [emailMsg, setEmailMsg] = useState("");
   const [password, setPassword] = useState("");
   const [passwordMsg, setPasswordMsg] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [confirmPasswordMsg, setConfirmPasswordMsg] = useState("");
   const [errorMsg, setErrorMsg] = useState("");
   const [validate, setValidate] = useState(true);

   const handleOnChange = (e) => {
      const { name, value } = e.target;

      switch (name) {
         case "userName":
            setUserName(value);
            break;
         
         case "email":
            setEmail(value);
            break;

         case "password":
            setPassword(value);
            break;
         
         case "confirmPassword":
            setConfirmPassword(value);
            break;

         default:
            break;
      }
   };

   const validateFields = (userName, email, password, confirmPassword) => {

      //validate email
      let emailFormat = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

      if(!email.match(emailFormat)) {
         setEmailMsg("Email is incorrect");
         setValidate(false);
      }

      //validate password
      let lowerCaseLetters = /[a-z]/g;
      var upperCaseLetters = /[A-Z]/g;
      var numbers = /[0-9]/g;

      if(!password.match(lowerCaseLetters) || !password.match(upperCaseLetters) || !password.match(numbers)) {
         setPasswordMsg("Password must contain at least one number and one uppercase and lowercase letter");
         setValidate(false);
      }

      //validate confirm password
      if(confirmPassword === "" || confirmPassword !== password){
         setConfirmPasswordMsg("Password is incorrect");
         setValidate(false);
      }

   }

   const handleSignUpSubmit = async (e) => {
      e.preventDefault();
      validateFields(userName, email, password, confirmPassword);
      
      if (validate) {
         dispatch(registerPending());

         try {
            const createUser = await registerUser({ username: userName, email: email, password: password });
            console.log('createUser', createUser.data);

            if (createUser.statusText !== "OK") {
               setErrorMsg("Try again invalid email or password!");
               return dispatch(registerFail(createUser.message));
            }
            
            dispatch(registerSuccess());
            dispatch(registerNewUser(createUser.data));

            props.onConfirm();
            history.push('/home');

         } catch (error) {
            dispatch(registerFail(error.message));
         }

      } else {
         setErrorMsg("Please try again");      
      }
   }

      return(
         <div className={styles.loginRight}>
            <form className={styles.loginBox} 
                  onSubmit={ handleSignUpSubmit }>
               <input type="text" placeholder="Username"
                     name = "userName"   
                     onChange={handleOnChange} 
                     value={userName}
                     required
                     className={styles.loginInput} />
               <input type="email" placeholder="Email" 
                     name = "email" 
                     onChange={handleOnChange} 
                     value={email}
                     required
                     autoComplete="off"
                     className={styles.loginInput} />
               <p>{emailMsg}</p>
               <input type="password" placeholder="Password" 
                     name = "password" 
                     onChange={handleOnChange} 
                     value={password}
                     required
                     autoComplete="new-password"
                     minLength="6"
                     className={styles.loginInput} />
                     <p>{passwordMsg}</p>
               <input type="password" placeholder="Confirm Password" 
                     name = "confirmPassword" 
                     onChange={handleOnChange}
                     className={styles.loginInput}
                     value={confirmPassword}
                     required
                     autoComplete="new-password"
                     minLength="6" />
               <p>{confirmPasswordMsg}</p>
               <button type = "submit" className={styles.loginButton}>Sign Up</button>
         </form>
         <div className={styles.signUp}>
            <p onClick={ props.onConfirm }>Already have an account? SignIn</p>
         </div>
            {errorMsg ? <p>${errorMsg}</p> : null}
      </div>
   )
};


export default SignUp;