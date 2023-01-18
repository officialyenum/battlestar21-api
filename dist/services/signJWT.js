"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Logging_1 = __importDefault(require("../library/Logging"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config/config");
const NAMESPACE = 'Auth';
const signJWT = (user, callback) => {
    const timeSinchEpoch = new Date().getTime();
    const expirationtime = timeSinchEpoch + Number(config_1.config.token.expireTime) * 100000;
    const expirationTimeInSeconds = Math.floor(expirationtime / 1000);
    Logging_1.default.info(`${NAMESPACE} : Attempting to sign token for  ${user.username}`);
    try {
        jsonwebtoken_1.default.sign({
            _id: user._id.toString(),
            username: user.username
        }, config_1.config.token.secret, {
            issuer: config_1.config.token.issuer,
            algorithm: 'HS256',
            expiresIn: expirationTimeInSeconds
        }, (error, token) => {
            if (error) {
                callback(error, null);
            }
            else if (token) {
                callback(null, token);
            }
        });
    }
    catch (err) {
        Logging_1.default.error(`${NAMESPACE} : ${err}`);
        callback(err, null);
    }
};
exports.default = signJWT;
//# sourceMappingURL=signJWT.js.map