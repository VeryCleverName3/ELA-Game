var c = document.getElementById("gameCanvas");
var ctx = c.getContext("2d");
c.height = window.innerHeight;
c.width = c.height;
s = c.width;

ctx.lineWidth = 10;
ctx.strokeRect(0, 0, s, s);
