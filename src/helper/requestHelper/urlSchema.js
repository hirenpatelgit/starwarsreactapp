const BASE_URL = {
    URL: process.env.NODE_ENV === 'production' ? 'https://swapi.co/api/' : 'https://swapi.co/api/'
}


const PEOPLE = {
    PEOPLE_URL:"people"
}
const PLANET = {
    PLANET_URL:"planets"
}
export {
    BASE_URL,
    PEOPLE,
    PLANET
}