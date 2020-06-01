import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import { utils, LoginAPI, PubSub, EPubSubChannels } from 'core';

import reducer, { defaultState, EAuthAction, IAuthAction } from 'providers/auth/reducer';

interface IAuthProviderProps {
    loginApi: LoginAPI
    pubSub: PubSub,
    children: any
}

const AuthContext = React.createContext({
    pubSub: new PubSub(),
    authenticated: false,
    amount: '',
    error: '',
    expiration: '',
    logout: async () => {
        return;
    },
    toAddress: '',
    register: async (_nanoAddress: string | null) => {
        return;
    }
});

AuthContext.displayName = 'AuthContext';

function AuthProvider(props: IAuthProviderProps) {

    const history = useHistory();

    async function init() {
        await authenticate();
    }

    // @ts-ignore
    const [state, dispatch] = useReducer(reducer, defaultState, init);

    useEffect(() => {
        props.pubSub.subscribe(EPubSubChannels.SUCCESSFUL_SIGN_IN, async (token: string) => {
            const response = await props.loginApi.login(token);
            if (response && response.hasOwnProperty('result')) {
                const data = response as {result: string};
                const { result } = data;
                if (result === 'success') {
                    await authenticate();
                }
            }
        });
    }, []);

     async function authenticate(): Promise<void> {
        const response = await props.loginApi.authenticated();
        if (response && response.hasOwnProperty('authenticated')) {
            const data = response as { authenticated: string, session_id: string };
            const sessionId = data.session_id;
            props.loginApi.connectToStream(sessionId);

            // @ts-ignore
            dispatch({
                type: EAuthAction.AUTHENTICATED,
                item: {
                    authenticated: data.authenticated
                }
            });
        }
    }

    const logout = async function(): Promise<void> {
         const response = await props.loginApi.logout();
         if (response && response.hasOwnProperty('status')) {
             const data = response as {status: string, message: string};
             const {status} = data;
             if (status === 'success') {
                 // @ts-ignore
                 dispatch({
                     type: EAuthAction.UNAUTHENTICATED,
                     item: {
                         authenticated: false
                     }
                 })
             }
         }
    };

    const register = async function(nanoAddress: string | null): Promise<void> {

        if (nanoAddress === null) {
            // @ts-ignore
            dispatch({
                type: EAuthAction.NO_NANO_ADDRESS,
                item: null
            } as IAuthAction);
            return;
        }

        if (utils.validateNanoAddress(nanoAddress)) {

            const response = await props.loginApi.register(nanoAddress) as {[key:string]: string};
            const toAddress: string = response['address'];
            const amount: string = response['amount'];
            const expiration = response['timestamp'];
            const sessionId = response['session_id'];
            // @ts-ignore
            dispatch({
                type: EAuthAction.REGISTRATION,
                item: {
                    toAddress,
                    amount,
                    expiration,
                    sessionId,
                }
            });

            props.loginApi.connectToStream(sessionId);

            history.push('/login');
        } else {
            // @ts-ignore
            dispatch({
                type: EAuthAction.INVALID_NANO_ADDRESS,
                item: null
            })
        }

    };

    const {
        amount,
        authenticated,
        error,
        expiration,
        nanoAddress,
        sessionId,
        toAddress,
    } = state;

    const {
        pubSub
    } = props;

    const value = {
        amount,
        authenticated,
        error,
        expiration,
        logout,
        nanoAddress,
        pubSub,
        register,
        sessionId,
        toAddress,
    };

    return (
        <AuthContext.Provider value={value}>
            {props.children}
        </AuthContext.Provider>
    )
}


function useAuth() {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error(`useAuth must be used within a AuthProvider`)
    }
    return context;
}

export {
    AuthProvider,
    useAuth,
}
