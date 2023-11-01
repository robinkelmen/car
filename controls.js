class Controls {


    constructor(type) {
        this.forward = false;
        this.back = false;
        this.right = false;
        this.left = false;
        // this.#addKeyEventListeners();

        switch (type) {
            case "KEYS":
                this.#addKeyEventListeners();
                break;
            case "DUMMY":
                this.forward = true;
                break;
        }

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