import { makeAutoObservable } from "mobx";

export default class CounterStore {
    title = "Counter";
    count = 41;
    events: string[] = [
        `Initial value of count is ${this.count}`
    ]

    constructor() {
        makeAutoObservable(this);
    }

    increment = (amount = 1) => {
        this.count += amount;
        this.events.push(`Counter incremented by ${amount}, current count value is ${this.count}`);
    }

    decrement = (amount = 1) => {
        this.count -= amount;
        this.events.push(`Counter decremented by ${amount}, current count value is ${this.count}`);
    }

    get eventsCount() {
        return this.events.length;
    }
}