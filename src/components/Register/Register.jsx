import { useState } from "react";

export default function Register({ onRouteChange, loadUser }) {
    const [accountInfo, setAccountInfo] = useState({
      name: '',
      email: '',
      password: ''
    });

    function onNameChange(evt) {
      setAccountInfo({ ...accountInfo, name: evt.target.value });
    }

    function onEmailChange(evt) {
      setAccountInfo({ ...accountInfo, email: evt.target.value });
    }

    function onPasswordChange(evt) {
      setAccountInfo({ ...accountInfo, password: evt.target.value });
    }

    async function onSubmitRegister() {
      const { name, email, password } = accountInfo;
      try {
        const res = await fetch('http://localhost:3001/register', {
          method: 'post',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
        const user = await res.json();

        if (user.id) {
          loadUser(user);
          onRouteChange('home');
        }
      } catch (err) {
        console.log(err);
      }
    }
  
  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={onNameChange}
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                type="email"
                name="email-address"
                id="email-address"
                onChange={onEmailChange}
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input 
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                type="password" 
                name="password" 
                id="password"
                onChange={onPasswordChange} 
              />
            </div>
          </fieldset>
          <div className="">
            <input
              className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
              onClick={onSubmitRegister}
            />
          </div>
        </div>
      </main>
    </article>
  );
}