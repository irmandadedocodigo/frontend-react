"use client";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { IProfile } from "../auth/interfaces/ProfileInterface";
import AuthEndPoints from "../auth/endpoints";
import Cookies from "js-cookie";
import { UserContext } from "../context/UserContext";

const Navbar = () => {
    const pathname = usePathname()
    const useRoute = useRouter();
    if (pathname === '/auth/login' || pathname === '/auth/register') return;
    const [subMenu, setSubMenu] = useState<boolean>(false);
    const {
        user
    } = useContext(UserContext)

    const onChangeSubMenu = () => {
        setSubMenu(!subMenu);
    }

    const onLogout = () => {
        Cookies.remove('token');
        useRoute.push('/auth/login');
    }


    return (
        <>
            <div className="w-full h-14 bg-[--secondary] sticky top-0">
                <div className="container mx-auto px-4 h-full">
                    <div className="flex justify-between items-center h-full">
                        <ul className="flex gap-x-6 text-white">
                            <li>
                                <Link href="/">
                                    <p>Feed</p>
                                </Link>
                            </li>
                        </ul>

                        <div className="flex">
                            <div className="flex row items-center gap-3" onClick={onChangeSubMenu}>
                                <p className="text-white">{user.fullName}</p>
                                {
                                    subMenu ?
                                        <img src="/arrow-up.png" className="img-fluid w-5 h-5" />
                                        : <img src="/arrow-down.png" className="img-fluid w-5 h-5" />
                                }
                            </div>
                            {
                                subMenu &&
                                <div className="absolute top-14 p-5 bg-[--secondary] shadow-md rounded-t-md rounded-b-md">
                                    <ul className="flex flex-col gap-y-2">
                                        <li>
                                            <Link href="/user/profile">
                                                <p className="text-white">Profile</p>
                                            </Link>
                                        </li>
                                        <li>
                                            <button onClick={onLogout}>
                                                <p className="text-white">Logout</p>
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;