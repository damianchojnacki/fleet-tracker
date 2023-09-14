import { useCar } from '@/hooks/useCar'
import { Skeleton } from '@/components/ui/skeleton'
import Image from 'next/image'
import Car from '@/lib/api/Car'
import { useState } from 'react'
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog'

const CarSection = () => {
    const { car } = useCar()
    const [isImageLoaded, setIsImageLoaded] = useState(false)

    return (
        <div className="p-6 border-b flex gap-3">
            <div className="w-1/2">
                <div className="flex justify-center items-center capitalize text-lg gap-1">
                    <div className="font-bold">{car?.brand?.name ?? <Skeleton className="w-32 h-4 rounded-full ml-1" />}</div>
                    <div>{car?.specs.model}</div>

                    <Dialog>
                        <DialogTrigger className="text-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z" clipRule="evenodd" />
                            </svg>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogTitle>
                                <div className="flex justify-center items-center capitalize text-lg gap-1">
                                    <div className="font-bold">{car?.brand?.name ?? <Skeleton className="w-32 h-4 rounded-full ml-1" />}</div>
                                </div>
                            </DialogTitle>

                            <div>
                                {Object.entries(car?.specs ?? {}).map(([key, value]) => (
                                    <div key={key} className="flex justify-between items-center border-b py-2 last:border-0">
                                        <div className="capitalize">{key.replace('_', ' ')}</div>
                                        <div>{value}</div>
                                    </div>
                                ))}
                            </div>
                        </DialogContent>
                    </Dialog>
                </div>

                <div className="text-center">
                    {Object.entries(car?.specs ?? {}).filter(([key]) => !['model', 'fuel_consumption'].includes(key)).map(([key, value], index, all) => (
                        <>
                            <span className="capitalize" key={key}>{value}</span>
                            {index >= all.length - 1 ? null : <span className="mx-1">/</span>}
                        </>
                    ))}
                </div>

                <div className="mt-8 min-h-[250px]">
                    {!isImageLoaded ? (
                        <Skeleton className="absolute w-[400px] h-[200px] rounded-xl" />
                    ): null}

                    {car?.specs.model ? (
                        <Image
                            src={Car.imageUrl(car)}
                            alt="car image"
                            width={400}
                            height={400}
                            onLoad={() => setIsImageLoaded(true)}
                            className="w-auto h-auto"
                            priority
                        />
                    ) : null}
                </div>
            </div>
        </div>
    )
}

export default CarSection
