var RADIUS = 8;
var MARGIN_TOP = 60;
var MARGIN_LEFT = 30;
var WINDOW_HEIGHT = 768;
var WINDOW_WIDTH = 1300;

const endTime = new Date(2019, 1, 24, 14, 26, 43);
//var curTime = new Date();
//console.log(endTime)
//console.log(curTime)
var curShowTimeSeconds = 0;
var balls = [];
var colors = ['#33b5e4', '#0099cc', '#aa66cc', '#9933cc', '#99cc00', '#669900', '#ffbb33', '#ff8800', '#ff4444', '#cc0000']


window.onload = function () {

   // var body = document.getElementsByTagName('body');

   

    WINDOW_WIDTH = document.body.clientWidth;
    WINDOW_HEIGHT = window.screen.height-139;
    MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
    RADIUS = Math.round(WINDOW_WIDTH*4/5/108)-1;
    MARGIN_TOP = Math.random(WINDOW_WIDTH/5);

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;

    curShowTimeSeconds = getCurrentShowTimeSeconds();
    setInterval(function () {
        render(ctx);
        update();
    }, 50)

}

function getCurrentShowTimeSeconds() {
    var curTime = new Date();
    var ret = endTime.getTime() - curTime.getTime();
    //console.log(endTime.getDate())
    ret = Math.round(ret / 1000);
    //console.log(ret);
    return ret >= 0 ? ret : 0;


}


function update() {
    var nextShowTimeseconds = getCurrentShowTimeSeconds();
    var nexthours = parseInt(nextShowTimeseconds / 3600);
    var nextminutes = parseInt((nextShowTimeseconds - nexthours * 3600) / 60);
    var nextseconds = nextShowTimeseconds % 60;

    var curhours = parseInt(curShowTimeSeconds / 3600);
    var curminutes = parseInt((curShowTimeSeconds - curhours * 3600) / 60);
    var curseconds = curShowTimeSeconds % 60;


    if (nextseconds != curseconds) { //十位数
        //小时
        if (parseInt(curhours / 10) != parseInt(nexthours / 10)) {
            addBalls(MARGIN_LEFT + 0, MARGIN_TOP, parseInt(curhours / 10))
        }
        if (parseInt(curhours % 10) != parseInt(nexthours % 10)) { //个位数
            addBalls(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(curhours / 10))
        }

        //分
        if (parseInt(curminutes / 10) != parseInt(nextminutes / 10)) {
            addBalls(MARGIN_LEFT +  39*(RADIUS+1), MARGIN_TOP, parseInt(curminutes / 10))
        }
        if (parseInt(curminutes % 10) != parseInt(nextminutes % 10)) { //个位数
            addBalls(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(curminutes % 10))
        }
        //秒
        if (parseInt(curseconds / 10) != parseInt(nextseconds / 10)) {
            addBalls(MARGIN_LEFT + 78*(RADIUS+1), MARGIN_TOP, parseInt(curseconds / 10))
        }
        if (parseInt(curminutes % 10) != parseInt(nextseconds % 10)) { //个位数
            addBalls(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(nextseconds % 10))
        }
        curShowTimeSeconds = nextShowTimeseconds;
    }

    updateBalls();
}

function updateBalls() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vy += balls[i].g;


        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = -balls[i].vy * 0.75;
        }
    }

    var cnt = 0;
    for(var i = 0;i<balls.length; i++){
        if(balls[i].x + RADIUS > 0 && balls[i].x - RADIUS < WINDOW_WIDTH){
            balls[cnt++] = balls[i];
        }

        

    }

    while(balls.length > Math.min(300,cnt)){
        balls.pop();
    }


}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x:x+j*2*(RADIUS+1)+(RADIUS+1),
                    y:y+i*2*(RADIUS+1)+(RADIUS+1),
                    g: 1.5 + Math.random(),
                    vx: Math.pow(-1, Math.ceil(Math.random() * 1000)) * 4,
                    vy: -5,
                    color: colors[Math.floor(Math.random() * colors.length)]
                }
                balls.push(aBall);


            }
        }
    }
}






function render(ctx) {

    ctx.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);

    var hours = parseInt(curShowTimeSeconds / 3600);
    var minutes = parseInt((curShowTimeSeconds - hours * 3600) / 60);
    var seconds = curShowTimeSeconds % 60;

    renderDight(MARGIN_LEFT, MARGIN_TOP, parseInt(hours / 10), ctx);
    renderDight(MARGIN_LEFT + 15 * (RADIUS + 1), MARGIN_TOP, parseInt(hours % 10), ctx);
    renderDight(MARGIN_LEFT + 30 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDight(MARGIN_LEFT + 39 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes / 10), ctx);
    renderDight(MARGIN_LEFT + 54 * (RADIUS + 1), MARGIN_TOP, parseInt(minutes % 10), ctx);
    renderDight(MARGIN_LEFT + 69 * (RADIUS + 1), MARGIN_TOP, 10, ctx);
    renderDight(MARGIN_LEFT + 78 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds / 10), ctx);
    renderDight(MARGIN_LEFT + 93 * (RADIUS + 1), MARGIN_TOP, parseInt(seconds % 10), ctx);


    for (var i = 0; i < balls.length; i++) {
        ctx.fillStyle = balls[i].color;
        ctx.beginPath();
        ctx.arc(balls[i].x, balls[i].y, RADIUS, 0, 2 * Math.PI, true);
        ctx.closePath();
        ctx.fill();

    }
}

function renderDight(x, y, num, ctx) {

    ctx.fillStyle = 'rgb(0,102,153)';

    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                ctx.beginPath();
                ctx.arc(x + j * 2 * (RADIUS + 1) + (RADIUS + 1), y + i * 2 * (RADIUS + 1) + (RADIUS + 1), RADIUS, 0, 2 * Math.PI);
                ctx.closePath();

                ctx.fill();
            }
        }
    }

}