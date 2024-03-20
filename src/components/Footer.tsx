import Link from 'next/link'

export default function Footer() {
  return (
    <div className="bg-[#0f1729] text-white font-medium flex flex-row text-center justify-center items-center fixed left-0 bottom-0 min-w-full h-16 md:h-12">
      <p>© Fleet Tracker 2024. The source code is available on&nbsp;
        <Link href="https://github.com/shadcn-ui/ui" className="underline">
          GitHub
        </Link>
        .</p>
    </div>
  )
}