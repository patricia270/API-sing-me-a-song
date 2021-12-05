/* eslint-disable no-useless-escape */
import Joi from 'joi';

const recommendationSchema = Joi.object({
    name: Joi.string().regex(/^([a-z]|[à-ü])/i).required(),
    youtubeLink: Joi.string().regex(/^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/).required(),
});

export {
    recommendationSchema,
};
