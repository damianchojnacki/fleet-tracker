import Link from 'next/link'

export default function Footer() {
  return (
    <div className="mt-auto bg-primary z-30 p-4 text-white font-medium flex flex-row text-center justify-center items-center min-w-full">
      <p>© Fleet Tracker 2024. The source code is available on&nbsp;
        <Link href="https://github.com/shadcn-ui/ui" className="underline">
          GitHub
        </Link>
        .</p>
    </div>
  )
}
