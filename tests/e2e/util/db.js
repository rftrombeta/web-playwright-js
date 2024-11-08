const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017' // Substitua pelo URI do seu MongoDB
const client = new MongoClient(uri)

export async function connectToDatabase() {
    if (!client.isConnected()) {
        await client.connect()
    }
    return client.db('test') // Substitua pelo nome do seu banco de dados
}
