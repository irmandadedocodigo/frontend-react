"use client";
import Navbar from "@/app/components/NavBar";
import { UserContext } from "@/app/context/UserContext";
import CreatePostModal from "@/app/user/posts/components/CreatePostModal";
import { useContext, useEffect, useState } from "react";
import { IPost } from "../posts/interfaces/PostInterface";
import PostsEndPoints from "../posts/endpoints";
import PostCard from "../posts/components/PostCard";
import CreatePostDTO from "../posts/dtos/CreatePostDTO";


export default function Profile() {
    const [openModal, setOpenModal] = useState(false)
    const [posts, setPosts] = useState<IPost[]>([])
    const {
        user
    } = useContext(UserContext)


    const CreatePost = () => {
        setOpenModal(true)
    }

    const onSubmit = async (data: CreatePostDTO) => {
        try {
            await PostsEndPoints.CreatePost(data)
            const response = await PostsEndPoints.GetUserPosts()
            setPosts(response)
            setOpenModal(false)
        } catch (error) {
            console.error(error)
        }

    }

    useEffect(() => {
        const getPosts = async () => {
            const response = await PostsEndPoints.GetUserPosts()
            setPosts(response)
        }

        getPosts()
    }, [])

    if (!user) return (<div>Loading...</div>)
    return (
        <div>
            <Navbar />
            <div className="container mx-auto px-4 mt-5">
                <div className="flex justify-between h-20">
                    <div>
                        <h1 className="text-xl">{user.fullName}</h1>
                        <h2 className="text-gray-300">{user.email}</h2>
                    </div>
                    <div className="flex row gap-4">
                        <div className="flex row gap-2">
                            <p>Seguidores</p>
                            <p>{user.followers.length}</p>
                        </div>

                        <div className="flex row gap-2">
                            <p>Seguindo</p>
                            <p>{user.following.length}</p>
                        </div>
                    </div>
                </div>

                <div className="flex justify-between items-center mb-10">
                    <h3 className="text-3xl mt-5">Publicações Recentes</h3>
                    <div>
                        <button className="bg-[--secondary] text-white font-bold py-2 px-4 rounded" onClick={CreatePost}>
                            Nova Publicação
                        </button>
                    </div>
                </div>

                <div className="flex flex-col gap-5">
                    {posts.map((post, index) => (
                        <PostCard post={post} user={user} key={index} />
                    ))}
                </div>
            </div>
            <CreatePostModal isOpen={openModal} onChange={setOpenModal} onSubmit={onSubmit} />
        </div>
    )
}