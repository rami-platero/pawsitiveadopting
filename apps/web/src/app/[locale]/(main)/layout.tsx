import Footer from "@/shared/components/footer/Footer"
import FooterSkeleton from "@/shared/components/footer/FooterSkeleton"
import { Suspense } from "react"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main>{children}</main>
            <Suspense fallback={<FooterSkeleton />}>
                <Footer />
            </Suspense>
        </>
    )
}

export default MainLayout