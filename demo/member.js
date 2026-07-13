document.getElementById("detail").addEventListener("click",(ele)=>{
    //var top = document.getElementById("detail1").offset().top;
    var z = document.getElementById("detail").getBoundingClientRect();
    console.log(z.left-screen.width*0.14);
    document.getElementById("pop").style.display = "block";
    document.getElementById("pop").style.opacity = "1";
    document.getElementById("pop").style.position = "absolute";
    document.getElementById("pop").style.left = z.left-screen.width*0.14+"px";
    document.getElementById("pop").style.top = z.top-screen.height*0.34+"px";
})

document.getElementById("close").addEventListener("click",()=>{
    document.getElementById("pop").style.display = "none";
})