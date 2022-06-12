"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggersRepository = void 0;
// export let bloggers: BloggerItem[] = [{
//     id: 13,
//     name: '231',
//     youtubeUrl: 'https://www.youtube.com/watch?v=8sNkA53jAMU'
// }]
exports.bloggersRepository = {
    getBloggers: () => {
        return bloggers;
    },
    getBloggerById: (id) => {
        let findedBlogger = bloggers.find(b => b.id === id);
        if (findedBlogger) {
            return findedBlogger;
        }
        else {
            return null;
        }
    },
    createBlogger: (newBlogger) => {
        bloggers.push(newBlogger);
        return newBlogger;
    },
    updateBlogger: (id, name, youtubeUrl) => {
        const updatedBlogger = {
            id,
            name,
            youtubeUrl,
        };
        bloggers = [...bloggers.filter(b => b.id !== id), updatedBlogger];
        return updatedBlogger;
    },
    deleteBlogger: (id) => {
        const found = bloggers.find(b => b.id === id);
        if (found) {
            let newBlogger = bloggers.filter(b => b.id !== id);
            bloggers = newBlogger;
            return newBlogger;
        }
        else {
            return null;
        }
    },
};
//# sourceMappingURL=bloggers-repository.js.map