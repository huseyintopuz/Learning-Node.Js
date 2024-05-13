import { EventEmitter } from "events";

const emitter = new EventEmitter();

function greetHandler(name) {
    console.log(`Hello ${name}`);
}

function byeHandler(name) {
    console.log(`Bye ${name}`);
}
// register event listeners
emitter.on("greet", greetHandler);
emitter.on("bye", byeHandler);
// emit events
emitter.emit("greet", "Huseyin");
emitter.emit("bye", "Huseyin");
// error handler
emitter.on("error", (err) => {
    console.log(err);
})
emitter.emit("error", "Error message");