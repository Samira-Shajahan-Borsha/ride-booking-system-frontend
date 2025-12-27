import ProfileForm from "@/components/modules/common/ProfileForm"
import { useUserInfoQuery } from "@/redux/features/auth/auth.Api";
import type { User } from "@/types";

const EditProfile = () => {
    const { data: userData } = useUserInfoQuery(null);

    return (
        <div className="flex min-h-[680px] flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-lg flex-col gap-6">
                <ProfileForm user={userData?.data as User} />
            </div>
        </div>
    )
}

export default EditProfile