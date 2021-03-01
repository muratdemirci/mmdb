import axios from '../config/axios';
import {
	API_KEY,
	BASE_URL_PATH
} from '../config/config';

export const getPersonDetails = async (nameId) => {
	try {
		const response = await axios.get(
			`${BASE_URL_PATH}person/${nameId}?api_key=${API_KEY}&language=en-US`,
		);
		console.log(response.data);
		return response.data;	
	} catch (err) {
		console.error(
				`Something went wrong fetching the person details: ${err}`,
		);
		throw err;
	}
}
