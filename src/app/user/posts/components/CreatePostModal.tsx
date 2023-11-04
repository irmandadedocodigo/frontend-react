import { useForm } from "react-hook-form";
import CreatePostDTO from "../dtos/CreatePostDTO";

interface Props {
    isOpen: boolean;
    onChange: (isOpen: boolean) => void;
    onSubmit: (post: CreatePostDTO) => void;
}

export default function CreatePostModal({
    isOpen,
    onChange,
    onSubmit
}: Props) {
    const form = useForm<CreatePostDTO>({
        defaultValues: {
            title: "",
            content: ""
        }
    })

    const onSubmitForm = (data: CreatePostDTO) => {
        onSubmit(data)
        onChange(false)
    }

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form

    if (!isOpen) return null;
    return (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50">
            <form onSubmit={handleSubmit(onSubmitForm)} className="absolute top-0 bottom-0 left-0 right-0">
                <div className="flex justify-center items-center h-full">
                    <div className="container mx-auto px-10 bg-[--primary] w-1/2 h-1/2 rounded-md">
                        <div className="flex justify-between items-center h-20">
                            <h1 className="text-2xl font-bold">Nova Publicação</h1>
                            <button onClick={() => onChange(false)}>X</button>
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                className="border border-gray-300 rounded-md h-10 px-2 text-black"
                                placeholder="Título"
                                {...register("title", { required: true })}
                            />
                            {errors.title && <p className="text-red-500">Campo obrigatório</p>}
                            <textarea
                                className="border border-gray-300 rounded-md h-20 px-2 text-black"
                                placeholder="Conteúdo"
                                {...register("content", { required: true })}
                            />
                            {errors.content && <p className="text-red-500">Campo obrigatório</p>}
                            <button className="bg-[--secondary] text-white font-bold py-2 px-4 rounded" type="submit">
                                Publicar
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}