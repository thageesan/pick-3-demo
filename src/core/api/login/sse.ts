import PubSub, { EPubSubChannels } from 'core/pubsub';

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


    constructor(sessionId: string, pubSub: PubSub, options: ILoginOptions | null = null) {
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

        this.eventSource.addEventListener(EnumSSEEvent.SIGN_IN_SUCCESS, (e:any) => {
            console.log('I have received an event!', e);
            const message = JSON.parse(e.data);
            const { token } = message;
            pubSub.publish(EPubSubChannels.SUCCESSFUL_SIGN_IN, token)
        });

        this.eventSource.addEventListener(EnumSSEEvent.GAME_CREATED, () => {
            pubSub.publish(EPubSubChannels.GAME_CREATED, null);
        });

        this.eventSource.addEventListener(EnumSSEEvent.DREW_NUMBERS, (e:any) => {
            const data = JSON.parse(e.data);
            const { message } = data;
            const numbers = message.split(',');
            pubSub.publish(EPubSubChannels.DREW_NUMBERS, numbers);
        });

    }



}

enum EnumSSEEvent {
    'SIGN_IN_SUCCESS' = 'SIGN_IN_SUCCESS',
    'GAME_CREATED' = 'GAME_CREATED',
    'DREW_NUMBERS' = 'DREW_NUMBERS',
}
