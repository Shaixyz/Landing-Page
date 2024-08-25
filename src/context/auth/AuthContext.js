import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInterceptor from '../../components/api/AxiosInterceptor';

const AuthContext = createContext({
	isAuthenticated: false,
	isLoading: true,
	setIsLoading: () => { },
	user: null,
	token: null,
	login: () => { },
	logout: () => { },
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
			console.log("tok2", token);
			if (token) {
				console.log("haha");
				
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
		console.log("chay vo day");
	}, [error]);

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
					//TODO: Khi nao account co status thi if else
					setUser(resData.data);
						setAuthenticated(true);
						setError(null);
						console.log("Login successful, navigating to home...");
						navigate("/");
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

	const logout = async () => {
		setUser(null);
		setToken(null);
		setAuthenticated(false);
		setError(null);
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
	};

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
				error
			}}
		>
			{children}
		</AuthContext.Provider>
	);
};

export { AuthContext, AuthProvider };