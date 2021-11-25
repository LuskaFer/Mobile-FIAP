const express = require('express');

const { celebrate, Segments, Joi  } = require('celebrate');

const OngController = require('./controllers/OngController');
const DonateController = require('./controllers/DonateController');
const ProfileController = require('./controllers/ProfileController');

  const SessionController = require('./controllers/SessionController');

const routes = express.Router();

     routes.post('/sessions', celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),  
      })
     }), SessionController.create);

routes.get('/ongs', OngController.index);

routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(14),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),

    })
}), OngController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),   
}), ProfileController.index);

routes.get('/donates', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })

}), DonateController.index);

routes.post('/donates', celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),   

    [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
    })
}), DonateController.create);


routes.delete('/donates/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),

  })
}),DonateController.delete);


module.exports = routes;