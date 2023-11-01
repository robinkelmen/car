class Network {



    constructor(inputLength, outputLength, numLayers = 2, layerSizes = []) {

        this.inputLength = inputLength;
        this.outputLength = outputLength;
        this.numLayers = numLayers;
        this.layerSizes = layerSizes.length ? layerSizes : this.generateDecreasingLayerSizes();
        this.layers = this.initializeLayers();



    }


    feedForward = (inputs) => {
        let output = this.layers[0].feedForward(inputs);


        for (let i = 1; i < this.layers.length; i++) {
            console.log(output);
            output = this.layers[i].feedForward(output);
        }

        console.log(output);
        return output;
    }



    initializeLayers = () => {
        let layers = [];
        layers.push(new Layer(this.inputLength, this.layerSizes[0]));



        for (let i = 1; i < this.layerSizes.length; i++) {
            layers.push(new Layer(this.layerSizes[i - 1], this.layerSizes[i]));
        }

        layers.push(new Layer(this.layerSizes[this.layerSizes.length - 1], this.outputLength));


        console.log("Layer Dimensions:");
        for (let i = 0; i < layers.length; i++) {
            console.log(`Layer ${i + 1}: ${layers[i].inputLength} X ${layers[i].outputLength}`);
        }
        return layers;
    }



    generateDecreasingLayerSizes = (inputSize, outputSize, numLayers) => {
        const layerSizes = [];

        // Calculate the initial size as the average of input and output sizes
        let initialSize = Math.ceil((this.inputLength + this.outputLength) / 2);

        // Ensure the initial size is larger than the output size
        initialSize = Math.max(initialSize, this.outputLength + 1);

        // Distribute the sizes in a decreasing manner across the hidden layers
        for (let i = 0; i < this.numLayers; i++) {
            layerSizes.push(initialSize);
            initialSize = Math.ceil(initialSize / 2); // Halve the size
        }

        return layerSizes;
    }



    draw = (ctx) => {

    }



}