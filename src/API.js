import axios from 'axios';

export default {
	// Fetch a sofa
	fetchSofa: (param) => {
    let payload = {
      viewedSofas: param
    }

		return axios({
      url: '/api/sofas/get-unique',
      method: 'POST',
      data: payload
    });
	},
};