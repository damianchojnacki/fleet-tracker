export default interface CreateTripPayload
{
    car_id: number
    from: string | null
    to: string | null
    note: string | null
    distance?: number
    starts_at: string
}
