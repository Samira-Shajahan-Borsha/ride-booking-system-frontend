import ProfileForm from "@/components/modules/common/ProfileForm"
import VehicleForm from "@/components/modules/common/VehicleForm";
import { role } from "@/constants/role";
import { useUserInfoQuery } from "@/redux/features/auth/auth.Api";
import type { User } from "@/types";

const EditProfile = () => {
    const { data: userData } = useUserInfoQuery(null);
    const userRole = userData?.data?.role;

    return (
        <div className="flex min-h-[680px] flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-lg flex-col gap-6">
                <ProfileForm user={userData?.data as User} />
                {userRole === role.driver && <VehicleForm />}
            </div>
        </div>
    )
}

export default EditProfile