'use client';

import { useSearchParams } from 'next/navigation';
import { Typography, Alert } from '@material-tailwind/react';
import { useEffect, useState } from 'react';

export default function AuthMessage() {
  const searchParams = useSearchParams();
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');

  useEffect(() => {
    const error = searchParams.get('error');
    const success = searchParams.get('success');
    const info = searchParams.get('message');

    if (error) {
      setMessage(decodeURIComponent(error));
      setType('error');
    } else if (success) {
      setMessage(decodeURIComponent(success));
      setType('success');
    } else if (info) {
      setMessage(decodeURIComponent(info));
      setType('info');
    } else {
      setMessage('');
      setType('');
    }
  }, [searchParams]);

  if (!message) return null;

  // Mapeia os tipos para as cores do Material Tailwind
  const getAlertColor = (type) => {
    switch (type) {
      case 'error':
        return 'error';
      case 'success':
        return 'success';
      case 'info':
        return 'info';
      default:
        return 'info';
    }
  };

  return (
    <Alert variant="solid" color={getAlertColor(type)}>
      <Alert.Content>
        <Typography type="small">
          {message}
        </Typography>
      </Alert.Content>
    </Alert>
  );
}