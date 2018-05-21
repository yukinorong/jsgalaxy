
function planet(id,vx,vy,px,py,color) {
    this.id = id;//每个id 对应一个div
    this.Vx = vx;
    this.Vy = vy;
    this.posx = px;
    this.posy = py;
    this.color = color;
}

function createDivbyPlanet(myplanet) {
    cdiv = document.createElement('DIV');
    document.body.appendChild(cdiv);
    cdiv.className = 'mdiv';
    cdiv.id = myplanet.id;
    cdiv.style.top = myplanet.posy+'px';
    cdiv.style.left = myplanet.posx+'px';
    cdiv.style.backgroundColor = myplanet.color;
}

function startMove(myplanet){

    mydiv = document.getElementById(myplanet.id);
    if (mydiv.offsetTop + mydiv.clientHeight + 10> document.documentElement.clientHeight) {
        myplanet.Vx = -Math.abs(myplanet.Vx);
    }
    if(mydiv.offsetTop < 10){
        myplanet.Vx = Math.abs(myplanet.Vx);
    }
    if (mydiv.offsetLeft + mydiv.clientWidth +10 > document.documentElement.clientWidth) {
        myplanet.Vy = -Math.abs(myplanet.Vy);
    }
    if(mydiv.offsetLeft < 10){
        myplanet.Vy = Math.abs(myplanet.Vy);
    }
    mydiv.style.top = mydiv.offsetTop + myplanet.Vx + 'px';
    mydiv.style.left = mydiv.offsetLeft + myplanet.Vy + 'px';
}

//随机颜色的方法，从别处复制来的。
function getRandomColor(){

    return  '#' +
        (function(color){
            return (color +=  '0123456789abcdef'[Math.floor(Math.random()*16)])
            && (color.length == 6) ?  color : arguments.callee(color);
        })('');
}

//获取鼠标位置，赋值
function mousePosition(ev) {
    // Ev = ev || window.event;
    var mousePos = mouseCoords(ev);
    //将鼠标位置发送到全局变量
    mousePosX = mousePos.x;
    mousePosY = mousePos.y;
    // document.getElementById("xxx").value = mousePos.x;
    // document.getElementById("yyy").value = mousePos.y;


}
function mouseCoords(ev) {
    if (ev.pageX || ev.pageY) {
        return {x: ev.pageX, y: ev.pageY};
    }
    return {
        x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
        y: ev.clientY + document.body.scrollTop - document.body.clientTop
    };
}



//每当浏览器大小改变时，获取浏览器大小
function findDimensions()
{
    clientW = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;

    clientH = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
    //结果输出至两个文本框
    // document.getElementById("height").value= clientH;
    // document.getElementById("width").value= clientW;
}


//类似工厂模式创建星球
function createPlanet() {
    var vx = document.getElementById("Xspeed").value;
    var vy = document.getElementById("Yspeed").value;

    var posx = mousePosX - radiusofPlanet;
    var posy = mousePosY - radiusofPlanet;

    var color = getRandomColor();
    var id = "c"+planetNum;

    var myplanet = new planet(id,vx,vy,posx,posy,color);
    createDivbyPlanet(myplanet);
}

$("#start").click(function() {
    if(!isStart){
        isStart = true;
        timer=self.setInterval(function () {
            startMove(p1);
            startMove(p2);
            // createPlanet()
        },5);
    }else{
        isStart = false;
        clearInterval(timer);
    }
});
