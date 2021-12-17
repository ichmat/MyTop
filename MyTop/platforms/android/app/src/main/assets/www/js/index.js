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

    
}

function createTopListItem(key, title, desc, date, author, img){
    var html = '<div class="toplistitem" onclick="openTopList(\''+key+'\')">'+
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
   '</div>';
    document.getElementById('divtoplist').innerHTML += html;
}

function openTopList(key){
    document.getElementById('divtoplist').style.display = 'none';
    document.getElementById('divelementlist').style.display = 'flex';
}

function goToMenu(){
    document.getElementById('divtoplist').style.display = 'flex';
    document.getElementById('divelementlist').style.display = 'none';
}