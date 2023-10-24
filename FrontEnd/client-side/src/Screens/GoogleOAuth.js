    import { useEffect, useState } from "react";
    import { useNavigate } from "react-router-dom";
    const GoogleOAuth = () => {
    const [gwt, setgwt] = useState("");
    function handleCallbackResponse(response) {
        try {
        if (response.error) {
            return;
        }
        setgwt(response.credential);
        } catch (error) {}
    }
    console.log(gwt)

    const client_id = process.env.REACT_APP_CLIENT_ID;
    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
        client_id: client_id,
        callback: handleCallbackResponse,
        });
        google.accounts.id.renderButton(document.getElementById("signInDiv"), {
        theme: "outline",
        size: "large",
        });
    }, []);

    const navigate = useNavigate();
    const now_navigate = () =>{
        navigate('/user/profile')
    }
    useEffect(()=>{
        if(gwt){
            now_navigate()
        }
    })
    return (
        <>
        <div id="signInDiv"></div>
        </>
    );
    };
    export default GoogleOAuth;
