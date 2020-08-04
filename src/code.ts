import { Observable, observable } from 'rxjs';


var observableItem = Observable.create((observer: any) => {
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
var subscription = observableItem.subscribe(
    (x: any) => addItem(x),
    (error: any) => addItem(error),
    () => addItem('Completed')
);

setTimeout(() => {
    addItem("Unsubscribing!");
    subscription.unsubscribe();
}, 6001);

function addItem(val: any) {
    var node = document.createElement("li");
    var textnode = document.createTextNode(val);
    node.appendChild(textnode);
    document.getElementById("output").appendChild(node);
}