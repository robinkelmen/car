

function lerp(start, end, t) {
    return start + (end - start) * t;
}

function sigmoid(x) {
    return 1 / (1 + Math.exp(-x));
}

function leakyReLU(x, alpha = 0.01) {
    return x >= 0 ? x : alpha * x;
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

function convertTo360Degrees(angle) {
    // Use the modulo operator to wrap the angle to the range [0, 360)
    let angleIn360 = angle % 360;

    // Ensure the result is positive (handles negative angles)
    if (angleIn360 < 0) {
        angleIn360 += 360;
    }

    return angleIn360;
}

const quadrantRanges = [
    { range: [0, 90], orientation: "Top Left", flip: 1 },
    { range: [270, 360], orientation: "Top Right", flip: 1 },
    { range: [90, 91], orientation: "Left", flip: 1 },
    { range: [180, 181], orientation: "Down", flip: 1 },
    { range: [270, 271], orientation: "Right", flip: 1 },
    { range: [91, 179], orientation: "Bottom Left", flip: -1 },
    { range: [181, 269], orientation: "Bottom Right", flip: -1 }
];

function determineOrientation(angle360) {
    for (const entry of quadrantRanges) {
        if (angle360 >= entry.range[0] && angle360 <= entry.range[1]) {
            return { orientation: entry.orientation, flip: entry.flip };
        }
    }
    return "Unknown"; // Default value if angle doesn't match any range
}
