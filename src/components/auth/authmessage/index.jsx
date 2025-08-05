'use client';

import { useSearchParams } from 'next/navigation';
import { Typography } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

export default function AuthMessage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const error = searchParams.get('error');
    const success = searchParams.get('success');
    const message = searchParams.get('message');

    if (error) {
      setMessage(error);
      setType('error');
    } else if (success) {
      setMessage(success);
      setType('success');
    } else if (message) {
      setMessage(message);
      setType('info');
    } else {
      setMessage('');
      setType('');
    }
  }, [searchParams]);

  if (!message) return null;

  const styles = {
    error: 'bg-red-50 border-red-200 text-red-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800',
  };

  return (
    <div className={`border rounded-lg p-3 ${styles[type]}`}>
      <Typography type="small" className="font-medium">
        {message}
      </Typography>
    </div>
  );
}