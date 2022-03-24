import {useAuth} from "./AuthContext"
import { Button } from 'react-bootstrap';

function SignOut() {
    const {signout} = useAuth();
    
    const handleSignout = () => {
        signout();
    }

    return(
        <Button onClick={handleSignout}>
            Logout
        </Button>
    )
}

export default SignOut;