import {useAuth} from "./AuthContext"

function SignOut() {
    const {signout} = useAuth();
    
    const handleSignout = () => {
        signout();
    }

    return(
        <button onClick={handleSignout}>
            Logout
        </button>
    )
}

export default SignOut;