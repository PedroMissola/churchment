import { validateSession } from '@/lib/auth/actions';
import { redirect } from 'next/navigation';
import { Typography, Button } from '@material-tailwind/react';
import LogoutButton from '@/components/auth/LogoutButton';

export default async function Dashboard() {
  const { user, success } = await validateSession();

  if (!success || !user) {
    redirect('/login');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        
        {/* Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <Typography type="h1" className="text-2xl font-bold text-gray-900">
                Dashboard
              </Typography>
              <Typography className="text-gray-600 mt-1">
                Bem-vindo de volta, {user.email}!
              </Typography>
            </div>
            <LogoutButton />
          </div>
        </div>

        {/* User Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <Typography type="h2" className="text-lg font-semibold text-gray-900 mb-4">
            Informações da Conta
          </Typography>
          
          <div className="space-y-3">
            <div>
              <Typography type="small" className="text-gray-500 font-medium">
                Email
              </Typography>
              <Typography className="text-gray-900">
                {user.email}
              </Typography>
            </div>
            
            <div>
              <Typography type="small" className="text-gray-500 font-medium">
                Status do Email
              </Typography>
              <div className="flex items-center gap-2">
                <span className={`inline-block w-2 h-2 rounded-full ${
                  user.emailConfirmed ? 'bg-green-500' : 'bg-yellow-500'
                }`}></span>
                <Typography className="text-gray-900">
                  {user.emailConfirmed ? 'Confirmado' : 'Pendente confirmação'}
                </Typography>
              </div>
            </div>
            
            <div>
              <Typography type="small" className="text-gray-500 font-medium">
                ID do Usuário
              </Typography>
              <Typography className="text-gray-900 font-mono text-sm">
                {user.id}
              </Typography>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}