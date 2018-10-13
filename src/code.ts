import { Observable, observable } from "rxjs";


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
    });

//Due to changes, on the version 6 of rxjs the subscribe function returns a disposable object, so with this object you can 'unsubscribe'
/**
 * The producer function is activated when a observer subscribes to an observable item (like showed below)
 * While no one subscribes, nothing happens
 *  */
var observer = observableItem.subscribe(
    (x: any) => addItem('first => ' + x),
    (error: any) => addItem(error),
    () => addItem('Completed')
);

var second_observer = observableItem.subscribe(
    (x: any) => addItem('second => ' + x)
)

//tying the second subscriber to the first one (child subscriber, when the first stops the child will also stops)
observer.add(second_observer)

setTimeout(() => {
    addItem("Unsubscribing!");
    observer.unsubscribe();
}, 6001);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}