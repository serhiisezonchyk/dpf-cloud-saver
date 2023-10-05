'use client';
import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button, buttonVariants } from '../ui/button';
import UploadDropzone from '../upload-dropzone/UploadDropzone';

const Uploadbutton = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Dialog
      open={open}
      onOpenChange={(_open) => {
        if (!_open) {
          setOpen(_open);
        }
      }}
    >
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button className={buttonVariants()}>Завантажити pdf.</Button>
      </DialogTrigger>
      <DialogContent>
        <UploadDropzone />
      </DialogContent>
    </Dialog>
  );
};

export default Uploadbutton;
