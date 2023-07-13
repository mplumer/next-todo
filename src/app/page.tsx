import Link from 'next/link';
import { prisma } from '@/db';
import { TodoItem } from '@/components/TodoItem';

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  'use server';

  await prisma.todo.update({
    where: { id },
    data: { complete },
  });
}

export default async function Home() {
  const todos = await getTodos();

  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-100 rounded px-2 py-1 text-slate-100 hover:bg-slate-100 hover:text-slate-800"
          href="/new"
        >
          New
        </Link>
      </header>
      <ul className="flex flex-col justify-between pl-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
