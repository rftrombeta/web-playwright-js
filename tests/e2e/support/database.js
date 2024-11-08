const { MongoClient } = require('mongodb')

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(uri)

export async function connectToDatabase() {
    if (!client.topology || !client.topology.isConnected()) {
        await client.connect()
    }
    return client.db('mongodb') // Substitua pelo nome do seu banco de dados
}
