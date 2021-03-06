/**
 * @author Matt C [matt@artemisbot.uk]
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */

import Operation from "../Operation";
import OperationError from "../errors/OperationError.mjs";
import notepack from "notepack.io";

/**
 * To MessagePack operation
 */
class ToMessagePack extends Operation {

    /**
     * ToMessagePack constructor
     */
    constructor() {
        super();

        this.name = "To MessagePack";
        this.module = "Code";
        this.description = "Converts JSON to MessagePack encoded byte buffer. MessagePack is a computer data interchange format. It is a binary form for representing simple data structures like arrays and associative arrays.";
        this.infoURL = "https://wikipedia.org/wiki/MessagePack";
        this.inputType = "JSON";
        this.outputType = "ArrayBuffer";
        this.args = [];
    }

    /**
     * @param {JSON} input
     * @param {Object[]} args
     * @returns {ArrayBuffer}
     */
    run(input, args) {
        try {
            if (ENVIRONMENT_IS_WORKER()) {
                return notepack.encode(input);
            } else {
                return notepack.encode(input).buffer;
            }
        } catch (err) {
            throw new OperationError(`Could not encode JSON to MessagePack: ${err}`);
        }
    }

}

export default ToMessagePack;
