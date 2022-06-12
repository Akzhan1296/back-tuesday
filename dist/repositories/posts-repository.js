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
exports.postsRepository = void 0;
let posts = [{
        id: +(new Date()),
        title: '',
        shortDescription: 'dasda',
        content: 'dsadsa',
        bloggerId: 123,
        bloggerName: "string"
    }];
exports.postsRepository = {
    getPosts: () => __awaiter(void 0, void 0, void 0, function* () {
        return posts;
    }),
    getPostById: (id) => __awaiter(void 0, void 0, void 0, function* () {
        let foundPost = posts.find(b => b.id === id);
        if (foundPost) {
            return foundPost;
        }
        else {
            return null;
        }
    }),
    createPost: (newPost) => __awaiter(void 0, void 0, void 0, function* () {
        posts.push(newPost);
        return newPost;
    }),
    updatePost: (id, updatedPost) => __awaiter(void 0, void 0, void 0, function* () {
        posts = [...posts.filter(b => b.id !== id), updatedPost];
        return posts;
    }),
    deletePost: (id) => {
        const found = posts.find(b => b.id === id);
        if (found) {
            let filteredPosts = posts.filter(b => b.id !== id);
            posts = filteredPosts;
            return filteredPosts;
        }
        else {
            return null;
        }
    }
};
//# sourceMappingURL=posts-repository.js.map