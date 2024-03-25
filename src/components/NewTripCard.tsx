import * as React from 'react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { DatePickerDemo } from '@/components/DatePicker'
import Link from 'next/link'
import Trip from '@/lib/api/Trip'
import { useState } from 'react'
import { useCar } from '@/hooks/useCar'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/router'

export function NewTripCard() {
  const { car } = useCar()

  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [note, setNote] = useState('')
  const [startsAt, setStartsAt] = useState<Date>(new Date())

  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!car) {
      return
    }

    try {
      await Trip.create({
        car_id: car.id,
        from,
        to,
        note,
        starts_at: startsAt.toISOString(),
      })

      router.push('/trips')
    } catch (error) {
      if (error.response?.data?.message) {
        toast({
          variant: 'destructive',
          title: 'Uh oh! Something went wrong.',
          description: error.response.data.message,
        })

        return
      }

      throw error
    }
  }

  return (
    <Card className="mt-4 text-primary-foreground border-secondary">
      <form onSubmit={handleSubmit}>
        <CardHeader>
          <CardTitle><span className="text-lg">Add new trip</span></CardTitle>
          <CardDescription><span className="text-base">You can add an information about new trip here.</span></CardDescription>
        </CardHeader>
        <CardContent className="text-sm">
          <div className="grid grid-cols-5 gap-4">
            <div className="col-span-2 md:col-span-1 grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5 font-semibold">
                <p>Date of trip</p>
              </div>
              <div className="flex flex-col space-y-1.5 font-semibold">
                <p>Origin</p>
              </div>
              <div className="flex flex-col space-y-1.5 font-semibold">
                <p>Destination</p>
              </div>
              <div className="flex flex-col space-y-1.5 font-semibold">
                <p>Purpose of the trip</p>
              </div>
            </div>

            <div className="col-span-3 md:col-span-4 grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <DatePickerDemo date={startsAt} setDate={setStartsAt} />
              </div>
              <div className="flex flex-col space-y-1.5 ">
                <Input id="from" placeholder="Point of origin" name="from" className="border-secondary" onChange={(e) => setFrom(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5 ">
                <Input id="to" placeholder="Destination" className="border-secondary" name="to" onChange={(e) => setTo(e.target.value)} />
              </div>
              <div className="flex flex-col space-y-1.5 ">
                <Input id="note" placeholder="Purpose of the trip" className="border-secondary" name="note" onChange={(e) => setNote(e.target.value)} />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button variant="secondary" className="text-sm font-semibold" type="button">
            <Link href="/trips">Back</Link>
          </Button>
          <Button className="text-sm font-semibold">Save changes</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
