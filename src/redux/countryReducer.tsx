import MovieCatalogServices from "../services/MovieCatalogServices";

const initialState: any = []
export default function countryReducer(state = initialState, action: any) {
    switch (action.type) {
        case 'countries/countriesLoaded': {
            return action.payload
        }

        default:
            return state
    }
}

export const fetchCountries = (keyword?: any) => async (dispatch: any) => {
    const response = await MovieCatalogServices.getCounties(keyword)
    dispatch({ type: 'countries/countriesLoaded', payload: response.data })
}
