import React from 'react';
import Dropzone from 'react-dropzone';
import { Cloud, File, Loader2 } from 'lucide-react';
import { Progress } from '../ui/progress';
import { useUploadThing } from '@/lib/uploadthing';
import { useToast } from '../ui/use-toast';
import { trpc } from '@/app/_trpc/client';
import { useRouter } from 'next/navigation';
import './UploadDropzone.scss';
const UploadDropzone = () => {
  const [isUploading, setIsUploading] = React.useState<boolean>(false);
  const [uploadProgress, setUploadProgress] = React.useState<number>(0);
  const { toast } = useToast();
  const { startUpload } = useUploadThing('pdfUploader');
  const router = useRouter();
  const { mutate: getFile } = trpc.getFile.useMutation({
    onSuccess: (file) => {
      router.push(`/dashboard/${file.id}`);
    },
    retry: true,
    retryDelay: 500,
  });
  const startSimulationProgress = () => {
    setUploadProgress(0);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 5;
      });
    }, 500);
    return interval;
  };
  return (
    <Dropzone
      multiple={false}
      onDrop={async (acceptedFile) => {
        setIsUploading(true);
        const progressInterval = startSimulationProgress();
        const res = await startUpload(acceptedFile);
        if (!res) {
          return toast({
            title: 'Щось пішло не так',
            description: 'Спробуйте пізніше',
            variant: 'destructive',
          });
        }
        const [fileResponse] = res;
        const key = fileResponse?.key;
        if (!key) {
          return toast({
            title: 'Щось пішло не так',
            description: 'Спробуйте пізніше',
            variant: 'destructive',
          });
        }

        clearInterval(progressInterval);
        setUploadProgress(100);

        getFile({ key });
      }}
    >
      {({ getRootProps, getInputProps, acceptedFiles }) => (
        <div {...getRootProps()} className='dropzone-container'>
          <div className='dropzone-container-wrapper'>
            <label
              htmlFor='dropzone-file'
              className='flex flex-col items-center justify-center w-full h-full rounded-[10px] cursor-pointer bg-background hover:bg-background*5'
            >
              <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                <Cloud className='h-6 w-6' />
                <p className='text-sm'>Click or drag and drop</p>
                <p className='text-xs'>PDF up to 4MB</p>
              </div>
              {acceptedFiles && acceptedFiles[0] ? (
                <div className='max-w-xs bg-white flex items-center rounded-md overflow-hidden outline outline-[1px] outline-zinc-200 divide-x divide-zinc-200'>
                  <div className='px-3 py-2 h-full grid place-items-center'>
                    <File className='h-4 w-4 text-blue-500' />
                  </div>
                  <div className='px-3 py-2 h-full text-sm truncate'>
                    {acceptedFiles[0].name}
                  </div>
                </div>
              ) : null}
              {isUploading ? (
                <div className='w-full mt-4 mx-6 flex justify-center flex-col'>
                  <Progress
                    statusColor={uploadProgress === 100 ? 'bg-green-500' : ''}
                    value={uploadProgress}
                    className='h-2 w-[80%] self-center'
                  />
                  {uploadProgress === 100 ? (
                    <div className='flex gap-1 items-center justify-center text-sm text-center pt-2'>
                      <Loader2 className='h-3 w-3 animate-spin' />
                      Redirecting..
                    </div>
                  ) : null}
                </div>
              ) : null}
              <input
                {...getInputProps()}
                type='file'
                id='dropzone-file'
                className='hidden'
              />
            </label>
          </div>
        </div>
      )}
    </Dropzone>
  );
};

export default UploadDropzone;
