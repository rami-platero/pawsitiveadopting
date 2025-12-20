import Image from "next/image";

type Props = {
    image?: string | null;
}

const Avatar = ({ image }: Props) => {

    if (!image) {
        return <div className="w-10 h-10 bg-secondary rounded-full cursor-pointer" />
    }

    return (
        <Image src={image} alt="Avatar" width={40} height={40} className="object-cover rounded-full cursor-pointer" />
    )
}

export default Avatar