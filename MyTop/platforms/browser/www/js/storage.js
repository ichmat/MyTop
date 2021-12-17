const LOCAL_STORAGE_KEY = "MyTopList";

listdata = getDataStorage();

function getDataStorage(){
    var data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if(data != null){
        return JSON.parse(data);
    }else{
        return {'myTop' : []}
    }
}

function saveToLocalStorage(){
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(listdata));
}

/** GET DATA */

function getTopList(key){
    for(var i = 0; i < listdata.myTop.length; ++i){
        if(listdata.myTop[i].key == key) return listdata.myTop[i];
    }
    return null;
}

function getTopListElement(keylist, keyelement){
    for(var i = 0; i < listdata.myTop.length; ++i){
        if(listdata.myTop[i].key == keylist) {
            if(listdata.myTop[i].elements.length > keyelement){
                return listdata.myTop[i].elements[keyelement];
            }
        };
    }
    return null;
}

function topListElementExist(keylist, keyelement){
    if(getTopListElement(keylist, keyelement) == null) return false;
    return true;
}

function getTopListIndex(key){
    for(var i = 0; i < listdata.myTop.length; ++i){
        if(listdata.myTop[i].key == key) return i;
    }
    return -1;
}

function topListExist(key){
    if(getTopList(key) == null) {return false;}
    return true;
}

/** CREATE/UPDATE DATA */

function setTopList(key, title, desc, author){
    var now = Date.now();
    if(topListExist(key)){
        var i = getTopListIndex(key);
        listdata.myTop[i].title = title;
        listdata.myTop[i].description = desc;
        listdata.myTop[i].author = author;
        listdata.myTop[i].dateUpdate = now;
    }else{
        var list = {'key' : listdata.myTop.length, 'title' : title, elements : [], 'description' : desc, 'author' : author, 'dateUpdate' : now};
        listdata.myTop.push(list);
    }
    saveToLocalStorage();
}

function setItemTopList(keyTopList, position, title, desc){
    var i = getTopListIndex(keyTopList);
    if(listdata.myTop[i].elements.length <= position){
        var elem = { 'title' : title, 'description' : desc };
        listdata.myTop[i].elements.push(elem);
    }else{
        listdata.myTop[i].elements[position].title = title;
        listdata.myTop[i].elements[position].description = desc;
    }
    saveToLocalStorage();
}

/** DELETE DATA */

function deleteTopList(key){
    listdata.myTop.splice(key,1);
    saveToLocalStorage();
}

function deleteElementTopList(keylist, keyelement){
    listdata.myTop[keylist].elements.splice(keyelement,1);
    saveToLocalStorage();
}