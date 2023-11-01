class GraphEditor {


    constructor(canvas, graph) {
        this.canvas = canvas;
        this.graph = graph;
        this.ctx = canvas.getContext("2d");

        this.selected = null;
        this.hovered = null;

        this.#addEventListeners();
    }


    display = () => {
        this.graph.draw(this.ctx);
        if (this.selected) {
            this.selected.draw(this.ctx, { outline: true });
        }
        if (this.hovered) {
            this.hovered.draw(this.ctx, { fill: true });
        }
    }

    #addEventListeners = () => {
        this.canvas.addEventListener('mousedown', (e) => {

            if (e.button == 2) {
                console.log("rightclick");

                this.#removePoint(this.hovered);

                return;
            }
            const mouse = new Point(e.offsetX, e.offsetY);


            if (this.hovered) {
                this.selected = this.hovered;
                return;
            }
            this.graph.addPoint(mouse);
        });

        this.canvas.addEventListener('mousemove', (e) => {
            const mouse = new Point(e.offsetX, e.offsetY);

            this.hovered = getNearestPoint(mouse, this.graph.points);
        });

        this.canvas.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    #removePoint = (point) => {

        this.graph.removePoint(this.hovered);

        this.hovered = null;
        if (this.selected == point) {
            this.selected = null;
        }



    }






}