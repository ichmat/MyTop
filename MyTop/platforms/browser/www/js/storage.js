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
    localStorage.setItem(LOCAL_STORAGE_KEY, listdata);
}

/** GET DATA */

function getTopList(key){
    for(var i = 0; i < listdata.myTop.length; ++i){
        if(listdata.myTop[i].key == key) return listdata.myTop[i];
    }
    return null;
}

function getTopListIndex(key){
    for(var i = 0; i < listdata.myTop.length; ++i){
        if(listdata.myTop[i].key == key) return i;
    }
    return -1;
}

function topListExist(key){
    if(getTopList(key) == null) return false;
    return true;
}

/** CREATE DATA */

function setTopList(key, title, desc, author){
    var now = Date.now();
    if(topListExist(key)){
        var i = getTopListIndex(key);
        listdata.myTop[i].title = title;
        listdata.myTop[i].desc = desc;
        listdata.myTop[i].author = author;
        listdata.myTop[i].dateUpdate = now;
    }else{
        var list = {'key' : key, 'title' : title, elements : [], 'description' : desc, 'author' : author, 'dateUpdate' : now};
        listdata.myTop.push(list);
    }
    saveToLocalStorage();
}

function setItemTopList(keyTopList, title, desc){
    var i = getTopListIndex(keyTopList);

    saveToLocalStorage();
}