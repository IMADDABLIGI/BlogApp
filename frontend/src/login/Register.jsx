// SignUp.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './Register.css';

export default function Register() {

	const navigate = useNavigate(); // ✅ Initialize
	// Form state
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		// agreeToTerms: false
	});

	const [message, setMessage] = useState('');

	// Error state
	const [errors, setErrors] = useState({
		firstName: '',
		lastName: '',
		email: '',
		password: '',
		confirmPassword: '',
		// agreeToTerms: '',
		server: '' // For server-side errors
	});

	// Track if form was submitted
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	// Handle input changes
	const handleChange = (e) => {
		const { name, value, type, checked } = e.target;
		const inputValue = type === 'checkbox' ? checked : value;

		setFormData(prevData => ({
			...prevData,
			[name]: inputValue
		}));

		// Clear error when user starts typing
		if (errors[name]) {
			setErrors(prevErrors => ({
				...prevErrors,
				[name]: ''
			}));
		}
	};

	// Validate form
	const validateForm = () => {
		const newErrors = {};
		let isValid = true;

		// First name validation
		if (!formData.firstName.trim()) {
			newErrors.firstName = 'First name is required';
			isValid = false;
		} else if (formData.firstName.length < 3) {
			newErrors.firstName = 'firstName must be at least 3 characters';
			isValid = false;
		}

		// Last name validation
		if (!formData.lastName.trim()) {
			newErrors.lastName = 'Last name is required';
			isValid = false;
		} else if (formData.lastName.length < 3) {
			newErrors.lastName = 'LastName must be at least 3 characters';
			isValid = false;
		}

		// Email validation
		if (!formData.email.trim()) {
			newErrors.email = 'Email is required';
			isValid = false;
		} else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
			newErrors.email = 'Invalid email address';
			isValid = false;
		}

		// Password validation
		if (!formData.password) {
			newErrors.password = 'Password is required';
			isValid = false;
		} else if (formData.password.length < 8) {
			newErrors.password = 'Password must be at least 8 characters';
			isValid = false;
		}

		// Confirm password validation
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
			isValid = false;
		}

		//! Terms agreement validation
		// if (!formData.agreeToTerms) {
		// 	newErrors.agreeToTerms = 'You must agree to the terms';
		// 	isValid = false;
		// }

		setErrors(newErrors);
		return isValid;
	};

	// Handle form submission
	const handleSubmit = async (e) => {
		e.preventDefault();
		setIsSubmitted(true);

		// Validate form
		if (!validateForm()) {
			return;
		}

		try {
			setIsLoading(true);

			const response = await fetch('http://localhost:5000/api/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ "first_name": formData.firstName, "last_name": formData.lastName, "email": formData.email, "password" :formData.password }),
			});
			// Handle successful signup
			const data = await response.json();

			if (response.ok) {
				setMessage('Login successful!');
				console.log('Register success:', data);
				// Example: store token in localStorage or redirect
				localStorage.setItem('token', data.token);
				// ✅ Redirect to /nav
				navigate('/login');
			} else {
				setMessage(`Login failed: ${data.message || 'Unknown error'}`);
				console.error("error message ", message);
			}



		} catch (error) {
			// Handle server errors
			setErrors(prev => ({
				...prev,
				server: error.message || 'An error occurred. Please try again.'
			}));
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="signup-container">
			<div className="signup-card">
				<h1 className="signup-title">Create Account</h1>

				{/* Server error message */}
				{errors.server && (
					<div className="error-message server-error">
						{errors.server}
					</div>
				)}

				<form className="signup-form" onSubmit={handleSubmit} noValidate>
					<div className="form-row">
						<div className="form-group half">
							<label className="form-label">First Name</label>
							<input
								type="text"
								name="firstName"
								className={`form-input ${isSubmitted && errors.firstName ? 'input-error' : ''}`}
								placeholder="John"
								value={formData.firstName}
								onChange={handleChange}
							/>
							{isSubmitted && errors.firstName && (
								<div className="error-message">{errors.firstName}</div>
							)}
						</div>

						<div className="form-group half">
							<label className="form-label">Last Name</label>
							<input
								type="text"
								name="lastName"
								className={`form-input ${isSubmitted && errors.lastName ? 'input-error' : ''}`}
								placeholder="Doe"
								value={formData.lastName}
								onChange={handleChange}
							/>
							{isSubmitted && errors.lastName && (
								<div className="error-message">{errors.lastName}</div>
							)}
						</div>
					</div>

					<div className="form-group">
						<label className="form-label">Email</label>
						<input
							type="email"
							name="email"
							className={`form-input ${isSubmitted && errors.email ? 'input-error' : ''}`}
							placeholder="your@email.com"
							value={formData.email}
							onChange={handleChange}
						/>
						{isSubmitted && errors.email && (
							<div className="error-message">{errors.email}</div>
						)}
					</div>

					<div className="form-group">
						<label className="form-label">Password</label>
						<input
							type="password"
							name="password"
							className={`form-input ${isSubmitted && errors.password ? 'input-error' : ''}`}
							placeholder="•••••••"
							value={formData.password}
							onChange={handleChange}
						/>
						{isSubmitted && errors.password && (
							<div className="error-message">{errors.password}</div>
						)}
					</div>

					<div className="form-group">
						<label className="form-label">Confirm Password</label>
						<input
							type="password"
							name="confirmPassword"
							className={`form-input ${isSubmitted && errors.confirmPassword ? 'input-error' : ''}`}
							placeholder="•••••••"
							value={formData.confirmPassword}
							onChange={handleChange}
						/>
						{isSubmitted && errors.confirmPassword && (
							<div className="error-message">{errors.confirmPassword}</div>
						)}
					</div>

					{/* <div className={`terms-checkbox ${isSubmitted && errors.agreeToTerms ? 'checkbox-error' : ''}`}>
						<input
							type="checkbox"
							id="agreeToTerms"
							name="agreeToTerms"
							className="checkbox-input"
							checked={formData.agreeToTerms}
							onChange={handleChange}
						/>
						<label htmlFor="agreeToTerms" className="checkbox-label">
							I agree to the <Link to="/terms" className="terms-link">Terms of Service</Link> and <Link to="/privacy" className="terms-link">Privacy Policy</Link>
						</label>
					</div>
					{isSubmitted && errors.agreeToTerms && (
						<div className="error-message">{errors.agreeToTerms}</div>
					)} */}

					<button
						type="submit"
						className="signup-button"
						disabled={isLoading}
					>
						{isLoading ? 'Creating Account...' : 'Create Account'}
					</button>
				</form>

				<div className="login-prompt">
					Already have an account? <Link to="/login" className="login-link">Sign in</Link>
				</div>
			</div>
		</div>
	);
}