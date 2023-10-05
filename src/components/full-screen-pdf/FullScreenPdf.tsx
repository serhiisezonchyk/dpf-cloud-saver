import React from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { Button } from '../ui/button';
import { Expand } from 'lucide-react';
import SimpleBar from 'simplebar-react';
import { Document, Page } from 'react-pdf';
import { useToast } from '../ui/use-toast';
import { useResizeDetector } from 'react-resize-detector';
import './FullScreenPdf.scss';
interface FullScreenPdfProps {
  url: string;
}
const FullScreenPdf = ({ url }: FullScreenPdfProps) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [pagesCount, setPagesCount] = React.useState<number>();
  const { width, ref } = useResizeDetector();

  const { toast } = useToast();
  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        if (!v) {
          setOpen(v);
        }
      }}
    >
      <DialogTrigger onClick={() => setOpen(true)} asChild>
        <Button aria-label='fullscreen' variant='ghost'>
          <Expand className='h-4 w-4' />
        </Button>
      </DialogTrigger>
      <DialogContent className='dialog-content-pdf'>
        <SimpleBar autoHide={false} className='simple-bar'>
          <div ref={ref}>
            <Document
              className='doc'
              loading
              file={url}
              onLoadError={() => {
                toast({
                  title: 'Помилка читання pdf',
                  description: 'Спробйте ще раз',
                  variant: 'destructive',
                });
              }}
              onLoadSuccess={({ numPages }) => {
                setPagesCount(numPages);
              }}
            >
              {new Array(pagesCount).fill(0).map((_, index) => (
                <Page key={index} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
        </SimpleBar>
      </DialogContent>
    </Dialog>
  );
};

export default FullScreenPdf;
