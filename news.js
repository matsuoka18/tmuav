function article_insert(){
    var url = "";
    fetch(url,{
        "method":"GET",
        "mode":"cors"
    })
    .then(resjson =>{
        if(resjson.ok){
            return json()
        }
    })
    .then(json =>{
        console.log(json);
        var article_titile = "";
        var article_date = "";
        var upload_date = "";
        var article_body = "";
        var article_photos = "";    
    })
    .catch(err =>{
        console.log(err);
    })
}