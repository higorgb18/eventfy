import { configureStore } from '@reduxjs/toolkit'


export default configureStore({
  reducer: {
    posts: 'postsReducer',
    users: 'usersReducer'
  }
})