var article_title = "";
var article_date_from = "";
var article_date_to = "";
var article_date = "";
var article_date_post = "";
var text = "";
var order = [];
var photo_order = [];
var send_data = []
var text_count = 0;
var photo_count = 0; 
document.getElementById("art_ti_in").addEventListener('change',(text)=>{
    article_title = document.getElementById("art_ti_in").value;
    document.getElementById("post-title").innerHTML = article_title;
})

document.getElementById("art_date_from").addEventListener('change',(text)=>{
    article_date_from = document.getElementById("art_date_from").value;
    article_date_from = article_date_from.substring(5,);
    //article_date_from = article_date_from.replace("-","/");
    article_date = article_date_from+"-"+article_date_to;
    document.getElementById("post-date").innerHTML = article_date;
})

document.getElementById("art_date_to").addEventListener('change',(text)=>{
    article_date_to = document.getElementById("art_date_to").value;
    article_date_to = article_date_to.substring(5,);
    //article_date_to = article_date_to.replace("-","/");
    article_date = article_date_from+"-"+article_date_to;
    document.getElementById("post-date").innerHTML = article_date;
})

document.getElementById("art_date_post").addEventListener("change",()=>{
    article_date_post = document.getElementById("art_date_post").value;
    article_date_post =  article_date_post.replace("-","年");
    article_date_post =  article_date_post.replace("-","月");
    article_date_post = "掲載日："+article_date_post + "日";
    document.getElementById("post-cat").innerHTML = article_date_post;
})

document.getElementById("set_text").addEventListener("click",()=>{
    text_count++;
    order.push("t"+text_count);
    //input_text.replace(/\n/g,"LF")
    text = '<div id="block'+text_count+'"><textarea id="textarea'+text_count+'">'+document.getElementById("text_write").value+'</textarea><p onclick="del('+text_count+')">×削除</p></div>';
    document.getElementById("insert_area").insertAdjacentHTML("beforeend",text);
})

document.getElementById("set_pic").addEventListener("click",()=>{
    
    photo_count++;
    order.push("p"+photo_count);
    var up_image = document.getElementById("up_pic");
    photo_order.push(up_image.files[0]);
    up_image = up_image.files[0];
    
    var reader = new FileReader()
    reader.onload = (e) => {
        var base64 = e.currentTarget.result;
        document.getElementById("insert_area").insertAdjacentHTML("beforeend",'<div id="photo'+photo_count+'"><img src="'+base64+'"><p onclick="del_pho('+photo_count+')">×削除</p></div>')
    }
    reader.readAsDataURL(up_image)
})

function auth_check(){
    var url = location.search;
    console.log(url);   
    url = new URLSearchParams(url);
    try{
    var param = url.get('token');
    var username = url.get('username');
    console.log(param);
    console.log(username);
    var json = [];
    json.push(param);
    json.push(username);

    var formdata = new FormData();
    formdata.append(
        "login_auth",
        JSON.stringify(json)
    );
    fetch('login_check.php',{
        "method":"post",
        "body":formdata
    })
    .then(resjson=>{
        if(resjson.ok){
            return resjson.json()
        }
    })
    .then(json =>{
        if(json["result"] == "success"){
            alert("ログインしました");
        }else{
            alert("ログインに失敗しました");
            location.href="login.html";
        }
    })
    .catch(err=>{
        console.log(err);
        alert("ログインに失敗しました");
        location.href = "login.html";
    })
    console.log(param);
    }catch(err){
        console.log(err);
        alert("ログインに失敗しました。");
        location.href = "login.html";
    }
}

function del(d_num){
document.getElementById("block"+d_num).textContent = "";
var count = -1;
for(var block of order){
    count++;
    if(block == "t"+d_num){
        order.splice(count,1);
    }
}
}

function del_pho(d_num){
document.getElementById("photo"+d_num).textContent = "";
var count = -1;
var p_count = -1;
for(var block of order){
    count++;
    if(block.indexOf("p") != -1 && block == "p"+d_num){
        p_count++;
        order.splice(count,1);
        photo_order.splice(p_count,1);
    }else if(block.indexOf("p") != -1){
        p_count++;
    }
}
}

async function pre_send(){
    var photo_count = -1;
    for(var block of order){
        if(block.indexOf("t") !=-1){
            var num = block.substring(1,)
            var text = document.getElementById("textarea"+num).value;
            text = text.replace(/\n/g,"LF");
            send_data.push(text);
        }else{
            photo_count++;
            send_data.push(photo_order[photo_count].name);
        }
    }

    var title_data = [{
        "title":document.getElementById("post-title").innerHTML ,
        "date_train":document.getElementById("post-date").innerHTML,
        "date_write":document.getElementById("post-cat").innerHTML,
        "article":send_data
    }];

    var api_key = ["abcdefg"]
    var formData = new FormData();
    formData.append(
        "apikey",
        JSON.stringify(api_key)
    );
    formData.append(
        "send_data",
        JSON.stringify(title_data)
    )
    console.log(JSON.stringify(title_data));
    /*formData.append(
        "article",
        JSON.stringify(send_data)
    );*/
    for(var photo of photo_order){
        formData.append(
            "images[]",
            photo
        );
    }
    
   fetch('test.php',{
        "method":"POST",
        "body":formData
    })
    .then(resjson=>{
        if(resjson.ok){
            return resjson.json()
        }
    })
    .then(json =>{
        if(json["result"] == "success"){
            alert("success");
        }
    })
    .catch(err =>{
        console.log(err)
    })
    

}

function check(){
    
}

