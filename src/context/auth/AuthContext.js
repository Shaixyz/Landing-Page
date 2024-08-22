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
			if (token) {
				try {
					const res = await AxiosInterceptor.get("/api/account");
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
				}
			}
			setIsLoading(false);
		};
		fetchUser();
	}, [navigate]);

	const login = async (userAccount) => {
		setIsLoading(true);
		try {
			const res = await AxiosInterceptor.post(
				("/api/account/login"),
				{
					userName: userAccount.userName,
					password: userAccount.password
				}
			);
			if (res.status === 200) {
				const { token, refreshToken } = res.data;
				localStorage.setItem('token', token);
				localStorage.setItem('refreshToken', refreshToken);

				const decode = jwtDecode(token);
				const clientRole = decode.role;

				if (clientRole === "Admin" || clientRole === "Manager") {
					let resData;
					try {
						const resData = await axios.get(`${process.env.REACT_APP_PRO_API}/api/account`, {
							headers: {
								Authorization: `Bearer ${token}`
							}
						}
						);

						if (resData.status === 200) {
							if (resData.data.status === "ACTIVE") {
								setUser(resData.data);
								setAuthenticated(true);
								setError(null);
								navigate("/");
							} else {
								await logout();
								setError({
									title: "Account Banned",
									message: "Tài khoản của bạn đã bị khóa, hãy thử lại."
								});
							}
						}
					} catch (error) {
						await logout();
						setError({
							title: "Token Error",
							message: "Lỗi xác thực, hãy thử lại."
						});
					}
				} else {
					setAuthenticated(false);
					setError({
						title: "Access Denied",
						message: "Truy cập của bạn bị từ chối, hãy thử lại."
					});
				}
			}
		} catch (error) {
			setAuthenticated(false);
			setError({
				title: "Login Error",
				message: "Tên người dùng hoặc mật khẩu không đúng."
			});
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