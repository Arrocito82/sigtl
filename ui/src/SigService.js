import axios from 'axios';
const API_URL = 'http://127.0.0.1:8000';

export default class SigService{
	
	constructor(){}
	
	getMsg() {
		const url = `${API_URL}/`;
		return axios.get(url).then(response => response.data);
	}  
	
}