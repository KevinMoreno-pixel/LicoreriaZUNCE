import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../Auth/AuthProvider";

export default function ProtectedRoute({ requiredRole }) {
    const { isAuthenticated, user } = useAuth();


    if (!isAuthenticated) {
        console.log("No está autenticado, redirigiendo a login");
        return <Navigate to="/" replace />;
    }

    // if (requiredRole !== undefined) {
    //     console.log("Rol requerido:", requiredRole, "Rol usuario:", user?.rol);
    //     if (user?.rol !== requiredRole) {
    //         console.log("Rol no autorizado, redirigiendo a /unauthorized");
    //         return <Navigate to="/unauthorized" replace />;
    //     }
    // }

    return <Outlet />;
}


