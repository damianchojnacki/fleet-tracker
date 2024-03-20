import TripType from '@/types/Models/Trip'
import axios from '../axios'

export default class Trip
{
  public static path: string = '/api/user/trips'

  public static index(): Promise<TripType>
  {
    return axios.get<TripType>(`${Trip.path}`)
      .then((res) => res.data)
  }
}