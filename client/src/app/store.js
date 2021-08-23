import { configureStore } from '@reduxjs/toolkit';

import postsReducer from '../features/posts/postsSlice';
import usersReducer from '../features/users/usersSlice';
import loginReducer from '../features/login/loginSlice';


const store = configureStore({
  reducer: {
    login: loginReducer,
    users: usersReducer,
    posts: postsReducer,
  },
});

export default store;



