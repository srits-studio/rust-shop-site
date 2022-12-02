import { FunctionComponent } from "react";
import { User } from "../types";
import { Navbar, Dropdown, Avatar } from "flowbite-react";
import Link from "next/link";

const main: FunctionComponent<{ user?: User }> = (props: { user?: User }) => {
    const { user } = props;
    return (
        <Navbar className="!bg-gray-800 !px-64 fixed z-20 w-full top-0 left-0"
            fluid={true}
            rounded={true}
        >
            <Navbar.Brand>
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="хуй"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    cock in
                </span>
            </Navbar.Brand>
            {user ? <div className="flex md:order-2">
                <Dropdown
                    arrowIcon={false}
                    inline={true}
                    label={<Avatar className="!rounded-lg" alt="User settings" img={user.avatar.medium} />}
                >
                    <Dropdown.Header>
                        <span className="block text-sm">
                            <Link className="flex md:order-2" href={user.profile}> {user.username} </Link>
                        </span>
                    </Dropdown.Header>
                    <Dropdown.Item>
                        Личный кабинет
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item>
                        Выйти
                    </Dropdown.Item>
                </Dropdown>
                <Navbar.Toggle />
            </div> : <Link className="flex md:order-2" href={"http://localhost:3000/api/auth"} >Авторизация блядь</Link>}
            < Navbar.Collapse >
                <Navbar.Link
                    className="!text-white hover:!text-gray-600"
                    href="/"
                    active={true}
                >
                    Главная
                </Navbar.Link>
                <Navbar.Link
                    className="!text-white hover:!text-gray-600"
                    href="/"
                >
                    Магазин
                </Navbar.Link>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default main;
