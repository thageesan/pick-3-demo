export default class PubSub {

    private topics = new Map<string, Set<Function>>();

    has(topic: string) {
        return this.topics.has(topic)
    }

    get(topic: string) {
        return this.topics.get(topic) || new Set()
    }


    publish(topic: string, message: any) {
        if (!this.has(topic)) {
            throw new TypeError(`[EventBus]: There is no topic named ${topic}`)
        }

        this.get(topic).forEach(sub => sub(message))
    }


    subscribe(topic: string, subscriber: Function): Set<Function> {
        if (!this.has(topic)) {
            const topicSet: Set<Function> = new Set([subscriber]);
            this.topics.set(topic, topicSet);
            return topicSet
        }
        return this.get(topic).add(subscriber)
    }

    unsubscribe(topic: string, subscriber?: Function): void {
        if (!this.has(topic)) {
            throw new TypeError(`[EventBus]: There is no topic named ${topic}`)
        }

        if (subscriber !== undefined && subscriber !== null) {
            // remove single subscriber
            this.get(topic).delete(subscriber)
        } else {
            // remove entire topic
            this.topics.delete(topic)
        }
    }

}

export enum EPubSubChannels {
    GAME_CREATED = 'GAME_CREATED',
    SUCCESSFUL_SIGN_IN = 'SUCCESSFUL_SIGN_IN',
}
