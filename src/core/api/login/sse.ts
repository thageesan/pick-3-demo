
interface ILoginOptions {
    baseUrl?: string | null
    apiEndpoint?: string | null
    port?: string | null
}

export default class LoginSSE {

    private readonly baseUrl: string = process.env.LOGIN_URL as string;
    private readonly apiEndpoint: string = '/api/v1/stream';
    private readonly port: string = process.env.LOGIN_PORT as string;
    private readonly url: string = `${this.baseUrl}:${this.port}${this.apiEndpoint}`;
    private readonly eventSource: EventSource;


    constructor(sessionId: string, options: ILoginOptions | null = null) {
        if (options && options.baseUrl) {
            this.baseUrl = options.baseUrl;
        }

        if (options && options.apiEndpoint) {
            this.apiEndpoint = options.apiEndpoint;
        }

        if (options && options.port) {
            this.port = options.port;
        }

        this.eventSource = new EventSource(`${this.url}?channel=${sessionId}`, {withCredentials: true});

        this.eventSource.addEventListener(EnumSSEEvent.SIGN_IN_SUCCESS, (e) => {
            console.log('I have received an event!', e);
        });

    }



}

enum EnumSSEEvent {
    'SIGN_IN_SUCCESS' = 'SIGN_IN_SUCCESS'
}
