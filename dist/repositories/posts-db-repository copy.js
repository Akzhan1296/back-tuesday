"use strict";
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
    getPosts: () => {
        return posts;
    },
    getPostById: (id) => {
        let foundPost = posts.find(b => b.id === id);
        if (foundPost) {
            return foundPost;
        }
        else {
            return false;
        }
    },
    createPost: (title, shortDescription, content, bloggerId) => {
        const newPost = {
            id: +(new Date()),
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName: "string"
        };
        posts.push(newPost);
        return newPost;
    },
    updatePost: (id, title, shortDescription, content, bloggerId) => {
        const updatedPost = {
            id,
            title,
            shortDescription,
            content,
            bloggerId,
            bloggerName: "string"
        };
        posts = [...posts.filter(b => b.id !== id), updatedPost];
        return posts;
    },
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
//# sourceMappingURL=posts-db-repository%20copy.js.map