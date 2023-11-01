

function getNearestPoint(loc, points, threshhold = 10) {


    let minDist = Number.MAX_SAFE_INTEGER;
    let nearest = null;

    points.forEach(point => {
        const dist = distance(loc, point);



        if (dist < minDist && dist < threshhold) {
            minDist = dist;
            nearest = point;
        }

    });



    return nearest;
}


function distance(p1, p2) {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;



    return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
}