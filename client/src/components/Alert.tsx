import { Todo } from "./TodoCard";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "./ui/use-toast";
import { deleteTodoService } from "@/services/todoService";
import { Button } from "./ui/button";
import { useState } from "react";
import { Loader2 } from "lucide-react";


interface AlertProps {
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const AlertComponnent = ({ open, setOpen, todo, setTodos }: AlertProps) => {

    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        try {
            setLoading(true);
            const { success, message } = await deleteTodoService(todo.id);
            if (success) {
                toast({
                    title: message
                });
                setTodos(prev => prev.filter(item => item.id !== todo.id));
                setOpen(false);
                return;
            }
        } catch (error: any) {
            console.log(error);
            toast({
                title: error.response.data.message
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <AlertDialog open={open} onOpenChange={() => setOpen(!open)} >
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your
                        account and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel disabled={loading} >Cancel</AlertDialogCancel>
                    <Button onClick={handleDelete} disabled={loading} >
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}

export default AlertComponnent;