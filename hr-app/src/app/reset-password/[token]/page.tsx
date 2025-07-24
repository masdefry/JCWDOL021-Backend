'use client';
import HeaderTitle from '@/components/HeaderTitle';
import { axiosInstance } from '@/utils/axiosInstance';
import { useFormik } from 'formik';
import { useParams } from 'next/navigation';
import { PiPasswordDuotone } from 'react-icons/pi';

export default function Page() {
  const { token } = useParams();
  const onHandleResetPassword = async (password: string) => {
    await axiosInstance.patch(
      '/api/auth/reset-password',
      {
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: (values) => {
      onHandleResetPassword(values?.password);
    },
  });

  return (
    <>
      <HeaderTitle title='Reset Password' />

      <form onSubmit={formik.handleSubmit}>
        <div className='p-4'>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiPasswordDuotone className='text-2xl text-gray-500' />
            <input
              id='password'
              name='password'
              onChange={formik.handleChange}
              value={formik.values.password}
              type='password'
              placeholder='Enter your new password'
              className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
            />
          </div>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiPasswordDuotone className='text-2xl text-gray-500' />
            <input
              type='password'
              id='confirmPassword'
              name='confirmPassword'
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
              placeholder='Enter your confirmation password'
              className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
            />
          </div>

          <div className='px-4 py-3 w-full border-gray-200 fixed bottom-0 left-0 right-0 max-w-md mx-auto'>
            <button
              type='submit'
              className='btn bg-green-500  hover:bg-green-600 text-white w-full'
            >
              Reset Password
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
