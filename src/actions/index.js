import axios from "axios"


export const toggleCreateMenuPage = () => {
    return {
        type: "TOGGLE_CREATE_MENU_PAGE",
    }
}

export const toggleCreateDishPage = () => {
    return {
        type: "TOGGLE_CREATE_DISH_PAGE"
    }
}


export const getMenuDataFromDB = (userId) => async dispatch => {
    let menuData
    try {
        menuData = await axios.get(`http://localhost:4000/api/menu/${userId}`)
    } catch (error) {
        return dispatch({
            type: "SET_FEEDBACK",
            payload: {
                hasError: true,
                message: error.response ? error.response.message.data : "Something is wrong please try it again later"
            }
        })
    }
    dispatch({
        type: "GET_MENU_DATA",
        payload: menuData.data.menus
    })
}

export const getDishDataFromDB = (userId) => async dispatch => {
    let dishData
    try {
        dishData = await axios.get(`http://localhost:4000/api/dish/${userId}`)
    } catch (error) {
        return dispatch({
            type: "SET_FEEDBACK",
            payload: {
                hasError: true,
                message: error.response ? error.response.message.data : "Something is wrong please try it again later"
            }
        })
    }
    dispatch({
        type: "GET_DISH_DATA",
        payload: dishData.data.dishes
    })
}

export const getDishCategoryFromDB = (menuId) => async dispatch => {
    let dishCategoryData
    try {
        dishCategoryData = await axios.get(`http://localhost:4000/api/dishCategory/${menuId}`)
    } catch (error) {
        return dispatch({
            type: "SET_FEEDBACK",
            payload: {
                hasError: true,
                message: error.response ? error.response.message.data : "Something is wrong please try it again later"
            }
        })
    }
    dispatch({
        type: "GET_DISH_CATEGORY_DATA",
        payload: dishCategoryData.data.dishCategories
    })
}



export const userLogin = (email, password) => async (dispatch, getState) => {
    console.log(email)
    console.log(password)
    let res
    try {
        res = await axios.post("http://localhost:4000/api/user/login", { email: email, password: password })
    } catch (error) {
        return dispatch({
            type: "SET_FEEDBACK",
            payload: {
                hasError: true,
                message: error.response ? error.response.message.data : "Something is wrong please try it again later"
            }
        })

    }
    console.log(res.data)
    const userId = res.data.userId
    if (userId) {
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('userId', res.data.userId)
        console.log("login success")
        dispatch({
            type: "USER_LOGIN",
            payload: userId
        })
    }
}

export const userLogOut = () => {
    localStorage.clear()
    return {
        type: "USER_LOGOUT"
    }
}


export const setFeedback = (hasError, message) => {
    console.log(123)
    return {
        type: "SET_FEEDBACK",
        payload: {
            hasError: hasError,
            message: message
        }
    }
}

export const resetFeedback = () => {
    return {
        type: "RESET_FEEDBACK"
    }
}