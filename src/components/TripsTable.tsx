import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useTrip } from '@/hooks/useTrip'

export default function TripsTable() {
  const { trips } = useTrip()

  return (
    <Table className="text-primary-foreground">
      <TableHeader>
        <TableRow>
          <TableHead className="hidden md:table-cell">№</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Car</TableHead>
          <TableHead>Route</TableHead>
          <TableHead className="hidden md:table-cell">Note</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {trips ? (trips.map((trip, i) => (
          <TableRow key={trip.id}>
            <TableCell className="hidden md:table-cell">{i + 1}</TableCell>
            <TableCell>{trip?.starts_at ? new Date(trip.starts_at).toLocaleDateString() : '-'}</TableCell>
            <TableCell className="capitalize">{`${trip.car.specs.plate_number} ${trip.car?.brand?.name} ${trip.car.specs.model}`}</TableCell>
            <TableCell>{`${trip.from} - ${trip.to}`}</TableCell>
            <TableCell className="hidden md:table-cell">{trip.note}</TableCell>
          </TableRow>
        ))) : null}
      </TableBody>
    </Table>
  )
}
