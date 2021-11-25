const express = require('express');

const { celebrate, Segments, Joi  } = require('celebrate');

const UserController = require('./controllers/UserController');
const DeviceController = require('./controllers/DeviceController');
const ProfileController = require('./controllers/ProfileController');

  const SessionController = require('./controllers/SessionController');

const routes = express.Router();

     routes.post('/sessions', celebrate({
      [Segments.BODY]: Joi.object().keys({
        id: Joi.string().required(),  
      })
     }), SessionController.create);

routes.get('/users', UserController.index);

routes.post('/users', celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(10).max(14),
      city: Joi.string().required(),
      uf: Joi.string().required().length(2),

    })
}), UserController.create);

routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),   
}), ProfileController.index);

routes.get('/devices', celebrate({
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number(),
  })

}), DeviceController.index);

routes.post('/devices', celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),   

    [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    value: Joi.number().required(),
    })
}), DeviceController.create);


routes.delete('/devices/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),

  })
}),DeviceController.delete);


module.exports = routes;