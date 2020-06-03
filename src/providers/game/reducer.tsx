export interface IGameState {
    amount: null | string
    error: boolean
    errorMessage: null | string
    game: null
    gameAddress: null | string
    gameFound: boolean
    gameId: null | string
    numberOne: null | number
    numberTwo: null | number
    numberThree: null | number
    ticketId: null | string
    winningNumOne: null | number
    winningNumTwo: null | number
    winningNumThree: null | number
}

export interface IGameAction {
    type: EGameAction
    item: any

}

const defaultState: IGameState = {
    amount: null,
    error: false,
    errorMessage: null,
    game: null,
    gameAddress: null,
    gameFound: false,
    gameId: null,
    numberOne: null,
    numberTwo: null,
    numberThree: null,
    ticketId: null,
    winningNumOne: null,
    winningNumTwo: null,
    winningNumThree: null,
};

export enum EGameAction {
    WINNING_NUMBERS = 'WINNING_NUMBERS',
    ACTIVE_GAME_FOUND = 'ACTIVE_GAME_FOUND',
    NO_ACTIVE_GAME_FOUND = 'NO_ACTIVE_GAME_FOUND',
    NOT_A_NUMBER = 'NOT_A_NUMBER',
    REMOVE_ERROR_FLAG = 'REMOVE_ERROR_FLAG',
    NUMBER_NOT_IN_RANGE = 'NUMBER_NOT_IN_RANGE',
    RECEIVED_GAME_PROVISION_INFO = 'RECEIVED_GAME_PROVISION_INFO'
}

export default function reducer(state: IGameState, action: IGameAction) {

    switch (action.type) {
        case EGameAction.ACTIVE_GAME_FOUND:
            return {
                ...state,
                gameFound: action.item.gameFound,
                gameId: action.item.gameId,
                ticketId: action.item.ticketId,
                numberOne: action.item.numberOne,
                numberTwo: action.item.numberTwo,
                numberThree: action.item.numberThree,
                winningNumOne: action.item.winningNumOne,
                winningNumTwo: action.item.winningNumTwo,
                winningNumThree: action.item.winningNumThree,
            };
        case EGameAction.NO_ACTIVE_GAME_FOUND:
            return {
                ...state,
                gameFound: action.item.gameFound
            };
        case EGameAction.NOT_A_NUMBER:
            return {
                ...state,
                error: true,
                errorMessage: 'Please pick numbers between 0 & 9.'
            };
        case EGameAction.NUMBER_NOT_IN_RANGE:
            return {
                ...state,
                error: true,
                errorMessage: 'Please pick numbers between 0 & 9.'
            };
        case EGameAction.RECEIVED_GAME_PROVISION_INFO:
            return {
                ...state,
                gameAddress: action.item.address,
                amount: action.item.amount,
            };
        case EGameAction.REMOVE_ERROR_FLAG:
            return {
                ...state,
                error: false,
            };
        case EGameAction.WINNING_NUMBERS:
            return {
                ...state,
                winningNumOne: action.item.winningNumOne,
                winningNumTwo: action.item.winningNumTwo,
                winningNumThree: action.item.winningNumThree,
            };
        default:
            throw new Error('did not match any auth action types')
    }

}

export {
    defaultState
}
