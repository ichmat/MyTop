
selectedlistindex = -1;

selectedelementlistindex = -1;

indexlistedit = -1;

resetActualView();

function resetActualView(){
    if(selectedlistindex == -1){
        resetViewTopList();
    }else{
        resetViewElementList();
    }
}

function resetViewTopList(){
    clearTopList();
    for(var i = 0; i < listdata.myTop.length; ++i){
        createTopListItemView(i, 
            listdata.myTop[i].title,
            listdata.myTop[i].description,
            listdata.myTop[i].dateUpdate,
            listdata.myTop[i].author,
            ''
            );
    }
}

function resetViewElementList(){
    clearElementList();
    var l_elements = listdata.myTop[selectedlistindex].elements;
    for(var i = 0; i < l_elements.length; ++i){
        createElementListItemView(
            i,
            l_elements[i].title,
            l_elements[i].description
        )
    }
}