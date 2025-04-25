"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateItem = void 0;
const express_validator_1 = require("express-validator");
exports.validateItem = [
    (0, express_validator_1.body)("codigo").notEmpty().withMessage("el codigo es obligatorio").isNumeric().withMessage("el codigo debe tner un formato numerico"),
    (0, express_validator_1.body)("nombre").notEmpty().withMessage("el nombre del item es obligatorio").isString().withMessage("el nombre debe ser en formato cadena de texto"),
    (0, express_validator_1.body)("precio").notEmpty().withMessage("el precio del item es obligatorio").isFloat({ min: 100 }).withMessage("ingrese un precio valido"),
    (0, express_validator_1.body)("stock").notEmpty().withMessage("el stock es obligatorio")
];
