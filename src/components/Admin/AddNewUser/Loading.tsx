import React from 'react';
import Loading from 'react-loading-components';
 
const Load = () => (
<>
    <div className='w-full h-full bg-[rgba(0,0,0,0.5)] z-50 absolute top-0 left-0'>
        <div className='flex justify-center'>
            <Loading type='oval' width={200} height={500} fill='#fff'/>
        </div>
    </div>
   
</>
  
);
 
export default Load;
