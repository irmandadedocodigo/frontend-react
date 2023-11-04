import { formatDistance } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { IPost } from "../interfaces/PostInterface";
import { IProfile } from "@/app/auth/interfaces/ProfileInterface";

interface Props {
    user: IProfile;
    post: IPost;
}

export default function PostCard({
    user,
    post
}: Props) {

    const forToday = formatDistance(new Date(post.createdAt), new Date(), {
        addSuffix: true,
        locale: ptBR
    })
    return (
        <div className="bg-[--secondary] shadow-md rounded-md p-5 h-40">
            <div>
                <div className="flex gap-3 mb-2">
                    <strong>{user.fullName}</strong>
                    <p className="text-gray-300">{forToday}</p>
                </div>
            </div>

            <div>
                <p className="text-lg">{post.title}</p>
                <p>{post.content}</p>
            </div>
        </div >
    )
}