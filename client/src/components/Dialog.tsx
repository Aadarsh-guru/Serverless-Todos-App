import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Todo } from "./TodoCard";
import { useState } from "react";
import { toast } from "./ui/use-toast";
import { Loader2 } from "lucide-react";
import { updateTodoService } from "@/services/todoService";

interface DialogProps {
    todo: Todo;
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DialogComponent = ({ open, setOpen, todo, setTodos }: DialogProps) => {

    const [loading, setLoading] = useState(false);
    const [text, setText] = useState(todo?.content);

    const handleDelete = async () => {
        if (!text) {
            return toast({
                title: ''
            });
        }
        try {
            setLoading(true);
            const { success, message } = await updateTodoService(todo.id, text);
            if (success) {
                toast({
                    title: message
                });
                setTodos(prev => prev.map(item => item.id === todo.id ? { ...item, content: text } : item));
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
    };

    return (
        <Dialog open={open} onOpenChange={() => setOpen(!open)} >
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Todo</DialogTitle>
                    <DialogDescription>
                        Make changes to your todo here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
                <div className="w-full py-4">
                    <div className="items-center">
                        <Input
                            value={text}
                            className="h-10 text-lg w-full rounded-md px-4"
                            disabled={loading}
                            onChange={(e) => setText(e.target.value)}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button disabled={loading} onClick={handleDelete} type="submit">
                        {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Save changes
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}

export default DialogComponent;