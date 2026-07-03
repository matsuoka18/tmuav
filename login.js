function login(){
    var json = [];
    var username = document.getElementById("usr_id").value;
    var password = document.getElementById("usr_pass").value;
    //noIPとかで適当にIPは取得する予定
    var ip = "000.000.00.0";
    if(username.length < 1 || password.length < 1){
        alert("空欄があります");
        return
    }
    json.push(username);
    json.push(password);
    json.push(ip);

    var formdata = new FormData();
    formdata.append(
        "login_data",
        JSON.stringify(json)
    )
    fetch('login.php',{
        "method":"post",
        "body":formdata
    })
    .then(resjson =>{
        if(resjson.ok){
            return resjson.json()
        }
    })
    .then(json =>{
        console.log(json);
        if(json["result"] == "success"){
            location.href= json["url"]+"?token="+json["api_token"]+"&username="+username;
        }else{
            alert("ユーザー名またはパスワードが間違っています");
        }
    })
}