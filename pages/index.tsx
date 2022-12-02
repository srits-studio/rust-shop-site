import { mapValues } from "lodash";
import { User } from '../types';
import Link from 'next/link';
import Image from 'next/image';
import { GetServerSideProps } from "next";
import axios from "axios";
import Navbar from "../components/nav";
import Hero from "../components/hero"

function prepareForSerialization(obj: object) {
    return mapValues(obj, (value: any) =>
        typeof value === "undefined" ? null : value
    )
}

export default function Home(props: { user: User }) {
    const { user } = props
    if (!user) return (
        <div>
            <Navbar />
            <Hero />
        </div>
    )
    return (
        <div>
            <Navbar user={user} />
            <Hero />
        </div>
    )
}

//@ts-ignore
export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const user = await axios.get("http://localhost:3000/api/user", { headers: { "authorization": ctx.req.cookies["user"] } }).catch(() => null);

    return prepareForSerialization({
        props: {
            user: user?.data ?? null
        },
    })
}
