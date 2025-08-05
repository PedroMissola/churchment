'use client';

import { logout } from '@/lib/auth/actions';
import { useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { Button, Spinner } from '@material-tailwind/react';

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleLogout() {
    startTransition(async () => {
      try {
        await logout();
        router.push('/login');
        router.refresh();
      } catch (error) {
        console.error('Logout error:', error);
      }
    });
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={isPending}
      variant="outlined"
      className="flex items-center gap-2"
    >
      {isPending && <Spinner size="sm" />}
      {isPending ? 'Saindo...' : 'Logout'}
    </Button>
  );
}