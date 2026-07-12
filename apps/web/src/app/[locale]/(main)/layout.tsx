import Footer from "@/shared/components/footer/Footer"
import FooterSkeleton from "@/shared/components/footer/FooterSkeleton"
import Breadcrumb from "@/shared/components/breadcrumb"
import Container from "@/shared/components/Container"
import { BreadcrumbLabelProvider } from "@/shared/context/breadcrumb-label-context"
import { Suspense } from "react"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <BreadcrumbLabelProvider>
            <main>
                <Suspense fallback={null}>
                    <Container>
                        <Breadcrumb />
                    </Container>
                </Suspense>
                {children}
            </main>
            <Suspense fallback={<FooterSkeleton />}>
                <Footer />
            </Suspense>
        </BreadcrumbLabelProvider>
    )
}

export default MainLayout