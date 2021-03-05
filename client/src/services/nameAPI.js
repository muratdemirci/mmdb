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
				`Something went wrong fetching the person's details: ${err}`,
		);
		throw err;
	}
}


export const getPersonCombinedCredits = async (nameId) => {
	try {
		const response = await axios.get(
			`${BASE_URL_PATH}/person/${nameId}/combined_credits?api_key=${API_KEY}&language=en-US`,
		);
		console.log(response.data);
		return response.data;	
	} catch (err) {
		console.error(
				`Something went wrong fetching the person's movie credits: ${err}`,
		);
		throw err;
	}
}

export const getSocialMediaAccounts = async (nameId) => {
	try {
		const response = await axios.get(
			`${BASE_URL_PATH}/person/${nameId}/external_ids?api_key=${API_KEY}&language=en-US`,
		);
		console.log(response.data);
		return response.data;	
	} catch (err) {
		console.error(
				`Something went wrong fetching the person's social media accounts: ${err}`,
		);
		throw err;
	}
}

export const getPersonTaggedImages = async (nameId) => {
	try {
		const response = await axios.get(
			`${BASE_URL_PATH}/person/${nameId}/tagged_images?api_key=${API_KEY}&language=en-US`,
		);
		console.log(response.data);
		return response.data;	
	} catch (err) {
		console.error(
				`Something went wrong fetching the person's tagged images: ${err}`,
		);
		throw err;
	}
}
