"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class IndexController {
}
IndexController.index = (req, res, next) => {
    res.json({
        message: "Home Page!"
    });
};
IndexController.health = (req, res, next) => {
    res.status(200).json({
        message: 'pong'
    });
};
exports.default = IndexController;
//# sourceMappingURL=index.controller.js.map