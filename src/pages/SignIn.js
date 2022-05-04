import {useState, useRef} from "react";
import {useNavigate} from "react-router-dom"
import {useAuth} from "../AuthContext"
import {Form, Button} from "react-bootstrap"

// sign in page
function SignIn() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const emailRef = useRef();
    const passwordRef = useRef();
    const navigate = useNavigate();
    const {signin} = useAuth();
    
    // signs in the user using firebase auth
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
        <div className="sign-in" data-testid="sign-in">
            <Button data-testid="back-button" variant="link" onClick={() => {navigate('/')}} className="back-btn">&laquo; Back</Button>
            <h2>Admin Sign In</h2>
            <Form onSubmit={(e) => handleSignin(e)}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address <span className="required">*</span></Form.Label>
                    <Form.Control data-testid="email-input" required={true} ref = {emailRef} type="email" placeholder="Enter email" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password <span className="required">*</span></Form.Label>
                    <Form.Control data-testid="password-input" required={true} ref={passwordRef} type="password" placeholder="Password" />
                </Form.Group>
            
                <Button data-testid="login-button" disabled={loading} variant="primary" type="submit">
                    Log In
                </Button>
                {error && <p className="error">{error}</p>}
            </Form>
        </div>
    )
}

export default SignIn;