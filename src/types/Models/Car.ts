import Brand from '@/types/Models/Brand'

export default interface Car
{
    id: number
    brand_id: number
    plate_number: string | null
    vin: string | null
    is_active: boolean
    specs: {
        model?: string | null
        year?: number | null
        color?: string | null
        transmission?: string | null
        fuel_type?: string | null
        drive?: string | null
        fuel_consumption?: number | null
    }
    brand: Brand | null
}
