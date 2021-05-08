import * as ActionTypes from './actionsType';

export const userinfo = (userinfo) => {
	return{
		type: ActionTypes.USER_ADD_INFO,
		payload: userinfo
	}
};