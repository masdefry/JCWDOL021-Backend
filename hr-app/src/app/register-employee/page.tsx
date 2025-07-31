'use client';
import HeaderTitle from '@/components/HeaderTitle';
import {
  PiIdentificationCardDuotone,
  PiPhoneListDuotone,
  PiClockAfternoonDuotone,
  PiUserCircleGearDuotone,
} from 'react-icons/pi';
import { AiTwotoneMail } from 'react-icons/ai';
import { useFormik } from 'formik';
import { IAuth } from '../login/page';
import { axiosInstance } from '@/utils/axiosInstance';
import useAuthStore from '@/store/useAuthStore';
import AuthGuard from '@/hoc/AuthGuard';

function Page() {
  const { token } = useAuthStore();
  const formik = useFormik({
    initialValues: {
      fullName: '',
      email: '',
      role: '',
      shiftId: '',
    },

    onSubmit: ({ fullName, email, role, shiftId }) => {
      onRegisterAccount({ fullName, email, role, shiftId });
    },
  });

  const onRegisterAccount = async ({
    fullName,
    email,
    role,
    shiftId,
  }: Pick<IAuth, 'fullName' | 'email' | 'role' | 'shiftId'>) => {
    const res = await axiosInstance.post(
      '/api/auth/register',
      {
        fullName,
        email,
        role,
        shiftId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log(res);
  };

  return (
    <>
      <HeaderTitle title='Register Employee' />

      <form onSubmit={formik.handleSubmit}>
        <div className='p-4'>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiIdentificationCardDuotone className='text-2xl text-gray-500' />
            <input
              id='fullName'
              name='fullName'
              onChange={formik.handleChange}
              value={formik.values.fullName}
              type='text'
              placeholder='Full Name'
              className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
            />
          </div>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <AiTwotoneMail className='text-2xl text-gray-500' />
            <input
              id='email'
              name='email'
              onChange={formik.handleChange}
              value={formik.values.email}
              type='text'
              placeholder='Email'
              className='input border-none text-gray-500 bg-gray-100 w-full focus:outline-none focus:ring-0'
            />
          </div>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiClockAfternoonDuotone className='text-2xl text-gray-500' />
            <select
              id='shiftId'
              name='shiftId'
              onChange={formik.handleChange}
              value={formik.values.shiftId}
              className='select focus:outline-none focus:ring-0 bg-gray-100 border-none w-full text-gray-500'
            >
              <option>Employee Shift</option>
              <option value={1}>Shift-01 (09:00 - 18:00)</option>
              <option value={2}>Shift-02 (13:00 - 22:00)</option>
            </select>
          </div>
          <div className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiUserCircleGearDuotone className='text-2xl text-gray-500' />
            <select
              id='role'
              name='role'
              onChange={formik.handleChange}
              value={formik.values.role}
              className='select focus:outline-none focus:ring-0 bg-gray-100 border-none w-full text-gray-500'
            >
              <option>Employee Role</option>
              <option value={'HR'}>HR</option>
              <option value={'MANAGER'}>MANAGER</option>
              <option value={'STAFF'}>STAFF</option>
            </select>
          </div>

          <div className='px-4 py-3 w-full border-gray-200 fixed bottom-0 left-0 right-0 max-w-md mx-auto'>
            <button
              type='submit'
              className='btn bg-green-500  hover:bg-green-600 text-white w-full'
            >
              Create Employee
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default AuthGuard(Page, ['HR']);
