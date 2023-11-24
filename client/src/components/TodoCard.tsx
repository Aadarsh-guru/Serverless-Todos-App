import { Edit, Trash } from "lucide-react";
import { useState } from "react";
import Alert from "./Alert";
import Dialog from "./Dialog";

export type Todo = {
    id: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    userId: string
}

interface TodoCardProps {
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    index: number
};

const TodoCard = ({ todo, setTodos, index }: TodoCardProps) => {

    const [openEditDialog, setOpenEditDialog] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

    return (
        <>
            <div className="w-full p-4 rounded-md shadow-md flex justify-between items-center mb-4" style={{ background: 'linear-gradient(135deg, #f6d365 0%, #fda085 100%)' }}>
                <div className='flex gap-4 w-[60%] lg:w-[80%]'>
                    <div className="text-gray-600">{index + 1}</div>
                    <div className="text-xl font-bold text-gray-800">{todo?.content.length > 45 ? `${todo?.content.slice(0, 45)}...` : todo?.content} </div>
                </div>
                <div className="space-x-2">
                    <button className="transition-transform bg-blue-500 hover:bg-blue-600 text-white rounded-full active:scale-95 p-2" onClick={() => setOpenEditDialog(!openEditDialog)} >
                        <Edit size={20} />
                    </button>
                    <button className=" transition-transform bg-red-500 hover:bg-red-600 text-white rounded-full active:scale-95 p-2" onClick={() => setOpenDeleteDialog(!openDeleteDialog)}  >
                        <Trash size={20} />
                    </button>
                </div>
            </div>
            <Alert open={openDeleteDialog} setOpen={setOpenDeleteDialog} todo={todo} setTodos={setTodos} />
            <Dialog open={openEditDialog} setOpen={setOpenEditDialog} todo={todo} setTodos={setTodos} />
        </>
    )
}

export default TodoCard;