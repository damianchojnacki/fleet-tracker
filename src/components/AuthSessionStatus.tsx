const AuthSessionStatus = ({ status, className, ...props }) => (
    <>
        {status && (
            <div
                className={`${className} font-medium text-sm text-green-600 mt-3`}
                {...props}
            >
                {status}
            </div>
        )}
    </>
)

export default AuthSessionStatus
