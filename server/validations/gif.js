import Joi from '@hapi/joi';

const gif = {
  title: Joi.string()
    .trim()
    .required(),
  image: Joi.image().required(),
};

const paramsGifId = {
  gifId: Joi.number()
    .required()
    .greater(0)
    .integer(),
};

const storeSchema = Joi.object()
  .keys(gif);

const paramSchema = Joi.object()
  .keys({
    params: paramsGifId,
  });
const commentSchema = Joi.object()
  .keys({
    comment: Joi.string()
      .trim()
      .required(),
  });
const gifschema = {
  patch: {
    '/gifs/:gifId/': storeSchema,
  },
  '/gifs/': storeSchema,
  '/gifs/:gifId/': paramSchema,
  '/gifs/:gifId/comments/': commentSchema,
};

export default gifschema;