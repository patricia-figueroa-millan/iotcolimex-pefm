import { useRouter } from "next/router"

export default function Dashboard(){
    const router = useRouter();
    router.push("/dashboard/account");

    return (
        <h1>Dashboard</h1>
    )
}