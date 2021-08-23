import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import { loginPending, loginSuccess, loginFail } from "../../../features/login/loginSlice";
import Loader from '../../../components/Loader/index';
import { userLogin } from '../../../api/usersApi';
import { getUserProfile } from '../../../features/users/userAction';
import styles from './styles.module.scss';



const SignIn = (props) => {
   const dispatch = useDispatch();
   const history = useHistory();

   const { isLoadingLogIn, isAuth, errorLogIn} = useSelector(state => state.login);

   useEffect(() => {
      
   }, [history, isAuth]);

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

         case "password":
            setPassword(value);
            break;

         default:
            break;
      }
   };

   const handleSignInSubmit = async (e) => {
      e.preventDefault();
         
         if (!email || !password) { 
            setPassMsg("Fill up all the form!");
         };

         dispatch(loginPending());

         try {
            const isAuth = await userLogin({ email, password });
            console.log('isAuth', isAuth);

            if (isAuth.status === "error") {
               setPassMsg("Invalid email or password!");
               return dispatch(loginFail(isAuth.message));
            };

            dispatch(loginSuccess());
            dispatch(getUserProfile());
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
               onSubmit={handleSignInSubmit}>
               <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                  autoComplete="off"
                  onChange={handleOnChange}
                  value={email}
                  className={styles.loginInput} />
               <p>{emailMsg}</p>
               <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                  autoComplete="new-password"
                  minLength="6"
                  onChange={handleOnChange}
                  value={password}
                  className={styles.loginInput} />
               <p>{passMsg}</p>
               <button type="submit" className={styles.loginButton}> Sign In</button>
               {isLoadingLogIn && <Loader /> }
            </form>
            <div className={styles.signUp}>
               {errorLogIn && <h3>Ups! Try again</h3>}
               <p onClick={() => props.formSwitcher('rest')}>Forget Password?</p>
            </div>
         </div>
      )
   };

export default SignIn;
