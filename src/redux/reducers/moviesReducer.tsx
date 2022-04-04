import MovieCatalogServices from "../../services/MovieCatalogServices";

const initialState: any = []
export default function moviesReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'movies/moviesLoaded': {
            return action.payload

        }
        case 'movies/addMovie': {
            return [...state, action.payload]

        }
        case 'movies/editMovie': {
            const movieForEdit = state.find((movie: any) => {
               return movie.uuid === action.payload.uuid
            })
            const index = state.indexOf(movieForEdit)
            state[index] = action.payload
            return [
                ...state,
            ];
        }

        default:
            return state
    }
}

export const fetchMovies = async (dispatch: any, getState: any) => {
    const response = await MovieCatalogServices.getAll()
    dispatch({ type: 'movies/moviesLoaded', payload: response.data })
}

export const addMovie = (data: any) => async (dispatch: any) => {
    const response = await MovieCatalogServices.create(data)
    dispatch({ type: 'movies/addMovie', payload: response.data })
}

export const editMovie = (uuid: string, data: any) => async (dispatch: any) => {
    const response = await MovieCatalogServices.update(uuid, data)
    dispatch({ type: 'movies/editMovie', payload: response.data })
}

