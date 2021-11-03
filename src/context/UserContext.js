import { createContext, useState } from "react";

export const UserContext = createContext();

const UserProvider = ({ children }) => {

  const [blogs, setBlogs] = useState()

  const [login, setLogin] = useState(false)

  const [email, setEmail] = useState('')

  const values = {
    blogs: blogs,
    setBlogs: setBlogs,
    login: login,
    setLogin: setLogin,
    email:email,
    setEmail: setEmail,
  }

  return(
    <UserContext.Provider value={values}>
      {children}
    </UserContext.Provider>
  )
}

export default UserProvider;