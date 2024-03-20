import React, { useMemo } from 'react'
import Link from 'next/link'
import { useCar } from '@/hooks/useCar'
import { useRouter } from 'next/router'
import Car from '@/lib/api/Car'

const CurrentVehicleInfo = ({ car }) => {
  return (
    <div className="ml-4">
      <h2 className="text-base md:text-lg text-white md:text-primary font-semibold
          my-3"
      >Current vehicle</h2>
      <p className="text-sm md:text-base text-white md:text-primary my-1">Make: {car?.brand?.name}</p>
      <p className="text-sm md:text-base text-white md:text-primary my-1">Model: {car.specs.model}</p>
      <p className="text-sm md:text-base text-white md:text-primary my-1">Registration: {car.plate_number}</p>
      <p className="text-sm md:text-base text-white md:text-primary my-1">Odometer: {car.mileage.toLocaleString()} km</p>
    </div>
  )
}

const CurrentVehicleCard = () => {
  const { car } = useCar()

  const router = useRouter()
  const url = router.pathname

  const carImageUrl = useMemo(() => {
    return car ? Car.imageUrl(car) : null
  }, [car])

  if (!car) {
    return <div className='m-5'>No car selected</div>
  }

  return (
    <div className="w-full flex items-center justify-between">
      <div className="w-full flex items-center">
        <div className="w-full md:w-auto bg-[#0f1729] p-2 rounded-lg flex flex-row justify-between md:justify-start items-center pr-0 overflow-hidden">
          {carImageUrl ? (
            <img src={carImageUrl} alt="Vehicle" className="h-auto w-40 md:w-80 object-cover rounded-lg mr-0" />
          ) : null}
          <div className='flex md:hidden'><CurrentVehicleInfo car={car} /></div>
          <Link href="./vehicles" className={`fill-black rounded-full bg-white transform translate-x-1/2 p-1 pr-4 ${url === '/vehicles' ? 'invisible' : ''}`}>
            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" /></svg>
          </Link>
        </div>
        <div className='hidden md:flex'><CurrentVehicleInfo car={car} /></div>
      </div>
    </div>
  )
}

export default CurrentVehicleCard
