import * as Yup from 'yup';

export const requestTimeOffSchema = Yup.object().shape({
  timeOffType: Yup.string().required('Time off type is required'),
  reason: Yup.string().required('Reason is required'),
  date: Yup.string().required('Date is required'),
  evidence: Yup.array()
    .of(
      Yup.mixed<File>()
        .test('fileSize', 'Maximum file size is 2 mb', (file) => {
          return file && file.size <= 2000000;
        })
        .test('fileFormat', 'Format file not accepted', (file) => {
          const fileFormatAccepted = ['jpg', 'jpeg', 'png', 'webp', 'svg'];

          return file && fileFormatAccepted.includes(file?.type?.split('/')[1]);
        })
    )
    .min(1, 'Must select at least 1 file evidence'),
});
