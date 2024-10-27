import { useState } from 'react';

export const useAuth = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Hàm đăng nhập
    const login = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            // Thực hiện logic đăng nhập, ví dụ: gọi API hoặc Firebase
            // await auth.signInWithEmailAndPassword(email, password);
            console.log("Logged in successfully!");
        } catch (err) {
            setError((err as any).message || 'Login error');
        } finally {
            setLoading(false);
        }
    };

    // Hàm đăng ký
    const register = async (email: string, password: string) => {
        setLoading(true);
        setError(null);
        try {
            // Thực hiện logic đăng ký, ví dụ: gọi API hoặc Firebase
            // await auth.createUserWithEmailAndPassword(email, password);
            console.log("Registered successfully!");
        } catch (err) {
            setError((err as any).message || 'Registration error');
        } finally {
            setLoading(false);
        }
    };

    return {
        login,
        register,
        loading,
        error,
    };
};
