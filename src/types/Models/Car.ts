import Brand from '@/types/Models/Brand'

export default interface Car
{
    id: number
    brand_id: number
    is_active: boolean
    mileage: number | null
    specs: {
        model?: string | null
        plate_number?: string | null
        vin?: string | null
        year?: number | null
        color?: string | null
        transmission?: string | null
        fuel_type?: string | null
        drive?: string | null
        fuel_consumption?: number | null
    }
    brand: Brand | null
}
