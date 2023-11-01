class Layer {



    constructor(inputs, outputs, bias = 0) {
        this.inputLength = inputs;
        this.outputLength = outputs;
        this.outputs = [];
        this.inputs = [];
        this.weights = [];
        this.bias = bias;
        this.biases = []//this.initializeBiases();
        //this.numlayers = numlayers;

        this.weights = this.initializeMatrix(this.inputLength, this.outputLength);

    }



    intializeRow = (length, max) => {

        return [...new Array(length)]
            .map(() => Math.random() * max)

    };

    initializeBiases = () => {

        return new Array(this.outputLength.length).fill(this.bias);
    }

    initializeMatrix = (inputLength, outputLength) => {

        return new Array(outputLength).fill(0).map(() => {
            return this.intializeRow(inputLength, 1);
        })
    }

    feedForward = (inputs) => {
        /* 
                if (inputs.length !== this.weights.length) {
                    throw new Error(`Dimension mismatch: weights and inputValues must have the same length. 
                    input Length: ${inputs.length}, weights length: ${this.weights.length}`);
                } */

        this.inputs = inputs;

        this.outputs = this.weights.map((weightsRow) => {



            const weightedSum = this.calculateWeigtedSum(weightsRow, inputs);


            return sigmoid(weightedSum);
        });



        return this.outputs;
    }

    calculateWeigtedSum(weights, inputValues) {

        if (inputValues.length !== weights.length) {
            throw new Error(`Dimension mismatch: weights and inputValues must have the same length.
            Weights: ${weights.length} and Inputs: ${inputValues.length}`);
        }
        let sum = 0;



        for (let i = 0; i < weights.length; i++) {

            sum += weights[i] * inputValues[i];
            sum += sum + this.bias;
        }

        return sum;
    }














}