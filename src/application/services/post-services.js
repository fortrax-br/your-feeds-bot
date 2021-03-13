const PostUseCaseRepository = require("../../domain/use-cases/post-usecase-interface");
const { formatToString } = require("../../helpers/features_helpers");

class PostServices extends PostUseCaseRepository {
  constructor({ postRepository }) {
    this._postRepository = postRepository;

    Object.freeze(this);
  }

  async addPost({ title, chatId }) {
    const [ titleFormatted, chaIdFormatted ] = formatToString([ title, chatId ]);

    await this._postRepository.addPost({
      title: titleFormatted,
      chatId: chaIdFormatted });
  
    return;
  }

  async existsPost({ title, chatId }) {
    const [ titleFormatted, chaIdFormatted ] = formatToString([ title, chatId ]);

    const exists = await this._postRepository.existsPost({ 
      title: titleFormatted,
      chatId: chaIdFormatted });

    return exists;
  }

  async getPostsCount({ chatId }) {
    const [ chaIdFormatted ] = formatToString([ chatId ]);

    const count = await this._postRepository.getPostsCount({ chatId: chaIdFormatted });

    return count;
  }

  async dropAllPosts() {
    await this._postRepository.dropAllPosts();

    return;
  }
}

module.exports = PostServices;