import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const useAuth = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const checkAuth = () => {
            const storedToken = localStorage.getItem('token');
            if (storedToken) {
                const decodedToken = jwtDecode(storedToken);
                if (decodedToken.exp * 1000 < Date.now()) {
                    // 清除所有相关的本地存储数据
                    localStorage.removeItem('token');
                    localStorage.removeItem('avatar');
                    localStorage.removeItem('fullName');
                    localStorage.removeItem('email');
                    localStorage.removeItem('userType');
                    navigate('/login');
                }
            }
        };

        checkAuth();
    }, [navigate]);

    const isAuthenticated = !!localStorage.getItem('token');
    const avatar = localStorage.getItem('avatar');
    const username = localStorage.getItem('fullName');
    const email = localStorage.getItem('email');
    const userType = localStorage.getItem('useType');
    return { isAuthenticated, avatar, username, email, userType };
};

export default useAuth;
