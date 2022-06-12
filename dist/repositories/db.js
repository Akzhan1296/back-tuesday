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
exports.runDb = exports.commentsCollection = exports.usersCollection = exports.bloggersCollection = exports.postsCollection = void 0;
const settings_1 = require("../settings");
const { MongoClient, ServerApiVersion } = require('mongodb');
const client = new MongoClient(settings_1.settings.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
exports.postsCollection = client.db('lesson0402').collection('posts');
exports.bloggersCollection = client.db('lesson0402').collection('bloggers');
exports.usersCollection = client.db('lesson0402').collection('users');
exports.commentsCollection = client.db('lesson0402').collection('comments');
function runDb() {
    return __awaiter(this, void 0, void 0, function* () {
        client.connect((err) => __awaiter(this, void 0, void 0, function* () {
            try {
                // Connect the client to the server
                yield client.connect();
                console.log("Connected successfully to mongo server");
            }
            catch (_a) {
                console.log(err);
                console.log("Can't connect to db");
                // Ensures that the client will close when you finish/error
                yield client.close();
            }
        }));
    });
}
exports.runDb = runDb;
//# sourceMappingURL=db.js.map