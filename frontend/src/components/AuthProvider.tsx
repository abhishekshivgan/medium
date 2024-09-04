// components/AuthProvider.tsx
import { ReactNode, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { fetchUserData } from '../utils/auth';
import { authState } from '../store/atoms/authState';

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
    const  setAuth = useSetRecoilState(authState);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetchUserData(token).then(user => {
                if (user) {
                    setAuth({ isAuthenticated: true, user });
                } else {
                    setAuth({ isAuthenticated: false, user: null });
                }
            }).catch(() => {
                setAuth({ isAuthenticated: false, user: null });
            });
        } else {
            setAuth({ isAuthenticated: false, user: null });
        }
    }, [setAuth]);

    return <div>
        {children}
    </div>;
};

export default AuthProvider;
