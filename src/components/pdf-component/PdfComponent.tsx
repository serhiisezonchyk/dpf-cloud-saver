'use client';
import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import { useToast } from '../ui/use-toast';
import { useResizeDetector } from 'react-resize-detector';
import { Button } from '../ui/button';
import { ChevronDown, ChevronUp, RotateCw, Search } from 'lucide-react';
import { Input } from '../ui/input';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import SimpleBar from 'simplebar-react';
import FullScreenPdf from '../full-screen-pdf/FullScreenPdf';
import './PdfComponent.scss';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
interface PdfcomponentProps {
  url: string;
}
const PdfComponent = ({ url }: PdfcomponentProps) => {
  const [pagesCount, setPagesCount] = React.useState<number>();
  const [currPage, setCurrPage] = React.useState<number>(1);
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);
  const [rotated, setRotaded] = React.useState<number>(0);
  const [renderedScale, setRenderedScale] = React.useState<number | null>(null);
  const isLoading = renderedScale !== zoomLevel;
  const { toast } = useToast();
  const { width, ref } = useResizeDetector();
  const PageValidator = z.object({
    page: z
      .string()
      .refine((num) => Number(num) > 0 && Number(num) <= pagesCount!),
  });
  type TypePageValidator = z.infer<typeof PageValidator>;
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<TypePageValidator>({
    defaultValues: {
      page: '1',
    },
    resolver: zodResolver(PageValidator),
  });

  const handlePageSubmit = ({ page }: TypePageValidator) => {
    setCurrPage(Number(page));
    setValue('page', String(page));
  };
  return (
    <div className='pdf-component-form'>
      <div className='pdf-component-top-bar'>
        <div className='left-side-buttons'>
          <Button
            aria-label='Попередня сторінка'
            className='flex items-center gap-2'
            variant='ghost'
            disabled={currPage <= 1}
            onClick={() => {
              setCurrPage((prev) => (prev - 1 > 1 ? prev - 1 : 1));
              setValue('page', String(currPage - 1));
            }}
          >
            <ChevronDown className='h-4 w-4' />
          </Button>
          <div className='flex items-center gap-2'>
            <Input
              {...register('page')}
              className={cn(
                'w-12 h-8',
                errors.page && 'focus-visible:ring-red-500'
              )}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSubmit(handlePageSubmit)();
                }
              }}
            />
            <p className='text-sm space-x-1'>
              <span>/ {pagesCount ?? '-'}</span>
            </p>
          </div>
          <Button
            aria-label='Попередня сторінка'
            className='flex items-center gap-2'
            variant='ghost'
            disabled={pagesCount === undefined || pagesCount === currPage}
            onClick={() => {
              setCurrPage((prev) =>
                prev + 1 > pagesCount! ? pagesCount! : prev + 1
              );
              setValue('page', String(currPage + 1));
            }}
          >
            <ChevronUp className='h-4 w-4' />
          </Button>
        </div>
        <div className='right-side-buttons'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className='gap-2' aria-label='zoom' variant='ghost'>
                <Search className='w-4 h-4' />
                {zoomLevel * 100}%
                <ChevronDown className='h-3 w-3 opacity-50' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onSelect={() => setZoomLevel(1)}>
                100%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoomLevel(1.5)}>
                150%
              </DropdownMenuItem>
              <DropdownMenuItem onSelect={() => setZoomLevel(2)}>
                200%
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            aria-label='повернути на 90deg'
            variant='ghost'
            onClick={() => setRotaded((prev) => prev + 90)}
          >
            <RotateCw className='h-4 w-4' />
          </Button>
          <FullScreenPdf url={url} />
        </div>
      </div>
      <div className='pdf-component'>
        <SimpleBar autoHide={false} className='simplebar'>
          <div ref={ref} className=''>
            <Document
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
              className='max-h-full'
            >
              {isLoading && renderedScale ? (
                <Page
                  width={width ? width : 1}
                  pageNumber={currPage}
                  scale={zoomLevel}
                  rotate={rotated}
                  key={'@' + renderedScale}
                />
              ) : null}
              <Page
                className={cn(isLoading ? 'hidden' : '')}
                width={width ? width : 1}
                pageNumber={currPage}
                scale={zoomLevel}
                rotate={rotated}
                key={'@' + zoomLevel}
                loading={<div>Loading...</div>}
                onRenderSuccess={() => setRenderedScale(zoomLevel)}
              />
            </Document>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
};

export default PdfComponent;
