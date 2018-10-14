import {
    Observable,
    from,
    fromEvent,
    Subject,
    BehaviorSubject,
    ReplaySubject
} from "rxjs";

import { share } from 'rxjs/operators';

const numberOfDispacthedValues = 30;

const windowTime = 200;

/**
 * The second argument passed to this constructor means about how much time passed in the past 
 * the values will capturated. Therefore, if the window time is 200ms and amount of dispatched
 * values is 30 means that will be send the last 30 values emmited on the last 200ms before now
 */
var subject = new ReplaySubject(numberOfDispacthedValues, windowTime);

subject.subscribe(
    data => addItem('Observer 1: ' + data),
    err => addItem(err),
    () => addItem('Observer 1 completed!')
)

let i = 1;
let interval = setInterval(()=>{
    subject.next(i++)
}, 100)

setTimeout(() => {
    var observer2 = subject.subscribe(
        data => addItem('Observer 2: ' + data)
    )    
}, 500);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}