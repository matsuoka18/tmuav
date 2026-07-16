
document.getElementById("close").addEventListener("click",()=>{
    document.getElementById("pop").style.display = "none";
    document.getElementById("pop").style.opacity = "0";
})

function pop(number){
    var posi = "block"+number;
    var z = document.getElementById(posi).getBoundingClientRect();
    console.log(z.left-screen.width*0.14);
    /*window.scrollTo({
        top:z.top,
        behavior:'smooth'
    });*/
    
    z = document.getElementById(posi).getBoundingClientRect();
    document.getElementById("pop").style.display = "block";
    document.getElementById("pop").style.position = "absolute";
    document.getElementById("pop").style.left = z.left+window.scrollX+"px";
    document.getElementById("pop").style.top = z.top+window.scrollY+"px";
    /*window.scrollTo({
        top:z.top+"px"
    })*/
    $("#pop").animate({
        "width":0,
        "height":0
    },0)
    $("#pop_block2").animate({
        "opacity":0,
        "width":0,
        "height":0
    },0)
        $("#pop_img").animate({
        /*"width":0,
        "height":0,*/
        "opacity":0
    },0)
    $("#pop").animate({
        "opacity":1,
        "width":'35vw',
        "height":'42vw'
    },250)
    $("#pop_img").animate({
        "width":"33vw",
        "height":"28vw",
        "opacity":1
    },700)
    $("#pop_block2").animate({
        "opacity":1,
        "width":"35vw",
        "height":"auto"
    },500)

}