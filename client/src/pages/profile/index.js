import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux';
import { updateUser } from '../../api/usersApi';
import Topbar from '../../components/Topbar/index';
import Sidebar from '../../components/Sidebar/index';
import Feed from '../../components/Feed/index';
import Rightbar from '../../components/Rightbar/index';
import styles from './styles.module.scss';

export default function UserProfile() {
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const account = useSelector(state => state.users.user);
  const dispatch = useDispatch();

  const handleUpdate = (e) => {
    e.preventDefault();
    updateUser({ name, email }, dispatch);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    dispatch();
  }

 
    useEffect(() => {
        
    }, [account]);
  
  return (
      <div className={styles.profile}>
        <Rightbar profile />
        <div className={styles.profileRight}>
        <div>
          <Topbar />
          <Feed />
        </div>
        <div>
          <Sidebar user/>
        </div>
      </div>
    </div>
  )
  };
  