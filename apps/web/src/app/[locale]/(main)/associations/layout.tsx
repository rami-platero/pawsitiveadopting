import Breadcrumb from "@/shared/components/breadcrumb";
import Container from "@/shared/components/Container";

export default async function AssociationsLayout({ children }: { children: React.ReactNode }) {
    return (
        <Container>
            <Breadcrumb />
            {children}
        </Container>
    )
}
