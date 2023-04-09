import axios from 'axios'
import authHeader from './auth-header'
const API_URL = process.env.REACT_APP_BASE_URL

class UserService {
  async addCategory(name, subCategory) {
    const response = await axios.get(API_URL + `list`, {
      headers: authHeader()
    })
    return response
  }
}

export default new UserService()
