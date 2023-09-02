import Head from 'next/head'

const GuestLayout = ({ children }) => {
    return (
        <div>
            <Head>
                <title>Laravel</title>
            </Head>

            <div className="font-sans text-gray-900 antialiased min-h-screen flex flex-grow">
                {children}
            </div>
        </div>
    )
}

export default GuestLayout
