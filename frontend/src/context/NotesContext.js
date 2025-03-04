import { createContext, useReducer } from 'react';

// Başlangıç durumu
const initialState = {
    notes: [],
};

// Reducer fonksiyonu
const notesReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NOTES':
            return { notes: action.payload };
        case 'CREATE_NOTE':
            return { notes: [action.payload, ...state.notes] };
        case 'DELETE_NOTE':
            return { notes: state.notes.filter((note) => note._id !== action.payload) };
        default:
            return state;
    }
};

// Context oluşturma
export const NotesContext = createContext();

// Provider bileşeni
export const NotesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(notesReducer, initialState);

    return (
        <NotesContext.Provider value={{ ...state, dispatch }}>
            {children}
        </NotesContext.Provider>
    );
};