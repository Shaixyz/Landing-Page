import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInterceptor from '../../components/api/AxiosInterceptor';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { googleLogout } from '@react-oauth/google';
  



const AuthContext = createContext({
	isAuthenticated: false,
	isLoading: true,
	setIsLoading: () => { },
	user: null,
	token: null,
	login: () => { },
	logout: () => { },
	signup: () => { },
	verify: () => { },
	googleLogin: () => { },
	error: null,
});

const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null);
	const [token, setToken] = useState(null);
	const [isAuthenticated, setAuthenticated] = useState(false);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const fetchUser = async () => {
			setIsLoading(true);
			const token = localStorage.getItem('token');
			if (token) {

				try {
					const res = await AxiosInterceptor.get("/api/account");
					// const res = await axios.get(`${process.env.REACT_APP_PRO_API}/api/account`);
					if (res.status === 200) {
						setUser(res.data);
						setAuthenticated(true);
						setError(null);
						navigate("/");
					}
				} catch (error) {
					setUser(null);
					setAuthenticated(false);
					setError({
						title: "Token Error",
						message: "Phiên đăng nhập của bạn đã hết hạn, hãy đăng nhập lại."
					});
					return;
				}
			}
			setIsLoading(false);
		};
		fetchUser();
	}, []);

	const login = async (userAccount) => {
		setIsLoading(true);
		let res;
		try {
			console.log("Sending login request...");
			res = await axios.post(
				`${process.env.REACT_APP_PRO_API}/api/account/login`,
				{
					userName: userAccount.userName,
					password: userAccount.password
				}
			);
			console.log("Login response received:", res);
		} catch (error) { //res.status !== 200
			setAuthenticated(false);
			setError(error?.response?.data?.reasons[0]);
			setIsLoading(false);
			return;

		}
		if (res.status === 200) {
			setToken(res.data.token);
			const decode = jwtDecode(res.data.token);
			const userInfo = JSON.parse(decode.UserInfo || '{}');
			const clientRole = userInfo.Role; // Lấy vai trò từ UserInfo

			if (clientRole === "Admin" || clientRole === "Manager" || clientRole === "Student") {
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('refreshToken', res.data.refreshToken);
				let resData;
				try {
					resData = await axios.get(`${process.env.REACT_APP_PRO_API}/api/account`, {
						headers: {
							Authorization: `Bearer ${res.data.token}`
						}
					}
					);
				} catch (error) {
					await logout();
					setIsLoading(false);
					setError({
						title: "Token Error",
						message: "Lỗi xác thực, hãy thử lại."
					});
					return;
				}
				if (resData.status === 200) {
					// if (resData.data.status === "ACTIVE") {
					// 	setUser(resData.data);
					// 	setAuthenticated(true);
					// 	setError(null);
					// 	console.log("Login successful, navigating to home...");
					// 	navigate("/");
					// } else {
					// 	await logout();
					// 	setError({
					// 		title: "Account Banned",
					// 		message: "Tài khoản của bạn đã bị khóa, hãy thử lại."
					// 	});
					// }
					setUser(resData.data);
					setAuthenticated(true);
					setError(null);
					console.log("Login successful, navigating to home...");

					if (clientRole === "Admin") {
						navigate('/dashboard');
					} else {
						navigate('/');
					}
				}
			} else {
				setAuthenticated(false);
				setError({
					title: "Access Denied",
					message: "Truy cập của bạn bị từ chối, hãy thử lại."
				});
			}
		}
		setIsLoading(false);
	};

	const googleLogin = async (googleToken) => {
		setIsLoading(true);
		let res;
		try {
			console.log("Sending Google login request...");
			res = await axios.post(
				`${process.env.REACT_APP_PRO_API}/api/google/signin/${googleToken}`
			);
			console.log("Google login response received:", res);

			if (res.status === 200) {
				const { token, refreshToken } = res.data;
				setToken(token);
				localStorage.setItem('token', token);
				localStorage.setItem('refreshToken', refreshToken);

				const decode = jwtDecode(token);
				const userInfo = JSON.parse(decode.UserInfo || '{}');
				const clientRole = userInfo.Role;

				if (clientRole === "Admin" || clientRole === "Manager" || clientRole === "Student") {
					let resData;
					try {
						resData = await axios.get(`${process.env.REACT_APP_PRO_API}/api/account`, {
							headers: {
								Authorization: `Bearer ${token}`
							}
						});
					} catch (error) {
						await logout();
						setError({
							title: "Token Error",
							message: "Lỗi xác thực, hãy thử lại."
						});
						return;
					}

					if (resData.status === 200) {
						setUser(resData.data);
						setAuthenticated(true);
						setError(null);
						navigate("/");
					}
				} else {
					setAuthenticated(false);
					setError({
						title: "Access Denied",
						message: "Your Email need to verify, please Sign Up."
					});
				}
			} else {
				setError({
					title: "Google Login Failed",
					message: "Google login failed, please try again."
				});
			}
		} catch (error) {
			setError({
				title: "Google Login Error",
				message: error?.response?.data?.message || "Google login failed, please try again."
			});
		} finally {
			setIsLoading(false);
		}
	};


	const logout = async () => {
		googleLogout();
		setUser(null);
		setToken(null);
		setAuthenticated(false);
		setError(null);
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
	};


	const signup = async (userDetails) => {
		setIsLoading(true);
		let registerRes;
		try {
			registerRes = await axios.post(
				`${process.env.REACT_APP_PRO_API}/api/account/register`,
				{
					userName: userDetails.userName,
					password: userDetails.password,
					role: userDetails.role,
				}
			);
			console.log("Register response received:", registerRes);

			if (registerRes.status === 201) {
				// Redirect to verify page
				navigate('/verify');
			}
		} catch (error) {
			console.log(error);

			setError({

				title: "Registration Error",
				message: error?.response?.data?.reasons[0] || "Failed to register, please try again.",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const verify = async (verificationData) => {
		setIsLoading(true);
		let verifyRes;
		try {
			console.log("Sending request...");
			verifyRes = await axios.post(
				`${process.env.REACT_APP_PRO_API}/api/account/verify`,
				{
					code: verificationData.code,
					email: verificationData.email,
				}
			);
			console.log("Verify response received:", verifyRes);

			if (verifyRes.status === 200) {
				const { token, refreshToken } = verifyRes.data;
				setToken(token);
				localStorage.setItem('token', token);
				localStorage.setItem('refreshToken', refreshToken);

				const decode = jwtDecode(token);
				const userInfo = JSON.parse(decode.UserInfo || '{}');
				const clientRole = userInfo.Role; // Lấy vai trò từ UserInfo
				console.log("user info", decode);
				console.log("Role", clientRole);

				if (clientRole === "Admin" || clientRole === "Manager" || clientRole === "Student") {
					let resData;
					try {
						resData = await axios.get(`${process.env.REACT_APP_PRO_API}/api/account`, {
							headers: {
								Authorization: `Bearer ${token}`
							}
						});
					} catch (error) {
						await logout();
						setError({
							title: "Token Error",
							message: "Lỗi xác thực, hãy thử lại."
						});
						return;
					}

					if (resData.status === 200) {
						setUser(resData.data);
						setAuthenticated(true);
						setError(null);
						navigate("/");
					}
				} else {
					setAuthenticated(false);
					setError({
						title: "Access Denied",
						message: "Truy cập của bạn bị từ chối, hãy thử lại."
					});
				}
			} else {
				setError({
					title: "Verification Failed",
					message: "Mã xác thực không hợp lệ, hãy thử lại."
				});
			}
		} catch (error) {
			// Check if the error is a 400 Bad Request
			if (error.response && error.response.status === 400) {
				setError({
					title: "Bad Request",
					message: error.response.data.message || "Dữ liệu yêu cầu không hợp lệ. Vui lòng kiểm tra lại."
				});
			} else {
				// General error handling
				setError({
					title: "Verification Error",
					message: error.response?.data?.message || "Lỗi trong quá trình xác thực, hãy thử lại."
				});
			}
			console.error("Verification error details:", error.response); // Log error details
		} finally {
			setIsLoading(false);
		}
	};

	const resend = async (email) => {
		setIsLoading(true);
		let resendRes;
		try {
			console.log("Sending resend request...");
			resendRes = await axios.post(
				`${process.env.REACT_APP_PRO_API}/api/account/resend`,
				{
					email: email,
				}
			);
			console.log("Resend response received:", resendRes);

			if (resendRes.status === 200) {
				setError({
					title: "Resend Successful",
					message: "A new verification code has been sent to your email.",
				});
			} else {
				setError({
					title: "Resend Failed",
					message: "Failed to resend the verification code, please try again.",
				});
			}
		} catch (error) {
			// Handle specific error cases
			if (error.response && error.response.status === 400) {
				setError({
					title: "Bad Request",
					message: error.response.data.message || "Invalid request. Please check your data and try again.",
				});
			} else {
				// General error handling
				setError({
					title: "Resend Error",
					message: error.response?.data?.message || "Error resending verification code, please try again.",
				});
			}
			console.error("Resend error details:", error.response); // Log error details
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (error) {
			toast.error(`${error.message}`);
		}
	}, [error]);

	return (
		<AuthContext.Provider
			value={{
				user,
				token,
				isAuthenticated,
				isLoading,
				setIsLoading,
				login,
				logout,
				signup,
				verify,
				resend,
				googleLogin,
				error
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };