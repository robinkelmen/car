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

    removePoint = (point) => {

        if (this.points.length == 0) {
            console.log("No points");
        }


        if (this.containsPoint(point)) {
            const idx = this.points.indexOf(point);
            const segs = this.findSegmentsByPoint(point);

            segs.forEach(seg => {
                this.segments.splice(this.segments.indexOf(seg), 1);
            })
            this.points.splice(idx, 1);
        }
    }

    findSegmentsByPoint = (point) => {
        let foundSegments = [];
        this.segments.forEach(seg => {

            if (seg.includes(point)) {
                foundSegments.push(seg);
            }

        });

        return foundSegments;
    }

    containsSegment = (segment) => {
        this.segments.find(seg => {
            seg.equals(segment);
        })
    }
    containsPoint = (point) => {
        this.points.find(p => {
            p.equals(point);
        })
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