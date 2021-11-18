import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [blogs, setBlogs] = useState()

  const [editBlog, setEditBlog] = useState()

  const [count, setCount] = useState()

  const [login, setLogin] = useState(localStorage.getItem('access') ? true : false)

  const [email, setEmail] = useState('')

  const values = {
    blogs: blogs,
    setBlogs: setBlogs,
    login: login,
    setLogin: setLogin,
    email:email,
    setEmail: setEmail,
    editBlog: editBlog,
    setEditBlog: setEditBlog,
    count: count,
    setCount: setCount,
  }

  return(
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;