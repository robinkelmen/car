

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function checkIntersection(x1, y1, x2, y2, x3, y3, x4, y4) {
    const denom = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (denom === 0) {
        // Lines are parallel and don't intersect
        return null;
    }

    const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / denom;
    const u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / denom;

    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
        const x = x1 + t * (x2 - x1);
        const y = y1 + t * (y2 - y1);
        return { x, y };
    }

    // Lines don't intersect within the given line segments
    return null;
}
