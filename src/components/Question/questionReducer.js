export const initialState = {
    id: 0,
    question: '',
    variants: [],
    answer: '',
}

export const init = (initialState) => {
    return { ...initialState }
}

export function reducer(state, action) {
    switch (action.type) {
        case 'SET_ID':
            return { ...state, id: action.payload }
        case 'SET_QUESTION':
            return { ...state, question: action.payload }
        case 'SET_VARIANTS':
            return { ...state, variants: action.payload }
        case 'SET_ANSWER':
            return { ...state, answer: action.payload }
        default:
            return state
    }
}