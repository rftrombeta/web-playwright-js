const { faker } = require('@faker-js/faker');

/**
 * Gera um array de informações de pessoa usando o Faker.
 * 
 * @param {number} count - O número de entradas a serem geradas.
 * @returns {Array<Object>} - Um array de objetos contendo informações de pessoa.
 */
function generateFakePeople(count) {
    const people = []
    for (let i = 0; i < count; i++) {
        const person = {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            zipCode: faker.location.zipCode()
        }
        people.push(person)
    }
    return people
}
module.exports = { generateFakePeople };