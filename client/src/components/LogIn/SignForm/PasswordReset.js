import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";

import { loginPending, loginSuccess, loginFail } from "../../../features/login/loginSlice";
import { userLogin } from '../../../api/usersApi';
import { getUserProfile } from '../../../features/users/userAction';
import styles from './styles.module.scss';



const PasswordReset = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();
   let location = useLocation();

   const { isLoading, isAuth, error } = useSelector(state => state.login);
   let { from } = location.state || { from: { pathname: "/" } };


   /*useEffect(() => {
      sessionStorage.getItem("accessJWT") && history.replace(from);
   }, [history, isAuth]);*/

   const [email, setEmail] = useState("");
   const [emailMsg, setEmailMsg] = useState("");
   const [password, setPassword] = useState("");
   const [passMsg, setPassMsg] = useState("");

   const handleOnChange = (e) => {
      const { name, value } = e.target;

      switch (name) {
         case "email":
            setEmail(value);
            break;

         default:
            break;
      }
   };

   const handleResetSubmit = async (e) => {
      e.preventDefault();
         
         if (!email || !password) { 
            setPassMsg("Fill up all the form!");
         };

         dispatch(loginPending());

         try {
            const isAuth = await userLogin({ email, password });
            console.log('isAuth', isAuth.data);

            if (isAuth.statusText !== "OK") {
               setPassMsg("Invalid email or password!");
               return dispatch(loginFail(isAuth.message));
			   }

            dispatch(loginSuccess());
            dispatch(getUserProfile(isAuth.data.id));
            
            props.onConfirm();
            history.push('/home');

         } catch (error) {
            setPassMsg("Invalid email or password!");
            dispatch(loginFail(error.message));
         }
      
      };


      return (
         <div className={styles.loginRight}>
            <form className={styles.loginBox}
               onSubmit={handleResetSubmit}>
               <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  autoComplete="off"
                  onChange={handleOnChange}
                  value={email}
                  className={styles.loginInput}></input>
               <p>{emailMsg}</p>
               <button type = "submit" className={styles.loginButton}>Reset Password</button>
            </form>
            <div className={styles.signUp}>
               <p onClick={() => props.formSwitcher("login")}>Sign In Now</p>
            </div>
         </div>
      )
   };

export default PasswordReset;
