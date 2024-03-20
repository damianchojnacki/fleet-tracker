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
import { DatePickerDemo } from './DatePicker'
import Link from 'next/link'

export function NewTripCard() {
  return (
    <Card className="mt-4 text-primary border-secondary">
      <form>
        <CardHeader>
          <CardTitle><span className="text-lg">Add new trip</span></CardTitle>
          <CardDescription><span className="text-base text-primary">You can add an information about new trip here.</span></CardDescription>
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
                <DatePickerDemo />
              </div>
              <div className="flex flex-col space-y-1.5 ">
                <Input id="from" placeholder="Point of origin" name="from" className="border-secondary" />
              </div>
              <div className="flex flex-col space-y-1.5 ">
                <Input id="to" placeholder="Destination" className="border-secondary" name="to" />
              </div>
              <div className="flex flex-col space-y-1.5 ">
                <Input id="note" placeholder="Purpose of the trip" className="border-secondary" name="note" />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button className="bg-secondary hover:bg-[#FFB909]/[0.8] text-primary text-sm font-semibold">
            <Link href="/trips">Back</Link>
          </Button>
          <Button className="bg-primary hover:bg-[#1B4865]/[0.8] text-white text-sm font-semibold">Save changes</Button>
        </CardFooter>
      </form>
    </Card>
  )
}
