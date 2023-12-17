import { useState, useEffect } from 'react';

export const useAuthToken = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('quiz_token'));

    useEffect(() => {
        const token = localStorage.getItem('quiz_token');
        setIsLoggedIn(!!token);
    }, []);

    useEffect(() => {
        const handleTokenChange = () => {
            const token = localStorage.getItem('quiz_token');
            setIsLoggedIn(!!token);
        };

        window.addEventListener('storage', handleTokenChange);

        return () => {
            window.removeEventListener('storage', handleTokenChange);
        };
    }, []);

    return isLoggedIn;
};
