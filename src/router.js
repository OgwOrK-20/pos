import { Route, Routes } from "react-router-dom";
// import "./App.scss";
import Menu from "./components/menu/Menu";
import "./App.scss"
import Home from "./components/home/Home";
import Dish from "./components/dish/Dish";
import Orders from "./components/orders/Orders";
import Analysis from "./components/analysis/Analysis";
import Settings from "./components/settings/Settings";
import MenuPage from "./components/menu/MenuPage";
import DishPage from "./components/dish/DishPage";

const router = <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="Menu" element={<Menu />}>
    </Route>
    <Route path="menu/:menuId" element={<MenuPage />}></Route>
    <Route path="dishes/:dishId" element={<DishPage></DishPage>}></Route>
    <Route path="dishes" element={<Dish />}>

    </Route>
    <Route path="home" element={<Home />}></Route>
    <Route path="orders" element={<Orders />}></Route>
    <Route path="analysis" element={<Analysis />}></Route>
    <Route path="settings" element={<Settings />}></Route>

</Routes >

export default router

