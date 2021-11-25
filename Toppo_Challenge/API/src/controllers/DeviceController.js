const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1} = request.query;

        const [count] = await connection('devices').count();

        const devices = await connection('devices').join('users', 'users.id', '=', 'devices.user_id')
        .limit(5).offset((page - 1)* 5).select(['devices.*', 'users.name', 'users.email', 'users.whatsapp',
         'users.city', 'users.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(devices);
    },

    async create(request, response){
        


        const { title, description, value} = request.body;
        const user_id = request.headers.authorization;

       const [id] = await connection('devices').insert({
            title,
            description,
            value,
            user_id,
        });
        return response.json({ id });
    },
    async delete(request, response){
        const  { id }  = request.params;
        const user_id = request.headers. authorization;

        const device = await connection('devices').where('id', id).select('user_id').first();

        if(device.user_id != user_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }
        await connection('devices').where('id', id).delete();

        return response.status(204).send();

    }

};