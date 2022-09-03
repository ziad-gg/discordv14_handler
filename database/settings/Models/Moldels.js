var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

const firebase = require("firebase");

function connection(DataBaseInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        if (DataBaseInfo == undefined)
            throw new Error("Invalid parameters !");
        try {
            firebase.initializeApp(DataBaseInfo);
        }
        catch (e) {
            throw new Error(e);
        }
    });
}


class Model {
    constructor(Options) {
        this.database = firebase.database();
        this.rootRef = this.database.ref(Options.name);
        this.Schema = Options.schema;
        if (this.Schema === undefined)
            throw new Error("Invalid Schema type !");
        this.Schema.data = this.Schema.get();
    }
    create(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let array = [];
            if (!key || key.includes(' ') || key.includes('\n'))
                throw new Error("Invalid key !");
            yield this.rootRef.once("value", (data) => __awaiter(this, void 0, void 0, function* () {
                array.push(data.val());
            }));
            if (array[0] && array[0][key] === undefined) {
                yield this.rootRef.child(key).set(yield this.Schema.data);
            }
            if (!array[0]) {
                yield this.rootRef.child(key).set(yield this.Schema.data);
            }
            else {
                return false;
            }
        });
    }
    ;
    has(key) {
        return __awaiter(this, void 0, void 0, function* () {
            let array = [];
            if (!key || key.includes(' ') || key.includes('\n'))
                throw new Error("Invalid key !");
            yield this.rootRef.once("value", (data) => __awaiter(this, void 0, void 0, function* () {
                array.push(data.val());
            }));
            if (!array[0]) {
                return false;
            }
            ;
            if (!array[0][key]) {
                return true;
            }
            ;
            if (array[0][key]) {
                return true;
            }
            ;
        });
    }
    ;
    get(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!key || key.includes(' ') || key.includes('\n'))
                throw new Error("Invalid key !");
            var data = yield this.rootRef.child(key).get();
            if (!data.val()) {
                return null;
            }
            if (data.val()) {
                let c = {
                    data: data.val(),
                    save: () => __awaiter(this, void 0, void 0, function* () {
                        if (c.data) {
                            let newschemaData = yield this.Schema.data;
                            for (let newkey of Object.keys(newschemaData)) {
                                for (let newValue of Object.values(newschemaData)) {
                                    if (typeof newschemaData[newkey] !== typeof c.data[newkey]) {
                                        throw new Error(`invalid datatype`);
                                    }
                                    else
                                        newschemaData[newkey] = c.data[newkey];
                                }
                            }
                            this.rootRef.child(key).update(newschemaData);
                        }
                    }),
                };
                return c;
            }
        });
    }
    ;
    delete(key) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!key || key.includes(' ') || key.includes('\n'))
                throw new Error("Invalid key !");
            yield this.rootRef.child(key).set(null, null).then(() => {
                return true;
            }).catch((err) => {
                console.error(err);
                return null;
            });
        });
    }
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            let array = [];
            yield this.rootRef.once("value", (data) => __awaiter(this, void 0, void 0, function* () {
                array.push(data.val());
            }));
            return array;
        });
    }
    deleteAll() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.rootRef.set('/', null).then(() => {
                return true;
            }).catch((err) => {
                console.error(err);
                return null;
            });
        });
    }
    ;
};

module.exports =  {
    connection,
    Model,
}
//# sourceMappingURL=Moldels.js.map