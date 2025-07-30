'use client';
import { MdOutlineDriveFolderUpload } from 'react-icons/md';
import { PiClockCountdownDuotone } from 'react-icons/pi';
import { DayPicker } from 'react-day-picker';
import { IoCalendarOutline } from 'react-icons/io5';
import { PiListPlusDuotone } from 'react-icons/pi';
import HeaderTitle from '@/components/HeaderTitle';
import { useFormik } from 'formik';
import { requestTimeOffSchema } from '@/features/time-off/request/schemas/requestTimeOffSchema';
import { axiosInstance } from '@/utils/axiosInstance';
import {
  IRequestTimeOffEvidenceProps,
  IRequestTimeOffProps,
} from '@/features/time-off/request/types';
import { format } from 'date-fns';

export default function Page() {
  const onHandleRequestTimeOff = async ({
    timeOffType,
    reason,
    evidence,
  }: IRequestTimeOffProps & IRequestTimeOffEvidenceProps) => {
    const formData = new FormData();
    formData.append('timeOffType', timeOffType);
    formData.append('reason', reason);
    evidence.forEach((evidenceItem: File) => {
      formData.append('evidence', evidenceItem);
    });

    await axiosInstance.post('/api/time-off/request', formData);
  };

  const formik = useFormik({
    initialValues: {
      timeOffType: '',
      reason: '',
      date: '',
      evidence: [] as File[],
    },
    validationSchema: requestTimeOffSchema,
    onSubmit: ({ timeOffType, reason, date, evidence }) => {
      onHandleRequestTimeOff({
        timeOffType,
        reason,
        evidence,
      });
    },
  });

  return (
    <>
      <HeaderTitle title='Request Time Off' />

      {/* Form Request Time Off */}
      <form onSubmit={formik?.handleSubmit}>
        <div className='px-4 py-2'>
          <fieldset className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiClockCountdownDuotone className='text-2xl text-gray-500' />
            <select
              id='timeOffType'
              name='timeOffType'
              onChange={formik?.handleChange}
              value={formik?.values?.timeOffType}
              className='select w-full bg-gray-100 text-gray-500 border-none'
            >
              <option>Time off type</option>
              <option>IZIN_MENIKAH</option>
              <option>IZIN_SAKIT</option>
            </select>
          </fieldset>
          {formik?.touched?.timeOffType && formik?.errors?.timeOffType && (
            <div>{formik?.errors.timeOffType}</div>
          )}
          <fieldset className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <IoCalendarOutline className='text-2xl text-gray-500' />
            <button
              type='button'
              popoverTarget='rdp-popover'
              className='input bg-gray-100 w-full border-none text-gray-500'
              style={{ anchorName: '--rdp' } as React.CSSProperties}
            >
              {formik?.values?.date ? formik?.values?.date : 'Select date'}
            </button>
            <div
              popover='auto'
              id='rdp-popover'
              className='dropdown mt-3'
              style={{ positionAnchor: '--rdp' } as React.CSSProperties}
            >
              <DayPicker
                id='date'
                className='react-day-picker'
                mode='single'
                selected={
                  formik.values.date ? new Date(formik.values.date) : undefined
                }
                onSelect={(date) => {
                  if (date) {
                    formik?.setFieldValue(
                      'date',
                      format(new Date(date), 'yyyy-MM-dd')
                    );
                  } else {
                    formik?.setFieldValue('date', '');
                  }
                }}
              />
            </div>
          </fieldset>
          {formik?.touched?.date && formik?.errors?.date && (
            <div>{formik?.errors.date}</div>
          )}
          <fieldset className='flex items-center gap-2 py-2 border-b-1 border-gray-300'>
            <PiListPlusDuotone className='text-2xl text-gray-500' />
            <input
              id='reason'
              name='reason'
              onChange={formik?.handleChange}
              value={formik?.values?.reason}
              type='text'
              placeholder='Reason'
              className='input border-none text-gray-500 bg-gray-100'
            />
          </fieldset>
          {formik?.touched?.reason && formik?.errors?.reason && (
            <div>{formik?.errors.reason}</div>
          )}
          <fieldset className='flex items-center gap-2 py-2 border-b-1 border-gray-300 mt-1'>
            <legend className='font-bold text-xs text-gray-500'>
              Upload File Evidence
            </legend>
            <MdOutlineDriveFolderUpload className='text-2xl text-gray-500' />
            <input
              id='evidence'
              name='evidence'
              onChange={(event) => {
                const files = Array.from(event.currentTarget.files || []);
                formik.setFieldValue('evidence', files);
              }}
              multiple
              type='file'
              className='file-input w-full'
            />
          </fieldset>
          {formik?.touched?.evidence && formik?.errors?.evidence && (
            <div>{formik?.errors.evidence.toString()}</div>
          )}
        </div>
        <div className='px-4 py-3 w-full border-gray-200 fixed bottom-0 left-0 right-0 max-w-md mx-auto'>
          <button
            type='submit'
            className='btn bg-green-500  hover:bg-green-600 text-white w-full'
          >
            Submit Request
          </button>
        </div>
      </form>
    </>
  );
}
