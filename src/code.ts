import { Observable, from, fromEvent } from "rxjs";
import { share } from 'rxjs/operators';

var observable = fromEvent(document, 'mousemove');

setTimeout(() => {
    var subscription = observable.subscribe(
        (x: any) => addItem(x)
    )
}, 2000);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}