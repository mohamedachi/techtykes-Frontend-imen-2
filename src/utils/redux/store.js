import thunk from "redux-thunk";
import { createStore , applyMiddleware, combineReducers } from "redux";

import userReducer from './user/userReducer'; 
import planReducer from './plan/planReducer';
import instanceReducer from './instance/instanceReducer';
import paymentReducer from './payment/paymentReducer';
import conversationReducer from "./conversation/conversationReducer";

const rootReducer = combineReducers({
    instance: instanceReducer,
    user: userReducer,
    plan: planReducer,
    payment: paymentReducer,
    conversation: conversationReducer
})

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store