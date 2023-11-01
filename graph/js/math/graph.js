class Graph {


    constructor(points = [], segments = []) {

        this.points = points;
        this.segments = segments;

    }

    addPoint = (point) => {

        if (!this.containsPoint(point))
            this.points.push(point);
    }

    addSegment = (segment) => {
        if (!this.containsSegment(segment)) {
            this.segments.push(segment);
        }
    }

    removeSegment = (segment) => {
        if (this.segments.length == 0) {
            console.log("No Segments");
        }
        if (this.containsSegment(segment)) {
            const idx = this.segments.indexOf(segment);
            this.segments.splice(idx, 1);
        }
    }
    removeSegment = (segment) => {
        this.segments.splice(this.segments.indexOf(segment), 1);
    }

    removePoint = (point) => {

        if (this.points.length == 0) {
            console.log("No points");
        }



        const idx = this.points.indexOf(point);
        const segs = this.findSegmentsByPoint(point);
        console.log(segs);

        segs.forEach(seg => {
            this.removeSegment(seg);
        })
        this.points.splice(idx, 1);

    }

    findSegmentsByPoint = (point) => {
        const segs = [];
        for (const seg of this.segments) {
            if (seg.includes(point)) {
                segs.push(seg);
            }
        }
        return segs;
    }

    containsSegment = (segment) => {
        return this.segments.find(seg => {
            seg.equals(segment);
        })
    }
    containsPoint = (point) => {
        return this.points.find(p =>
            p.equals(point)
        );
    }
    draw = (ctx) => {

        this.segments.forEach(seg => {
            seg.draw(ctx);
        });

        this.points.forEach(point => {
            point.draw(ctx);
        })
    }
}