/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    document.addEventListener("offline", onOffline, false);
    document.addEventListener("online", onOnline, false);
}

function onOffline() {
    document.getElementsByClassName("offlineDialogBD")[0].style.display = "block";
}

function onOnline() {
    document.getElementsByClassName("offlineDialogBD")[0].style.display = "none";
}

document.getElementsByClassName("button-add")[0].addEventListener("click", addItem);
document.getElementsByClassName("createButton")[0].addEventListener("click", createItem);
document.getElementsByClassName("cancelButton")[0].addEventListener("click", hideform);

function createElementListItemView(key, title, desc){
    var html = '<div class="elementlistitem" onclick="openform('+selectedlistindex+','+key+')">' +
    '<div class="elmTitre">' +
        '<p class="rank">#'+ (++key) +'</p>' +
        '<p>'+title+'</p>' +
    '</div>' +
    '<div class="elmDesc">' +
        '<p>'+desc+'</p>' +
    '</div>' +
    '<div class="elmButtons">'+
        '<input type="button" value="🗑" onclick="deleteItem('+selectedlistindex+',' + (--key) + ')" />' + 
    '</div>' +
    '</div>';
    document.getElementById('divelementlist').innerHTML += html;
}

function createTopListItemView(key, title, desc, date, author, img){
    var html = '<div class="toplistitem" onclick="openTopList('+key+')">'+
    '<div class="tliImg">'+ 
    '<img src="'+img+'" />' +        
    '</div>'+
    '<div class="tliTitre">'+
        '<p>'+title+'</p>'+
    '</div>'+
    '<div class="tliDesc">'+
        '<p>'+desc+'</p>'+
    '</div>'+
    '<div class="tliBottom">'+
        '<p>'+date+'</p>'+
        '<p>'+author+'</p>'+
   '</div>' +
   '<div class="tliButtons">'+
        '<input type="button" value="✎" onclick="openform(' + key +')"/>'+
        '<input type="button" value="🗑" onclick="deleteItem(' + key + ')" />' + 
    '</div>' +
   '</div>';
    document.getElementById('divtoplist').innerHTML += html;
}

function clearTopList(){
    document.getElementById('divtoplist').innerHTML = '';
}

function clearElementList(){
    document.getElementById('divelementlist').innerHTML = '';
}

itemdelete = false;

function openTopList(key){
    if( document.getElementById('divformcreate').style.display == 'block') return;
    if(itemdelete){
        itemdelete = false;
        return;
    }
    document.getElementById('divtoplist').style.display = 'none';
    document.getElementById('divelementlist').style.display = 'flex';
    document.getElementsByClassName('button-go-back')[0].style.display = 'block';
    selectedlistindex = key;
    document.getElementById('titletoplist').innerText = "my top list : " + getTopList(key).title;
    resetActualView();
}

function goToMenu(){
    document.getElementById('divtoplist').style.display = 'flex';
    document.getElementById('divelementlist').style.display = 'none';
    document.getElementsByClassName('button-go-back')[0].style.display = 'none';
    selectedlistindex = -1;
    selectedelementlistindex = -1;
    document.getElementById('titletoplist').innerText = "my top list";
    resetActualView();
}

function addItem(){
    var iElement = -1;
    if(topListExist(selectedlistindex)){
        iElement = listdata.myTop[selectedlistindex].elements.length;
    }
    openform(selectedlistindex,iElement);
}

function deleteItem(keylist, keyelement){
    if(keyelement == null || keyelement == -1){
        deleteTopList(keylist);
    }else{
        deleteElementTopList(keylist, keyelement);
    }
    itemdelete = true;
    resetActualView();
}

function openform(iList,iElement){
    if(itemdelete){
        itemdelete = false;
        return;
    }
    document.getElementById('divformcreate').style.display = 'block';
    if(iElement == -1 || iElement == null){
        openform_createList(iList);
    }else{
        selectedelementlistindex = iElement;
        openform_createElement(iList,iElement);
    }
}

function openform_createList(iList){
    document.getElementById('CF_Auth').style.display = 'block';
    indexlistedit = iList;
    if(topListExist(iList)){
        document.getElementById('titleform').innerText = 'Modifier une liste';
        document.getElementsByClassName("createButton")[0].value = "Modifier";
        document.getElementById('CF_Title').value = listdata.myTop[iList].title;
        document.getElementById('CF_Desc').value = listdata.myTop[iList].description;
        document.getElementById('CF_Auth').value = listdata.myTop[iList].author;
    }else{
        document.getElementById('titleform').innerText = 'Créer une liste';
        document.getElementsByClassName("createButton")[0].value = "Créer";
        document.getElementById('CF_Title').value = '';
        document.getElementById('CF_Desc').value = '';
        document.getElementById('CF_Auth').value = '';
    }
}

function openform_createElement(iList,iElement){
    document.getElementById('CF_Auth').style.display = 'none';
    if(topListElementExist(iList, iElement)){
        document.getElementById('titleform').innerText = 'Modifier un élément';
        document.getElementsByClassName("createButton")[0].value = "Modifier";
        var elms = listdata.myTop[iList].elements[iElement];
        document.getElementById('CF_Title').value = elms.title;
        document.getElementById('CF_Desc').value = elms.description;
    }
    else{
        document.getElementById('titleform').innerText = 'Créer un élément';
        document.getElementsByClassName("createButton")[0].value = "Créer";
        document.getElementById('CF_Title').value = '';
        document.getElementById('CF_Desc').value = '';
    }
}

function createItem(){
    if(selectedelementlistindex == -1 || selectedelementlistindex == null){
        // SET TOP LIST
        setTopList(indexlistedit,
            document.getElementById('CF_Title').value,
            document.getElementById('CF_Desc').value,
            document.getElementById('CF_Auth').value 
            );
    }else{
        // SET ELEMENT
        setItemTopList(selectedlistindex,
            selectedelementlistindex,
            document.getElementById('CF_Title').value,
            document.getElementById('CF_Desc').value
        );
    }

    hideform();
    resetActualView();
}

function hideform(){
    document.getElementById('divformcreate').style.display = 'none';
}