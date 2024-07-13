const initialState = {
    loading: false,
    data: [],
    selectedCb: [],
    inputSearch: "", 
    pageCount: 0,
    editable: false,
    error: null}

const AdminReducer = (state = initialState, action) =>{
    switch(action.type){
        case 'FETCH_DATA_LOADING': 
        return {...state, loading: true, error: null}
        case  'FETCH_DATA_SUCCESS': 
        return {...state, loading: false, data: action.payload}
        case 'FETCH_DATA_FAILURE': 
        return {...state, loading: false, error: action.error}
        case 'SELECT_ITEMS': 
        return {...state, data: action.payload}
        case 'SEARCH_ITEMS': 
        return {...state, data: action.payload}
        case 'EDITABLE': 
        return {...state, data: action.payload}
    }
}
