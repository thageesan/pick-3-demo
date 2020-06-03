

export interface IAuthState {
    amount: null
    error: string | null
    expiration: string | null
    nanoAddress: string | null
    sessionId: string | null
    toAddress: string | null
    authenticated: null
}

export interface IAuthAction {
    type: EAuthAction,
    item: any
}

export enum EAuthAction {
    AUTHENTICATED = 0,
    INVALID_NANO_ADDRESS = 1,
    NO_NANO_ADDRESS = 2,
    REGISTRATION = 3,
    UNAUTHENTICATED = 4,
}

const defaultState: IAuthState = {
    amount: null,
    error: null,
    expiration: null,
    nanoAddress: null,
    sessionId: null,
    toAddress: null,
    authenticated: null,
};

export default function reducer(state: IAuthState, action: IAuthAction) {

    switch (action.type) {
        case EAuthAction.AUTHENTICATED:
            return {
                ...state,
                authenticated: action.item.authenticated
            };
        case EAuthAction.NO_NANO_ADDRESS:
            return {
                ...state
                , error: 'Please enter a nano address.'
            };
        case EAuthAction.REGISTRATION:
            return {
                ...state,
                error: null,
                toAddress: action.item.toAddress,
                amount: action.item.amount,
                expiration: action.item.expiration,
                sessionId: action.item.sessionId,
            };
        case EAuthAction.INVALID_NANO_ADDRESS:
            return {
                ...state,
                error: 'You have entered an invalid Nano address.'
            };
        case EAuthAction.UNAUTHENTICATED:
            return {
                ...state,
                authenticated: action.item.authenticated
            };
        default:
            throw new Error('did not match any auth action types')
    }
}

export {
    defaultState
}
