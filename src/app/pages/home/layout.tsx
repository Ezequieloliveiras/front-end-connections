import Sidebar from "@/app/components/Slidebar/Sliderbar"

export default function HomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Sidebar />
            {children}
        </>
    )
}