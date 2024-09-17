import axios from 'axios';
import {jwtDecode} from 'jwt-decode';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AxiosInterceptor from '../../components/api/AxiosInterceptor';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { googleLogout } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { setToken, setRefreshToken, clearTokens, setUser } from '../slices/authSlice';

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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token, isAuthenticated } = useSelector((state) => state.auth);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const res = await AxiosInterceptor.get("/api/account");
                    if (res.status === 200) {
                        dispatch(setUser(res.data));
                        dispatch(setToken(token));
                        setError(null);
                        navigate("/");
                    }
                } catch (error) {
                    dispatch(clearTokens());
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
    }, [dispatch, navigate]);

    const login = async (userAccount) => {
        setIsLoading(true);
        let res;
        try {
            res = await axios.post(`${process.env.REACT_APP_PRO_API}/api/account/login`, {
                userName: userAccount.userName,
                password: userAccount.password
            });
        } catch (error) {
            dispatch(clearTokens());
            setError(error?.response?.data?.reasons[0]);
            setIsLoading(false);
            return;
        }
        if (res.status === 200) {
            const decode = jwtDecode(res.data.token);
            const userInfo = JSON.parse(decode.UserInfo || '{}');
            const clientRole = userInfo.Role;

            if (clientRole === "Admin" || clientRole === "Manager" || clientRole === "Student") {
                dispatch(setToken(res.data.token));
                dispatch(setRefreshToken(res.data.refreshToken));
                let resData;
                try {
                    resData = await axios.get(`${process.env.REACT_APP_PRO_API}/api/account`, {
                        headers: {
                            Authorization: `Bearer ${res.data.token}`
                        }
                    });
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
                    dispatch(setUser(resData.data));
                    setError(null);
                    navigate(clientRole === "Admin" ? '/dashboard' : '/');
                }
            } else {
                dispatch(clearTokens());
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
            res = await axios.post(`${process.env.REACT_APP_PRO_API}/api/google/signin/${googleToken}`);
            if (res.status === 200) {
                const { token, refreshToken } = res.data;
                dispatch(setToken(token));
                dispatch(setRefreshToken(refreshToken));

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
                        dispatch(setUser(resData.data));
                        setError(null);
                        navigate("/");
                    }
                } else {
                    dispatch(clearTokens());
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
        dispatch(clearTokens());
        setError(null);
    };

    const signup = async (userDetails) => {
        setIsLoading(true);
        let registerRes;
        try {
            registerRes = await axios.post(`${process.env.REACT_APP_PRO_API}/api/account/register`, {
                userName: userDetails.userName,
                password: userDetails.password,
                role: userDetails.role,
            });
            if (registerRes.status === 201) {
                navigate('/verify');
            }
        } catch (error) {
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
            verifyRes = await axios.post(`${process.env.REACT_APP_PRO_API}/api/account/verify`, {
                code: verificationData.code,
                email: verificationData.email,
            });
            if (verifyRes.status === 200) {
                const { token, refreshToken } = verifyRes.data;
                dispatch(setToken(token));
                dispatch(setRefreshToken(refreshToken));

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
                        dispatch(setUser(resData.data));
                        setError(null);
                        navigate("/");
                    }
                } else {
                    dispatch(clearTokens());
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
            if (error.response && error.response.status === 400) {
                setError({
                    title: "Bad Request",
                    message: error.response.data.message || "Dữ liệu yêu cầu không hợp lệ. Vui lòng kiểm tra lại."
                });
            } else {
                setError({
                    title: "Verification Error",
                    message: error.response?.data?.message || "Lỗi trong quá trình xác thực, hãy thử lại."
                });
            }
        } finally {
            setIsLoading(false);
        }
    };

    const resend = async (email) => {
        setIsLoading(true);
        let resendRes;
        try {
            resendRes = await axios.post(`${process.env.REACT_APP_PRO_API}/api/account/resend`, {
                email: email,
            });
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
            if (error.response && error.response.status === 400) {
                setError({
                    title: "Bad Request",
                    message: error.response.data.message || "Invalid request. Please check your data and try again.",
                });
            } else {
                setError({
                    title: "Resend Error",
                    message: error.response?.data?.message || "Error resending verification code, please try again.",
                });
            }
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