import {
    Observable,
    from,
    fromEvent,
    Subject,
    BehaviorSubject,
    ReplaySubject,
    AsyncSubject
} from "rxjs";

import { share } from 'rxjs/operators';

const numberOfDispacthedValues = 30;

const windowTime = 200;

//Async Subject emmits just the last value of the stream
var subject = new AsyncSubject();

subject.subscribe(
    data => addItem('Observer 1: ' + data)
)

let i = 1;
let interval = setInterval(()=>{
    subject.next(i++)
}, 100)

setTimeout(() => {
    var observer2 = subject.subscribe(
        data => addItem('Observer 2: ' + data)
    );
    subject.complete();
}, 500);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}