import React from 'react';
import { useAuth } from 'providers/auth';
import UnauthenticatedApp from 'components/app/unauthenticated';
import AuthenticatedApp from 'components/app/authenticted';

export default function App() {
    const { authenticated } = useAuth();
    return (
        authenticated ? <AuthenticatedApp /> : <UnauthenticatedApp />
    )
}
