import { createContext, useContext, useState } from 'react';

const AuthContext = createContext({
    isAuthenticated: false,
    user: null,
    getAccessToken: () => { },
    saveUser: (userData) => { },
    getRefreshToken: () => { },
    logout: () => { }

});

export function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(true);
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState("");

    function getAccessToken() {
        return accessToken;
    }

    function getRefreshToken() {
        const token = localStorage.getItem("Token");
        if (token) {
            const { refreshToken } = JSON.parse(token);
            return refreshToken;
        }
    }

    function saveUser(userData) {
        setAccessToken(userData.body.accessToken);
        setUser(userData.body.user);  // Guardamos el usuario completo, que incluye el rol
        localStorage.setItem("Token", JSON.stringify(userData.body.refreshToken));
        setIsAuthenticated(true);
    }
    function logout() {
        setIsAuthenticated(false);
        setAccessToken("");
        setUser(null);
        localStorage.removeItem("Token");
    }
    return (
        <AuthContext.Provider
            value={{ isAuthenticated, user, getAccessToken, saveUser, getRefreshToken, logout }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);
