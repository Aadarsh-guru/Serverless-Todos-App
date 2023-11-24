import TodoCard, { Todo } from '@/components/TodoCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { toast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthProvider';
import MainLayout from '@/layouts/MainLayout';
import { createTodoService, getTodosService } from '@/services/todoService';
import { Loader2, PlusCircle } from 'lucide-react';
import { useEffect, useState } from 'react'

const Home: React.FC = () => {

    const { auth } = useAuth();
    const [text, setText] = useState('');
    const [todos, setTodos] = useState<Todo[]>([]);
    const [fetching, setFetching] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { success, todo, message } = await createTodoService(text);
            if (success) {
                setText('');
                toast({
                    title: message
                });
                setTodos([todo, ...todos]);
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


    useEffect(() => {
        const fetchTodos = async () => {
            try {
                setFetching(true);
                const { todos, success } = await getTodosService();
                if (success) {
                    setTodos(todos);
                }
            } catch (error: any) {
                console.log(error);
                toast({
                    title: error.response.data.message
                });
            } finally {
                setFetching(false);
            }
        }
        fetchTodos();
    }, [auth?.token])

    return (
        <MainLayout
            title="Todo's App - Home"
            description="Todo's App"
            keywords="Login page todo app mern stack home"
        >
            <div className="h-screen w-full flex justify-center items-center bg-blue-900/20 pt-24">
                <div className="h-full w-full md:w-[70%] mx-auto flex flex-col items-center">
                    <form onSubmit={handleSubmit} className='flex p-4 w-full md:w-1/2 gap-2 md:gap-4'>
                        <Input
                            type="text"
                            required
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            disabled={loading}
                            placeholder='Enter todo.'
                            className='h-10 text-lg w-full rounded-md px-4'
                        />
                        <Button
                            disabled={loading}
                            type='submit'
                            className='transition-transform hover:bg-black/75 active:scale-95'
                        >
                            {loading ?
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                :
                                <PlusCircle className="mr-2 h-4 w-4" />
                            }  Add
                        </Button>
                    </form>
                    <ScrollArea
                        className={`p-4 flex-1 gap-4 w-full`}
                    >
                        {
                            fetching ?
                                (
                                    <div className="flex flex-col w-full h-full justify-center items-center">
                                        <Loader2 className="h-10 w-10 animate-spin text-white" />
                                    </div>
                                )
                                :
                                todos?.length === 0 ?
                                    (
                                        <div className="flex flex-col w-full h-full justify-center items-center">
                                            No todo's found.
                                        </div>
                                    )
                                    :
                                    (
                                        <>
                                            {
                                                todos?.map((todo, index) => (
                                                    <TodoCard key={todo.id} todo={todo} index={index} setTodos={setTodos} />
                                                ))
                                            }
                                        </>
                                    )
                        }
                    </ScrollArea>
                </div>
            </div>
        </MainLayout>
    )
}

export default Home;