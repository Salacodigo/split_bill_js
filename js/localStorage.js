function saveLocalStorage( itemName, object ){
    let objectToSave = JSON.stringify(object);
    try {
        localStorage.setItem(itemName, objectToSave );
    } catch (error) {
        console.log(error);
    }
}

export {
    saveLocalStorage
}