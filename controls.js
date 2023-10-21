class Controls {


    constructor() {
        this.forward = false;
        this.back = false;
        this.right = false;
        this.left = false;
        this.#addKeyEventListeners();

    }


    #addKeyEventListeners() {

        document.onkeydown = (event) => {
            this.flipControls(event.key, true);

        }
        document.onkeyup = (event) => {
            console.log(event)
            this.flipControls(event.key, false);

        }



    }

    flipControls = (key, active) => {

        switch (key) {
            case "ArrowUp":
                this.forward = active;

                break;

            case "ArrowDown":
                this.back = active;
                break;

            case "ArrowLeft":
                this.left = active;
                break;
            case "ArrowRight":
                this.right = active;
                break;
        }
        //console.table(this);

    }
}