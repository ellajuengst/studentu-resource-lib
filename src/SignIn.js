import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom"
import {useAuth} from "./AuthContext"

function SignIn() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const {signin} = useAuth();
    
    const handleSignin = (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        signin(email, password)
            .then((ref) => {
                setLoading(false);
                navigate('/');
            })
            .catch((error) => {
                setError(error.message);
                setLoading(false);
            });
    };

    return(
        <form onSubmit={(e) => handleSignin(e)}>
            <input
                placeholder="Email"
                type="email"
                required={true}
                ref = {emailRef}
            /><br/>
            <input
                placeholder="Password"
                type="password"
                required={true}
                ref={passwordRef}
            /><br/>
            <input 
                type="submit" 
                value="Log In"
                disabled={loading}
            />
            {error && <p>{error}</p>}
        </form>
    )
}

export default SignIn;