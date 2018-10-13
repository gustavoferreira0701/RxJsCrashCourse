import { Observable, from } from "rxjs";
import { share } from 'rxjs/operators';


var observableItem = Observable.create(
    /**
     * This inner function is also named 'Producer', because it is the emitter of the values/events
     */
    (observer: any) => {
        try {
            observer.next('Hey Guys!');
            observer.next('How are you?')

            setInterval(function name() {
                observer.next("I'm really good!")
            }, 2000);

            // observer.complete()
            // observer.next('This will not send')
        } catch (error) {
            observer.error(error)
        }
    }).pipe(
        share()
    )
    ;

//Due to changes, on the version 6 of rxjs the subscribe function returns a disposable object, so with this object you can 'unsubscribe'

/*
 * The producer function is activated when a observer subscribes to an observable item (like showed below)
 * While no one subscribes, nothing happens
 *  
 */

//This is also an example of a cold observable
var observer = observableItem.subscribe(
    (x: any) => addItem(x),
    (error: any) => addItem(error),
    () => addItem('Completed')
);


setTimeout(() => {
    var second = observableItem.subscribe(
        (x: any) => addItem('Subscriber 2 ' + x)
    );
}, 1000);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}