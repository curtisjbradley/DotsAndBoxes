import { Outlet, useNavigate } from 'react-router';
import { UserContext } from '../context/UserContext.tsx';
import { useContext, useEffect } from 'react';

import { FrontEndRoutes } from 'dots_and_boxes_backend/src/shared/ValidRoutes.ts';

export function ProtectedRoute() {
    const userData = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        if (!userData.userData) {
            navigate(FrontEndRoutes.LOGIN);
            return;
        }
    }, [userData.userData]);

    return <Outlet />;
}
