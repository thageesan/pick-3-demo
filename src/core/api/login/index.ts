import { request } from 'core/api/helpers';

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


    constructor(options: ILoginApiOptions | null = null) {
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

}
