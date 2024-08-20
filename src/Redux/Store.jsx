import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducer from "./Slice/UserSlice";
import storage from "redux-persist/lib/storage";
import persistStore from "redux-persist/es/persistStore";
import persistReducer from "redux-persist/es/persistReducer";
import propertyReducer from "./Slice/PropertySlice";
import filterRaducer from './Slice/FilterSlice'


export const rootReducer = combineReducers({
    user:UserReducer,
    properties:propertyReducer,
    filters:filterRaducer,
})

const persistConfig = {
    key:'root',
    storage,
    version:1,
}

const persisteReducer = persistReducer(persistConfig,rootReducer)

export const store = configureStore({
    reducer:persisteReducer,
    middleware:(getDefaultMiddleware)=>{
        return getDefaultMiddleware({serializableCheck:false})
    }
})

export const persistor = persistStore(store)