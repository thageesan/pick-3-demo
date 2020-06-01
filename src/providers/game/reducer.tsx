interface IGameState {
    amount: null | string
    game: null
    gameAddress: null | string
    gameFound: boolean
    gameId: null | string
    ticketId: null | string
}

interface IGameAction {
    type: EGameAction
    items: any

}

const defaultState: IGameState = {
    amount: null,
    game: null,
    gameAddress: null,
    gameFound: false,
    gameId: null,
    ticketId: null,
};

export enum EGameAction {
    ACTIVE_GAME_FOUND = 'ACTIVE_GAME_FOUND',
    NO_ACTIVE_GAME_FOUND = 'NO_ACTIVE_GAME_FOUND',
    RECEIVED_GAME_PROVISION_INFO = 'RECEIVED_GAME_PROVISION_INFO'
}

export default function reducer(state: IGameState, action: IGameAction) {

    switch (action.type) {
        case EGameAction.ACTIVE_GAME_FOUND:
            return {
                ...state,
                gameFound: action.items.gameFound,
                gameId: action.items.gameId,
                ticketId: action.items.ticketId,
            };
        case EGameAction.NO_ACTIVE_GAME_FOUND:
            return {
                ...state,
                gameFound: action.items.gameFound
            };
        case EGameAction.RECEIVED_GAME_PROVISION_INFO:
            return {
                ...state,
                gameAddress: action.items.address,
                amount: action.items.amount,
            };
        default:
            throw new Error('did not match any auth action types')
    }

}

export {
    defaultState
}
