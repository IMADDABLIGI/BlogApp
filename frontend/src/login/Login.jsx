// Login.jsx
import React from 'react';
import './Login.css';

export default function Login() {
	return (
		<div className="login-container">
			<div className="login-card">
				<h2 className="login-title">Sign In</h2>

				<form className="login-form">
					<div className="form-group">
						<label className="form-label">Email</label>
						<input
							type="email"
							className="form-input"
							placeholder="your@email.com"
						/>
					</div>

					<div className="form-group">
						<label className="form-label">Password</label>
						<input
							type="password"
							className="form-input"
							placeholder="••••••••"
						/>
					</div>

					<div className="form-row">
						<label className="checkbox-label">
							<input type="checkbox" className="checkbox-input" />
							<span className="checkbox-text">Remember me</span>
						</label>
						<a href="#" className="forgot-link">Forgot password?</a>
					</div>

					<button className="login-button">
						Login
					</button>
				</form>

				<div className="signup-prompt">
					Don't have an account?
					<a href="/register" className="signup-link"> Sign up</a>
				</div>
			</div>
		</div>
	);
}