import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Checkbox } from 'primereact/checkbox';

export const Login = () => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="login-body">
            <div className="card login-panel p-fluid">
                <div className="login-panel-content">
                    <div className="grid">
                        <div className="col-12 sm:col-6 md:col-6 logo-container">
                            <img src="assets/layout/images/logo-roma.svg" alt="roma" />
                            <span className="guest-sign-in">Welcome, please use the form to sign-in Roma network</span>
                        </div>
                        <div className="col-12 username-container">
                            <label>Username</label>
                            <div className="login-input">
                                <InputText id="input" type="text" />
                            </div>
                        </div>
                        <div className="col-12 password-container">
                            <label>Password</label>
                            <div className="login-input">
                                <InputText type="password" />
                            </div>
                        </div>
                        <div className="col-12 sm:col-6 md:col-6 rememberme-container">
                            <Checkbox checked={checked} onChange={(e) => setChecked(e.checked)} />
                            <label> Remember me</label>
                        </div>

                        <div className="col-12 sm:col-6 md:col-6 forgetpassword-container">
                            <a href="/" className="forget-password">
                                Forget Password
                            </a>
                        </div>

                        <div className="col-12 sm:col-6 md:col-6">
                            <Button label="Sign In" icon="pi pi-check" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
