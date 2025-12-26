import Footer from "@/shared/components/footer/Footer"

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <main>{children}</main>
            <Footer />
        </>
    )
}

export default MainLayout