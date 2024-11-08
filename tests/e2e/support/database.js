const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017/'
const client = new MongoClient(uri)

/**
 * Conecta ao banco de dados MongoDB.
 * 
 * @returns {Promise<Db>} - Retorna uma promessa que resolve para a instância do banco de dados.
 * @throws {Error} - Lança um erro se não for possível conectar ao banco de dados.
 */
export async function connectToDatabase() {
    try {
        const timeout = 10000 // Tempo limite de 10 segundos para a conexão
        const connectPromise = client.connect()
        const timeoutPromise = new Promise((_, reject) =>
            setTimeout(() => reject(new Error('Tempo limite de conexão excedido')), timeout)
        );

        await Promise.race([connectPromise, timeoutPromise])

        return client.db('mongodb') // Substitua pelo nome do seu banco de dados
    } catch (error) {
        throw new Error('Não foi possível conectar ao banco de dados. Verifique se o MongoDB está em execução.')
    }
}
