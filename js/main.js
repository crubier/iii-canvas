var canvas = document.getElementById("canvas");

// Mouse events
canvas.addEventListener("mousemove", mousemove,true);
canvas.addEventListener("mousedown",mousedown,true);
canvas.addEventListener("mouseup",mouseup,true);
canvas.addEventListener("wheel",wheel,true);

// Prevent context menu
canvas.addEventListener("contextmenu",function(e){
  if(e.preventDefault !== undefined)
   e.preventDefault();
  if(e.stopPropagation !== undefined)
   e.stopPropagation();
  return false;
},false);

// Touch events
canvas.addEventListener("touchcancel"	, touchcancel,true);
canvas.addEventListener("touchend"	, touchend,true);
canvas.addEventListener("touchmove"	, touchmove,true);
canvas.addEventListener("touchstart", touchstart,true);

// Keyboard events
canvas.addEventListener("keydown"	, keydown,true);
canvas.addEventListener("keyup"	, keyup,true);

// Global
window.addEventListener("resize",resize,true);

// Motion
window.addEventListener("devicemotion", devicemotion, true);
window.addEventListener("deviceorientation", deviceorientation, true);


function mousedown(e) {
  console.log("mousedown");
}

function mouseup(e) {
  console.log("mouseup");
}

function mousemove(e) {
    console.log("mousemove");
    var target = e.target;
    var rect = canvas.getBoundingClientRect();
    var offsetX = e.clientX - rect.left;
    var offsetY = e.clientY - rect.top;
    drawCursor(offsetX, offsetY);
}

function wheel(e) {
  console.log("wheel");
}

function keydown(e) {
  console.log("keydown");
}

function keyup(e) {
  console.log("keyup");
}


function resize(e) {
  console.log("resize");
}

function devicemotion(e){

}

function deviceorientation(e){

}

function touchcancel(e){

}

function touchend(e){

}

function touchmove(e){

}

function touchstart(e) {

}







var mainInterface = {};










function drawCursor(x, y) {
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 800, 600);
    var cursor = {
      type:"shadow",
      blur:20,
      offset:{x:0,y:4},
      color:"rgba(0, 0, 0, 0.5)",
      content:{
        type: "translate",
        x: x,
        y: y,
            content: {
                type: "fill",
                style: "rgba(200, 0, 200, 1)",
                content: {
                    type: "path",
                    content: [{
                        type: "begin"
                    }, {
                        type: "move",
                        x: 0,
                        y: 0
                    }, {
                        type: "line",
                        x: 0,
                        y: 15
                    }, {
                        type: "line",
                        x: 10.6,
                        y: 10.6
                    }, {
                        type: "close"
                    }]
                }
            }
    }};
    draw(ctx,cursor);
}

function draw(ctx, object) {
    var i;
    switch (object.type) {
        case "move":
            ctx.moveTo(object.x, object.y);
            break;
        case "line":
            ctx.lineTo(object.x, object.y);
            break;
        case "cubic":
            ctx.bezierCurveTo(object.cp1x, object.cp1y, object.cp2x, object.cp2y, object.x, object.y);
            break;
        case "quadratic":
            ctx.quadraticCurveTo(object.cpx, object.cpy, object.x, object.y);
            break;
        case "arc":
            ctx.arcTo(object.x1, object.y1, object.x2, object.y2, object.radius);
            break;
        case "begin":
            ctx.beginPath();
            break;
        case "close":
            ctx.closePath();
            break;
        case "path":
            for (i = 0; i < object.content.length; i++) {
                draw(ctx, object.content[i]);
            }
            break;
        case "rect":
            ctx.rect(object.x1, object.y1, object.x2, object.x2);
            break;
        case "shadow":
            ctx.save();
            ctx.shadowBlur = object.blur;
            ctx.shadowColor = object.color;
            ctx.shadowOffsetX = object.offset.x;
            ctx.shadowOffsetY = object.offset.y;
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "fill":
            ctx.save();
            ctx.fillStyle = object.style;
            draw(ctx, object.content);
            ctx.fill();
            ctx.restore();
            break;
        case "stroke":
            ctx.save();
            ctx.strokeStyle = object.style;
            draw(ctx, object.content);
            ctx.stroke();
            ctx.restore();
            break;
        case "clip":
            ctx.save();
            draw(ctx, object.region);
            ctx.clip();
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "transform":
            ctx.save();
            ctx.transform(object.a, object.b, object.c, object.d, object.e, object.f);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "scale":
            ctx.save();
            ctx.scale(object.width, object.height);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "translate":
            ctx.save();
            ctx.translate(object.x, object.y);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "rotate":
            ctx.save();
            ctx.rotate(object.angle);
            draw(ctx, object.content);
            ctx.restore();
            break;
        case "group":
            for (i = 0; i < object.content.length; i++) {
                draw(ctx, object.content[i]);
            }
            break;
        default:
          throw new Error("unexpected graphic element type"+object.type);
    }
}
