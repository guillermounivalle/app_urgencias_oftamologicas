import * as ActionTypes from '../actions/actionsType';

const initialState = {
	id: "",
	name:"pepe",
	lastname:"",
	email:"",
  speciality:"",
	active: false,
	admin: false
}

export const userinfo = (state = initialState, action) => {
	switch(action.type){
		case ActionTypes.USER_ADD_INFO:
			let user_add_info = {
				id: action.payload.id,
				name:action.payload.name,
				lastname:action.payload.lastname,
    			speciality:action.payload.speciality,
				active: action.payload.active,
				admin: action.payload.admin
			}
			return {
				...state,
				userinfo: user_add_info
				
			}
		default:
			return state;
	}
	
}