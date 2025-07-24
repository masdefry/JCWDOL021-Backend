'use client';

import { loginSchema } from '@/features/login/schemas/loginSchema';
import { useFormik } from 'formik';
import { PiIdentificationCardDuotone } from 'react-icons/pi';
import { PiPasswordDuotone } from 'react-icons/pi';
import { axiosInstance } from '@/utils/axiosInstance';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/useAuthStore';

export interface IAuth {
  id: string;
  fullName: string;
  email: string;
  password: string;
  role: string;
  shiftId: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export default function Page() {
  const router = useRouter();
  const { setAuth } = useAuthStore();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: ({ email, password }) => {
      onLoginAccount({
        email,
        password,
      });
    },
    validationSchema: loginSchema,
  });

  const onLoginAccount = async ({
    email,
    password,
  }: Pick<IAuth, 'email' | 'password'>) => {
    const res = await axiosInstance.post('/api/auth/login', {
      email,
      password,
    });
    console.log(res);
    setAuth({
      fullName: res?.data?.data?.fullName,
      role: res?.data?.data?.email,
      token: res?.data?.data?.token,
    });
    toast.success(res?.data?.message);
    router.push('/');
  };

  return (
    <>
      <div className='p-10'>
        <div className='text-black'>
          <h1 className='text-3xl'>Welcome Back</h1>
          <p className='font-bold text-gray-500'>
            Your day starts here — let’s make it productive!
          </p>
        </div>

        <form onSubmit={formik.handleSubmit}>
          <div className='mt-3'>
            <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
              <PiIdentificationCardDuotone className='text-2xl text-gray-500' />
              <input
                type='text'
                id='email'
                name='email'
                onChange={formik.handleChange}
                value={formik.values.email}
                placeholder='Email or Username'
                className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
              />
              {formik.errors.email && formik.touched.email && (
                <div id='feedback'>{formik.errors.email}</div>
              )}
            </div>
            <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
              <PiPasswordDuotone className='text-2xl text-gray-500' />
              <input
                type='password'
                id='password'
                name='password'
                onChange={formik.handleChange}
                value={formik.values.password}
                placeholder='Password'
                className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
              />
              {formik.errors.password && formik.touched.password && (
                <div id='feedback'>{formik.errors.password}</div>
              )}
            </div>
            <button
              type='submit'
              className='btn bg-green-500  hover:bg-green-600 text-white w-full mt-5'
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
