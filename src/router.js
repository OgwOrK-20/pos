import { Route, Routes } from "react-router-dom";
// import "./App.scss";
import Menu from "./routers/menu/Menu";
import "./App.scss"
import Home from "./routers/home/Home";
import Dish from "./routers/dish/Dish";
import Orders from "./routers/orders/Orders";
import Analysis from "./routers/analysis/Analysis";
import Settings from "./routers/settings/Settings";

const router = <Routes>
    <Route path="/" element={<Home />}></Route>
    <Route path="menu" element={<Menu />}></Route>
    <Route path="dishes" element={<Dish />}></Route>
    <Route path="home" element={<Home />}></Route>
    <Route path="orders" element={<Orders />}></Route>
    <Route path="analysis" element={<Analysis />}></Route>
    <Route path="settings" element={<Settings />}></Route>
</Routes >

export default router

