import https from '../serviceHelper';

const getAll = () => {
    return https.get(`/movies`);
};

const create = (data: any) => {
    return https.post("/movies", data);
};

const update = (uuid: any, data: any) => {
    return https.put(`/movies/${uuid}`, data);
};

const remove = (id: any) => {
    return https.delete(`/movies/${id}`);
};

const getCounties= (keyword?: any) => {
    return https.get(`/countries?keyword=${keyword ? keyword : ''}`);
};


const MovieCatalogServices = {
    getAll,
    create,
    update,
    remove,
    getCounties
};

export default MovieCatalogServices;
