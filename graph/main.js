


const canvas = document.getElementById("myCanvas");

const width = window.innerWidth;
const height = window.innerHeight;


canvas.width = width;
canvas.height = height;
const ctx = canvas.getContext("2d");





const p1 = new Point(200, 200);
const p2 = new Point(200, 400);
const p3 = new Point(500, 200);
const p4 = new Point(300, 400);
const p5 = new Point(200, 500);

const segment = new Segment(p1, p2);
const segment2 = new Segment(p3, p4);
const segment3 = new Segment(p3, p2);

const points = [
    p1,
    p2,
    p3,
    p4,
    p5
];

const segments = [
    segment,
    segment2,
    segment3
]
const graph = new Graph(points, segments);

const graphEditor = new GraphEditor(canvas, graph);




animate();

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "lightblue";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    graphEditor.display();

    requestAnimationFrame(animate);
}
