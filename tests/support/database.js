import { MongoClient } from 'mongodb'

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
        await client.connect();
        return client.db('mongodb');
    } catch (error) {
        console.error('Erro ao conectar ao banco de dados:', error);
        throw new Error('Não foi possível conectar ao banco de dados. Verifique se o MongoDB está em execução.');
    }
}

/**
 * Insere os detalhes do produto no banco de dados MongoDB.
 * 
 * @param {string} firstName - O primeiro nome do usuário.
 * @param {string} lastName - O sobrenome do usuário.
 * @param {string} zipCode - O código postal do usuário.
 * @param {Array<Object>} overviewProducts - A lista de produtos e suas respectivas informações.
 * @returns {Promise<InsertOneWriteOpResult>} - Retorna uma promessa que resolve para o resultado da inserção.
 * @throws {Error} - Lança um erro se não for possível inserir os detalhes do produto.
 */
export async function insertProductDetailsInMongDb(firstName, lastName, zipCode, overviewProducts) {
    const db = await connectToDatabase();
    const collection = db.collection('orders'); // Substitua pelo nome da sua coleção
    return await collection.insertOne({
        firstName,
        lastName,
        zipCode,
        products: overviewProducts,
        date: new Date()
    })
}
