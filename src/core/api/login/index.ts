import { request } from 'core/api/helpers';
import LoginSSE from 'core/api/login/sse';
import PubSub from 'core/pubsub';

interface ILoginApiOptions {
    baseUrl?: string | null
    apiEndpoint?: string | null
    port?: string | null
}

export default class LoginAPI {

    private readonly baseUrl: string = process.env.LOGIN_URL as string;
    private readonly apiEndpoint: string = '/api/v1';
    private readonly port: string = process.env.LOGIN_PORT as string;
    private readonly headers: Record<string, string>;
    private readonly url: string = `${this.baseUrl}:${this.port}${this.apiEndpoint}`;
    private sse: LoginSSE | null = null;
    private readonly pubSub: PubSub;


    constructor(pubSub: PubSub, options: ILoginApiOptions | null = null) {
        this.pubSub = pubSub;

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

    async register(nanoAddress: string): Promise<object> {
        try {
            return await request(
                `${this.url}/provision`,
                'POST',
                {
                    nano_address: nanoAddress
                },
                this.headers
            )
        } catch (e) {
            throw e;
        }
    }

    async login(token: string): Promise<object> {
        try {
            return await request(
                `${this.url}/login`,
                'POST',
                {
                    token: token
                },
                this.headers
            )
        } catch (e) {
            throw e;
        }
    }

    async logout(): Promise<object> {
        try {
            return await request(
                `${this.url}/logout`,
                'GET',
                this.headers
            )
        } catch (e) {
            throw e;
        }
    }

    async authenticated(): Promise<object> {
        try {
            return await request(
                `${this.url}/authenticated`,
                'GET',
                this.headers
            )
        } catch (e) {
            throw e;
        }
    }

    connectToStream(session_id: string) {
        if (this.sse === null) {
            this.sse = new LoginSSE(session_id, this.pubSub);
        }
    }

}
