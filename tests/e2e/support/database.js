const { MongoClient } = require('mongodb')

const uri = 'mongodb://localhost:27017/'
const client = new MongoClient(uri)

export async function connectToDatabase() {
    try {
        if (!client.topology || !client.topology.isConnected()) {
            await client.connect()
        }
        return client.db('mongodb') // Substitua pelo nome do seu banco de dados
    } catch (error) {
        console.error('Falha ao conectar ao banco de dados:', error)
        throw new Error('Não foi possível conectar ao banco de dados')
    }
}
