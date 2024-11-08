import { Search } from 'lucide-react';
import React from 'react';
import Input from '../ui/input/default';

export default function SearchComponent() {
    return (
        <div className='flex items-center bg-foreground border border-black-500 rounded-md p-[2px] w-full max-w-xs'>
            <div className='flex items-center justify-center px-2'>
                <Search className='h-5 w-5 text-gray-700' />
            </div>
            <Input
                className='h-8 w-96 font-normal pl-2'
                variant='secondary'
                type='search'
                placeholder='search...'
            />
        </div>
    );
}
