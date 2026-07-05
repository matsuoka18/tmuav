document.getElementById("top").addEventListener("click",()=>{
    location.href = "home.html"
})

var photo_name = ["news-bg.jpg","news2-bg.jpg","home-bg.jpg"];
    var length = photo_name.length;
    
    var count = 0;

function photo_change(){
    
    document.getElementById("cir"+count).style.backgroundColor = "gray"
    try{
    var num = count-1;
    document.getElementById("cir"+num).style.backgroundColor = "lightgray"
    }catch(err){
        //めんどかった。。。。
    }
    try{
        var num1 = count+2;
        document.getElementById("cir"+num1).style.backgroundColor = "lightgray"
    }catch(err){
        //めんどい
    }
        $("#home_photos").animate({
            opacity:1
        },2000)
        $("#home_photos").animate({
            opacity:1
        },2000)
        $("#home_photos").animate({
            opacity:0
        },2000)
        $("#home_photos").attr("src","./images/"+photo_name[count])
        //document.getElementById("home_photos").src = "./images/"+photo_name[count];
        count++;
        if(count == length){
            count = 0;
        }
        setTimeout(photo_change,6000);
}

function photo_status_set(){
    
    
    for(var i = 0; i<length; i++){
        var text = ""
    }
}