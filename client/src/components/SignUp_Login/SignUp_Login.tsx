import { Link } from 'react-router-dom';
import './SignUp_Login.css';
import { loginUser } from '../../services/backEndService';
import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { mainContext } from '../../App';
import { AppContextInterface } from '../../App';
import { FcGoogle } from 'react-icons/fc';
import { GrFacebook } from 'react-icons/gr';
import { BsLinkedin } from 'react-icons/bs';

const SignUp_Login: React.FC = () => {
  const [signUp, setSignUp] = useState<boolean>(true);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleEmailChange = (event: any) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const toggleFunction = () => {
    if (signUp === true) {
      setSignUp(false);
    } else {
      setSignUp(true);
    }
  };

  const navigate = useNavigate();
  const context = useContext(mainContext) as AppContextInterface;
  //Function for logging in
  function handleLogin(event: React.SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const formElements = form.elements as typeof form.elements & {
      email: { value: string };
      password: { value: string };
    };
    console.log('Logging in...');
    //set auth to be true if we get a response
    loginUser(formElements).then((res) => {
      context.setIsAuthenticated(true);
      context.setCurrentUser(res);
    });
    formElements.email.value = '';
    formElements.password.value = '';
    //navigate to home
    navigate('/');
  }

  return (
    <>
      <h2>FMB</h2>
      {signUp ? (
        <div className="container right-panel-active" id="container">
          <div className="form-container sign-up-container">
            <form className="signupform">
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="h" className="social">
                  <GrFacebook className="fab fa-facebook-f"></GrFacebook>
                </a>
                <a href="r" className="social">
                  <FcGoogle className="fab fa-google-plus-g"></FcGoogle>
                </a>
                <a href="t" className="social">
                  <BsLinkedin className="fab fa-linkedin-in"></BsLinkedin>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />

              <Link to="/signup">
                <button disabled={!email || !password} className="signupbutton">
                  Create account
                </button>
              </Link>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="signupform" onSubmit={handleLogin}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="g" className="social">
                  <GrFacebook className="fab fa-facebook-f"></GrFacebook>
                </a>
                <a href="f" className="social">
                  <FcGoogle className="fab fa-google-plus-g"></FcGoogle>
                </a>
                <a href="d" className="social">
                  <BsLinkedin className="fab fa-linkedin-in"></BsLinkedin>
                </a>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <a href="d">Forgot your password?</a>
              <button disabled={!email || !password} className="signinbutton">
                Log in
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn" onClick={toggleFunction}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Artist!</h1>
                <p>
                  Enter your personal details and start your journey with us
                </p>
                <button className="ghost" id="signUp" onClick={toggleFunction}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="container" id="container">
          <div className="form-container sign-up-container">
            <form className="signupform" action="#">
              <h1>Create Account</h1>
              <div className="social-container">
                <a href="h" className="social">
                  <GrFacebook className="fab fa-facebook-f"></GrFacebook>
                </a>
                <a href="r" className="social">
                  <FcGoogle className="fab fa-google-plus-g"></FcGoogle>
                </a>
                <a href="t" className="social">
                  <BsLinkedin className="fab fa-linkedin-in"></BsLinkedin>
                </a>
              </div>
              <span>or use your email for registration</span>
              <input type="email" placeholder="Email" />
              <input type="password" placeholder="Password" />
              <Link to="/signup">
                <button>Sign Up</button>
              </Link>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form className="signupform" onSubmit={handleLogin}>
              <h1>Sign in</h1>
              <div className="social-container">
                <a href="g" className="social">
                  <GrFacebook className="fab fa-facebook-f"></GrFacebook>
                </a>
                <a href="f" className="social">
                  <FcGoogle className="fab fa-google-plus-g"></FcGoogle>
                </a>
                <a href="d" className="social">
                  <BsLinkedin className="fab fa-linkedin-in"></BsLinkedin>
                </a>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                placeholder="Email"
                onChange={handleEmailChange}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <a href="d">Forgot your password?</a>
              <button disabled={!email || !password} className="signinbutton">
                Log in
              </button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button className="ghost" id="signIn" onClick={toggleFunction}>
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Artist!</h1>
                <p>
                  Enter your personal details and start your journey with us
                </p>
                <button className="ghost" id="signUp" onClick={toggleFunction}>
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
    // <div className="login-container">
    //   <div className="form-container">
    //     <h1 className="logo-text">FMB</h1>
    //     <h2>Welcome to Find My Band</h2>
    //     <form className="login-form" onSubmit={handleLogin}>
    //       <h3>Email</h3>
    //       <input
    //         className="form-input email-input"
    //         name="email"
    //         type="email"
    //       ></input>
    //       <h3>Password</h3>
    //       <input
    //         className="form-input pass-input"
    //         name="password"
    //         type="password"
    //       ></input>
    //       <div className="submit-container">
    //         <button type="submit" className="submit-btn">
    //           Login
    //         </button>
    //       </div>
    //     </form>

    //     <div className="register-container">
    //       <h3>Not a member ? Register below</h3>
    //       <Link to="/signup">
    //         <button className="create-btn">Create Account</button>
    //       </Link>
    //     </div>
    //   </div>
    // </div>
  );
};

export default SignUp_Login;
