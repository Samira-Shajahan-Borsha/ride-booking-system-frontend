import ChangePasswordForm from '@/components/modules/authentication/ChangePasswordForm'

const ChangePassword = () => {
    return (
        <div className="flex min-h-[680px] flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-lg flex-col gap-6">
                <ChangePasswordForm />
            </div>
        </div>
    )
}

export default ChangePassword