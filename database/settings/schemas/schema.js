"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
class Schema {
    constructor(...args) {
        this.data = args;
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            let schemaData = {};
            for (let opp of this.data) {
                for (let key of Object.keys(opp)) {
                    let object = this.data[0][key];
                    if (object.type !== typeof object.default)
                        throw new Error(" Invalid key type or value");
                    schemaData[key] = object.default;
                }
                return schemaData;
            }
        });
    }
    get() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.getAll();
            return yield data;
        });
    }
}
module.exports.Schema = Schema;
//# sourceMappingURL=schema.js.map