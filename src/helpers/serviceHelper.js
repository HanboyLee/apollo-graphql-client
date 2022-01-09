import instance from '../services/pokemonApi';

const pokemonSearchUriAndParams = ({ mothod, pokemonIndex, pokemonName, range: { limit, offset } = {} }) => {
    try {
        const lowerMothod = mothod ? mothod.toLocaleLowerCase() : '';

        if (!lowerMothod) {
            throw new Error('請輸入正確參數，以便搜尋更多資料。');
        }
        switch (lowerMothod) {
            case 'name': {
                return instance.get(`/${pokemonName}`);
            }
            case 'index': {
                return instance.get(`/${pokemonIndex}`);
            }
            case 'range': {
                return instance.get(``, { params: { limit, offset } });
            }
            default:
                return instance.get('/1');
        }
    } catch (error) {
        return error.message;
    }
};

export default pokemonSearchUriAndParams;
