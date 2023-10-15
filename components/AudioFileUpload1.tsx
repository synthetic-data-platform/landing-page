// import React, { useEffect, useState } from "react";

// const AudioFileUpload: React.FC = () => {
//     const [filebase64,setFileBase64] = useState<string>("")

//     function formSubmit(e: any) {
//         e.preventDefault();
//         // Submit your form with the filebase64 as 
//         // one of your fields
//         console.log({filebase64})
//         alert("here you'd submit the form using\n the filebase64 like any other field")
//       }
    
//     function convertFile(files: FileList|null) {
//         if (files) {
//           const fileRef = files[0] || ""
//           const fileType: string= fileRef.type || ""
//           console.log("This file upload is of type:",fileType)
//           const reader = new FileReader()
//           reader.readAsBinaryString(fileRef)
//           reader.onload=(ev: any) => {
//             // convert it to base64
//             setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
//           }
//         }
//       }

//     return (
//         // <div className="App">
//         //     <h1> Upload Audio File </h1>
//         //     <input onChange={(e) => { e.target.files && e.target.files[0] }} type="file" />
//         // </div>



//         <div className="flex items-center justify-center">
//             <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
//                 <div className="flex flex-col items-center justify-center pt-5 pb-6">
//                     <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
//                         <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
//                     </svg>
//                     <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
//                     <p className="text-xs text-gray-500 dark:text-gray-400">MP4, WAV, and all other audio file types</p>
//                 </div>
//                 <input type="file" onChange={(e)=> convertFile(e.target.files)} />
//             </label>
//         </div> 

//     );
// }

// export default AudioFileUpload;


import React,{ useState, useEffect }  from 'react';

function App() {
  const [filebase64,setFileBase64] = useState<string>("")

  function formSubmit(e: any) {
    e.preventDefault();
    // Submit your form with the filebase64 as 
    // one of your fields
    console.log({filebase64})
    // alert("here you'd submit the form using\n the filebase64 like any other field")
  }

  // The Magic all happens here.
  function convertFile(files: FileList|null) {
    if (files) {
      const fileRef = files[0] || ""
      const fileType: string= fileRef.type || ""
      console.log("This file upload is of type:",fileType)
      const reader = new FileReader()
      reader.readAsBinaryString(fileRef)
      reader.onload=(ev: any) => {
        // convert it to base64
        setFileBase64(`data:${fileType};base64,${btoa(ev.target.result)}`)
      }
    }
  }


  return (
    <div className="App">
      <header className="">
        Start By Uploading Audio Files
        <form onSubmit={formSubmit} className='mt-4'>

            <div className="flex items-center justify-center">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-purple-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">MP4, WAV, and all other audio file types</p>
                    </div>
                    
                    <input type="file" id="dropzone-file" className="hidden" onChange={(e)=> convertFile(e.target.files)} />
                    
                </label>
            </div>
          { filebase64 &&

            <div className='flex items-center justify-center flex-col'>

            {(filebase64.indexOf("video/") > -1)  && 
            <video controls >
              <source src={filebase64} />
            </video>
            }

            {/* if it's a audio (music, sound) */}
              {(filebase64.indexOf("audio/") > -1)  && 
              <audio controls className='mt-10 block w-full max-w-md mx-auto'>
                <source src={filebase64} />
              </audio>
             }
              
            {/* <button type="button" className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700">Light</button> */}
            {/* <button className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Purple</button> */}

            <button className="mt-10 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-lg px-10 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"> Submit</button>
            
            </div>
          }
        </form>
      </header>
    </div>
  );
}

export default App;