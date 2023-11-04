import { createContext, useEffect, useState } from "react";
import { IProfile } from "../auth/interfaces/ProfileInterface";
import AuthEndPoints from "../auth/endpoints";

interface Context {
    children: JSX.Element | JSX.Element[]
}
export const UserContext = createContext({
    user: {} as IProfile,
    setUser: (user: IProfile) => { }
});


export const UserProvider = (
    { children }: any
) => {
    const [user, setUser] = useState<IProfile>({
        email: '',
        fullName: '',
        followers: [],
        following: [],
        id: '',
    });

    useEffect(() => {
        const getProfile = async () => {
            try {
                const response = await AuthEndPoints.getProfile();
                setUser(response);
            } catch (error) {
                console.error(error);
            }
        }

        getProfile();
    }, [])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}
