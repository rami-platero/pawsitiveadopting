import Image from "next/image";

type Props = {
    image?: string | null;
    alt?: string;
    size?: number;
}

const Avatar = ({ image, alt = "Avatar", size = 40 }: Props) => {

    if (!image) {
        return <div className="bg-secondary rounded-full cursor-pointer" style={{ width: size, height: size }} />
    }

    return (
        <Image src={image} alt={alt} width={size} height={size} className="object-cover rounded-full cursor-pointer" style={{ width: size, height: size }} />
    )
}

export default Avatar