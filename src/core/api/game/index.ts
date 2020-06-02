import { request } from 'core/api/helpers';

interface IGameApiOptions {
    baseUrl?: string | null
    apiEndpoint?: string | null
    port?: string | null
}

export default class GameApi {

    private readonly baseUrl: string = process.env.LOGIN_URL as string;
    private readonly apiEndpoint: string = '/api/v1';
    private readonly port: string = process.env.LOGIN_PORT as string;
    private readonly headers: Record<string, string>;
    private readonly url: string = `${this.baseUrl}:${this.port}${this.apiEndpoint}`;


    constructor(options: IGameApiOptions | null = null) {

        if (options && options.baseUrl) {
            this.baseUrl = options.baseUrl;
        }

        if (options && options.apiEndpoint) {
            this.apiEndpoint = options.apiEndpoint;
        }

        if (options && options.port) {
            this.port = options.port;
        }

        this.headers = {
            'content-type': 'application/json'
        }

    }

    async activeGame(): Promise<object> {
        try {
            return await request(
                `${this.url}/game/active`,
                'GET',
                this.headers
            )
        } catch (e) {
            throw e;
        }
    }

    async draw(gameId: string, ticketId: string): Promise<object> {
        try {
            return await request(
                `${this.url}/game/draw`,
                'POST',
                {
                    ticketId: ticketId,
                    gameId: gameId,
                },
                this.headers
            )
        } catch (e) {
            throw e;
        }
    }

    async pickNumbers(numbers: Array<number>, ticketId: string): Promise<object> {
        try {
            return await request(
                `${this.url}/game/pick`,
                'POST',
                {
                    numbers: numbers,
                    ticketId: ticketId,
                },
                this.headers
            )
        } catch (e) {
            throw e;
        }
    }

    async provisionGame(): Promise<object> {
        try {
            return await request(
                `${this.url}/game/provision`,
                'GET',
                this.headers
            )
        } catch (e) {
            throw e;
        }
    }

}
