// Login.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

export default function Login() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const navigate = useNavigate(); // ✅ Initialize

	useEffect(() => {
		const handlePopState = () => {
			console.log('Back button pressed');
			navigate('/', { replace: true }); // 👈 force redirect to /home
		};
	
		window.addEventListener('popstate', handlePopState);
	
		return () => {
			window.removeEventListener('popstate', handlePopState);
		};
	}, []);

	const handleLogin = async (e) => {
		e.preventDefault(); // Prevent form from reloading the page
		setMessage('');

		try {
			const response = await fetch('http://localhost:5000/api/auth/signin', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ email, password }),
			});

			const data = await response.json();
			if (response.ok) {
				setMessage('Login successful!');
				console.log('Login success:', data);
				// Example: store token in localStorage or redirect
				localStorage.setItem('token', data.token);
				// ✅ Redirect to /nav
				navigate('/blogs');
			} else {
				setMessage(`Login failed: ${data.message || 'Unknown error'}`);
			}
		} catch (error) {
			setMessage(`Error: ${error.message}`);
			console.error('Login error:', error);
		}
	};

	return (
		<div className="login-container">
			<div className="login-card">
				<h2 className="login-title">Sign In</h2>
				{message && (
					<div className={`message ${message.includes('success') ? 'success' : 'error'}`}>
						{message}
					</div>
				)}
				<form className="login-form" onSubmit={handleLogin}>
					<div className="form-group">
						<label className="form-label">Email</label>
						<input
							type="email"
							className="form-input"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="your@email.com"
							required
						/>
					</div>

					<div className="form-group">
						<label className="form-label">Password</label>
						<input
							type="password"
							className="form-input"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							required
						/>
					</div>

					<div className="form-row">
						<label className="checkbox-label">
							<input type="checkbox" className="checkbox-input" />
							<span className="checkbox-text">Remember me</span>
						</label>
						<a href="#" className="forgot-link">Forgot password?</a>
					</div>

					<button type="submit" className="login-button">
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
