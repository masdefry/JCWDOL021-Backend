'use client';
import { axiosInstance } from '@/utils/axiosInstance';
import React, { useEffect } from 'react';
import useAuthStore from '@/store/useAuthStore';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { token, setAuth } = useAuthStore();

  const onAuthSessionLogin = async () => {
    try {
      const res = await axiosInstance.get('/api/auth/session-login', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log(res);
      setAuth({
        token,
        fullName: res?.data?.data?.fullName,
        role: res?.data?.data?.role,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (token) {
      onAuthSessionLogin();
    }
  }, [token]);

  return <>{children}</>;
}
