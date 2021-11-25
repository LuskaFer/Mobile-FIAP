const connection = require('../database/connection');

module.exports = {
    async index(request, response){
        const { page = 1} = request.query;

        const [count] = await connection('donates').count();

        const donates = await connection('donates').join('ongs', 'ongs.id', '=', 'donates.ong_id')
        .limit(5).offset((page - 1)* 5).select(['donates.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp',
         'ongs.city', 'ongs.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(donates);
    },

    async create(request, response){
        


        const { title, description, value} = request.body;
        const ong_id = request.headers.authorization;

       const [id] = await connection('donates').insert({
            title,
            description,
            value,
            ong_id,
        });
        return response.json({ id });
    },
    async delete(request, response){
        const  { id }  = request.params;
        const ong_id = request.headers. authorization;

        const donate = await connection('donates').where('id', id).select('ong_id').first();

        if(donate.ong_id != ong_id){
            return response.status(401).json({error: 'Operation not permitted.'});
        }
        await connection('donates').where('id', id).delete();

        return response.status(204).send();

    }

};