import TripType from '@/types/Models/Trip'
import axios from '@/lib/axios'
import CreateTripPayload from '@/types/Payloads/CreateTripPayload'

export default class Trip
{
  public static path: string = '/api/user/trips'

  public static async index(): Promise<TripType[]>
  {
    return axios.get<TripType[]>(`${Trip.path}`)
      .then((res) => res.data)
  }

  public static async create(payload: CreateTripPayload): Promise<TripType>
  {
    return axios.post<TripType>(`${Trip.path}`, payload)
      .then((res) => res.data)
  }
}