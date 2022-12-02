import { mapValues } from "lodash";
import { User } from '../types';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from "next";
import axios from "axios";

function prepareForSerialization(obj: object) {
    return mapValues(obj, (value: any) =>
        typeof value === "undefined" ? null : value
    )
}

export default function Home(props: { user: User }) {
    const { user } = props
    if (!user) return (
        <div>
            <Link href={"http://localhost:3000/api/auth"} >авторизация</Link>
        </div>
    )
    return (
        <div>
            <Link href={user.profile} >{user.username} ({user.steamid}) </Link>

            <Image src={user.avatar.small} alt={`${user.username}\`s avatar`} width={16} height={16}></Image>
        </div>
    )
}

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const user = await axios.get("http://localhost:3000/api/user", { headers: { "authorization": ctx.req.cookies["user"] } }).catch(() => null);

    console.log(user)

    return prepareForSerialization({
        props: {
            user: user?.data ?? null
        },
    })
}
