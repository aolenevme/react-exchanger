import store from "../../store/store.js";

const storeEventsRegistry = {};

function dispatch(id, payload) {
    if (!id) {
        console.error("Enable to dispatch a store event without its id");

        return;
    }

    if (!storeEventsRegistry[id]) {
        console.error(
            `There isn\`t a registered handler for this store event id: ${id}`
        );

        return;
    }

    updateIn(store, storeEventsRegistry[id](store, payload));
}

function updateIn(currentStore, payload) {
    const [path, value] = payload;

    path.reduce((acc, key, index) => {
        if (index === path.length - 1) {
            acc[key] = value;
        } else {
            return acc[key];
        }
    }, currentStore);
}

function regEventStore(id, storeEvent) {
    if (!id) {
        console.error("Unable to register the event without its id");
    }

    if (!storeEvent) {
        console.error("Unable to register the store event without its handler");
    }

    if (storeEventsRegistry[id]) {
        console.error(
            `Unable to register the store event because it is already 
            registered: ${storeEventsRegistry[id]}`
        );
    }

    storeEventsRegistry[id] = storeEvent;
}

export {dispatch, regEventStore};
