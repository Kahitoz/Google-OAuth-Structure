import jwt_decode from "jwt-decode"
import Cookies from "js-cookies"
import { useState } from "react"
const UserProfile = () =>{
    const [name, setname] =useState("")
    cosnt[l_name, setl_name] = useState("")
    const token = Cookies.getItem("Access_token")
    const decoded = jwt_decode(token)

    console.log(decoded)
    setname(decoded.given_name)
    setl_name(decoded.family_name)
    
    const join = name +" "+l_name
    return(
        <>
        <p>Hello, {join}</p>
        </>
    )
}
export default UserProfile