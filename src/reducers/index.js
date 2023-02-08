import { combineReducers } from 'redux'


const createMenuReducer = (state = { isOpen: false }, action) => {
    switch (action.type) {
        case "TOGGLE_CREATE_MENU_PAGE":
            return { ...state, isOpen: !state.isOpen }

        default:
            return state
    }
}

const popUpReducer = (state = { createMenuIsOpen: false, createDishIsOpen: false }, action) => {
    switch (action.type) {
        case "TOGGLE_CREATE_MENU_PAGE":
            return { ...state, createMenuIsOpen: !state.createMenuIsOpen }

        case "TOGGLE_CREATE_DISH_PAGE":
            return { ...state, createDishIsOpen: !state.createDishIsOpen }
        default:
            return state
    }
}


const menuReducer = (state = { menuData: [] }, action) => {
    switch (action.type) {
        case "GET_MENU_DATA":
            return { ...state, menuData: action.payload }
        default:
            return state
    }
}

const dishCategoryReducer = (state = { dishCategoryData: [] }, action) => {
    switch (action.type) {
        case "GET_DISH_CATEGORY_DATA":
            return { ...state, dishCategoryData: action.payload }
        // case "UPDATE_DISH_CATEGORY_DATA":
        //     return { ...state, dishCategoryData: action.payload }
        default:
            return state
    }
}

const userReducer = (state = { isLogin: false, userId: null }, action) => {
    switch (action.type) {
        case "USER_LOGIN":
            return { ...state, userId: action.payload, isLogin: true }
        case "USER_LOGOUT":
            return { ...state, isLogin: false }
        default:
            return state
    }
}

const dishReducer = (state = { dishData: [] }, action) => {
    switch (action.type) {
        case "GET_DISH_DATA":
            return { ...state, dishData: action.payload }
        default:
            return state
    }
}

const feedbackReducer = (state = { trigger: false, hasError: false, message: "" }, action) => {
    switch (action.type) {
        case "SET_FEEDBACK":
            return { ...state, trigger: true, hasError: action.payload.hasError, message: action.payload.message || "Something is wrong, please try again later" }
        case 'RESET_FEEDBACK':
            return { ...state, trigger: false, message: "" }
        default:
            return state
    }
}



export default combineReducers({
    createMenu: createMenuReducer,
    menu: menuReducer,
    user: userReducer,
    dish: dishReducer,
    dishCategory: dishCategoryReducer,
    popUp: popUpReducer,
    feedback: feedbackReducer
})