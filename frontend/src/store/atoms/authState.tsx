import { atom } from "recoil";

interface User {
    id: number;
    name: string;
    username: string;
    password: string;
}

interface AuthState {
    isAuthenticated: boolean;
    user: User | null
}

export const authState = atom<AuthState>({
    key: "authState",
    default: {
        isAuthenticated: false,
        user: null
    }
})