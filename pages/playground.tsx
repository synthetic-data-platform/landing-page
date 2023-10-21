import Head from "next/head";
import Header from "../components/Header";
import Link from "next/link";
import React,{ useState, useEffect }  from 'react';
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AudioFileUpload from "../components/AudioFileUpload1";
import Footer from "../components/Footer";
import AWS from 'aws-sdk';

// Initialize the AWS SDK with your credentials

const s3 = new AWS.S3();

export default function ImgEnhancement(){

    const [filebase64,setFileBase64] = useState<string>("")
    const [apiResponse, setApiResponse] = useState<string>("");
    const [blobData, setBlobData] = useState<Blob | null>(null);
    const [llmResponse, setLlmResponse] = useState<string | null>(null);
    const [llmerror, setLlmError] = useState(false);
    const [uploadUi, setuploadUi] = useState(true);
    const [asrLoading, setasrLoading] = useState(true);
    const [llmLoading, setllmLoading] = useState(false);
    const [llmPrompt, setLlmPrompt] = useState<string>("");
    const [file, setFile] = useState<File | null>(null);

  const [nextUiLoading, setnextUiLoading] = useState(false);

    function llmRequestResponse(data: { chat_message: string | any, conversation: string }) {
        setllmLoading(true);
        console.log("data: ",data)
        let llmTranscript = '';
        if (process.env.NEXT_PUBLIC_LLM_URL){

        const formData = new FormData();
        formData.append('chat_message', data.chat_message);
        formData.append('conversation', data.conversation);
    
        const llmApiUrl = process.env.NEXT_PUBLIC_LLM_URL;
        setLlmError(false); // Reset error state
        
        try {
            axios.post(llmApiUrl, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            })
            .then((response) => {
                if (response.status === 200) {
                console.log("LLM Response: ", response.data);
                llmTranscript = response.data;
                setLlmResponse(response.data);
                setllmLoading(false);
                } else {
                setLlmError(true); // Set error state to true
                console.error(`Request failed with status code ${response.status}`);
                console.log(response.data);
                }
            })
            .catch((error) => {
                setLlmError(true); // Set error state to true
                console.error(`An error occurred: ${error}`);
            });
        } catch (error) {
            setLlmError(true); // Set error state to true
            console.error(`An error occurred: ${error}`);
        }}

        return llmTranscript;

    }

    function formSubmit(e: any) {
        e.preventDefault();

        if (!blobData) {
        console.error("No audio file selected.");
        
        }
        setuploadUi(false);
        console.log("Blob data: " + typeof blobData);

        const formData = new FormData();
        if (blobData) {
        formData.append('audioBlob', blobData);
        }

        if (process.env.NEXT_PUBLIC_ASR_URL){
        const asr_url = process.env.NEXT_PUBLIC_ASR_URL;
        axios.post(asr_url, formData, {
            headers: {
            'Content-Type': 'multipart/form-data',
            },
        })
            .then((response) => {
            const transcript = response.data.response.transcript
            setApiResponse(transcript);
            setasrLoading(false);
            const llm_data = {
                chat_message : "Summarise the conversation between customer and agent.",
                conversation: transcript
            }

            // llmRequestResponse(llm_data)

            console.log("API Response:", response.data.response.transcript);
            })
            .catch((error) => {
            console.error("API Error:", error);
            });}

    }


  // The Magic all happens here.
    function convertFileToBase(files: FileList|null) {
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


    function convertFile(files: FileList | null) {
        if (files) {
            console.log("audio file exists")
            convertFileToBase(files);
            convertFileUpload(files);
            uploadToS3(files)
            const fileRef = files[0];
            const reader = new FileReader();
        
            reader.onload = (ev) => {
                if (ev.target) {
                const arrayBuffer = ev.target.result as ArrayBuffer;
                const blob = new Blob([arrayBuffer], { type: fileRef.type });
                setBlobData(blob);
                } else {
                console.error("Failed to read the file.");
                }
            };
        
            reader.readAsArrayBuffer(fileRef);
            }
    }

    const convertFileUpload = (files: FileList | null) => {
        if (files && files.length > 0) {
          const selectedFile = files[0];
          setFile(selectedFile);
        }
      };
    
      const uploadToS3 = async (files: FileList) => {

        const audioFile = files[0];

        if (!audioFile) {
          console.error("No audio file selected.");
          return;
        }
    
        try {
          // Generate a unique key for the file in the S3 bucket
          const s3Key = `audio_${Date.now()}`;
    
          // Upload the file to S3
          const params = {
            Bucket: 'cyclic-mauve-abalone-gear-ap-south-1',
            Key: s3Key,
            Body: audioFile,
          };
    
          s3.upload(params, (err: Error, data: AWS.S3.ManagedUpload.SendData) => {
            if (err) {
              console.error("S3 Upload Error:", err);
            } else {
              console.log("S3 Upload Successful");
              // Now you can send s3Key to your API
              sendS3KeyToApi(s3Key);
            }
          });
        } catch (error) {
          console.error("S3 Upload Error:", error);
        }
      };

      const sendS3KeyToApi = (s3Key: string) => {
        // Replace this with your API call to send s3Key to your server
        console.log("Sending s3Key to the API:", s3Key);
      };
  
    // Function to format the text with line breaks
    const formatTextWithLineBreaks = (text: string) => {
        // Split the text into lines
        const lines = text.split(/\n/);
        
        // Format the lines to include line breaks after each "Speaker X:" line
        const formattedLines = [];
        let currentSpeaker = null;

        for (const line of lines) {
            const match = line.match(/Speaker (\d+): (.+)/);
            if (match) {
            // Found a new speaker, add line break if it's not the first speaker
            if (currentSpeaker !== null) {
                formattedLines.push('');
            }
            currentSpeaker = match[0];
            formattedLines.push(line);
            } else {
            // Add the line to the current speaker's dialog
            formattedLines.push(line);
            }
        }

        // Join the formatted lines with line breaks
        return formattedLines.join('\n');
    }

    return (
        <div className="flex mx-auto flex-col items-center justify-center py-2 min-h-screen">
            <Head>
                <title>Playground | Voxlab</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
    
            <Header />

            <main className="flex flex-1 px-4 mt-20 sm:mb-20 mb-8 sm:flex-row flex-col max-w-6xl md:text-center realtive">
            
                <div className="realtive">

                    {/* <h1 className="mb-4 text-3xl font-extrabold text-gray-900 sm:mt-40 mt-10 md:text-5xl lg:text-6xl">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Background Removal</span> Free to use.
                    </h1> */}
                        <p className="text-sm font-semibold text-[#333] mb-4">
                            Introducing
                        </p>

                        <h1 className="mb-4 text-7xl text-[#333] font-extrabold leading-none tracking-tight md:text-9xl lg:text-9xl dark:text-white">VcLLM</h1>

                        <p className="text-lg font-normal text-bold lg:text-xl dark:text-gray-400 mb-10">Leveraging Large Language Models for Contact Center</p>
                        
                        {/* <AudioFileUpload/> */}
                        {uploadUi &&
                        <div>
                        <h1 className='text-lg font-bold text-[#333] mb-5'>Start by Uploading audio file</h1>
                        <form onSubmit={formSubmit} className='mt-4'>

                            <div className="flex items-center justify-center">
                                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-40 border-2 border-purple-500 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                        </svg>
                                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">MP4, WAV, and all other audio file types</p>
                                    </div>
                                    
                                    <input type="file" id="dropzone-file" className="hidden" onChange={(e)=> convertFile(e.target.files)} />
                                    
                                </label>
                            </div>

                        { blobData &&

                            <div className='flex items-center justify-center flex-col'>

                            {(filebase64.indexOf("video/") > -1)  && 
                            <video controls className='mt-10 block w-full max-w-md mx-auto'>
                                <source src={filebase64} />
                            </video>
                            }

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

                            {/* <p className="mt-10 text-lg font-medium realtive">You can select following audio files : </p>

                            <div className="flex flex-col md:flex-row items-center justify-center">
                                <div className="md:mr-5 mr-0 justify-center flex-col flex mt-10">
                                    <p className="mt-10 text-center mb-2">English</p>
                                    <audio controls className='block max-w-lg'>
                                        <source src={filebase64} />
                                    </audio>
                                    <button className="mt-4 ">Use this</button>
                                </div>
                                
                                <div className="justify-center flex-col flex mt-10">
                                    <p className="mt-10 text-center mb-2">Spanish</p>
                                    <audio controls className='block max-w-lg'>
                                        <source src={filebase64} />
                                    </audio>
                                    <button className="mt-4">Use this</button>
                                </div>
                            </div> */}
                        </div>
                        }

                    <div className="">

                        { blobData && !uploadUi &&

                            <div className='flex items-center justify-center flex-col mb-14'>

                            {(filebase64.indexOf("video/") > -1)  && 
                            <video controls className='mt-10 block w-full max-w-6xl'>
                            <source src={filebase64} />
                            </video>
                            }

                            {(filebase64.indexOf("audio/") > -1)  && 
                            <audio controls className='mt-10 block w-full max-w-3xl mx-auto'>
                                <source src={filebase64} />
                            </audio>
                            }

                            </div>
                        }

                        { !uploadUi &&
                            <div className="grid lg:grid-cols-2 gap-5 sm:grid-rows-2">
                                <div>
                                    {asrLoading && 
                                    <Skeleton count={10}/>
                                    }

                                    {apiResponse &&
                                    <div>
                                        <h1 className="text-xl font-bold">ASR Transcript: </h1>
                                        <p className="text-left mt-5">{formatTextWithLineBreaks(apiResponse)}</p>
                                    
                                    </div>
                                    }
                                </div>

                                <div>

                                    {asrLoading && 
                                        <Skeleton count={10}/>
                                    }

                                    {apiResponse &&
                                        <div className="realtive">
                                        {/* <h1 className="text-xl font-bold mb-5">LLM: </h1> */}

                                        <div className="md:mt-0 mt-10">
                                            {/* <button className="w-[100px] border-[#626365]">Summary</button>
                                            <button>Sentiment</button> */}
                                            <input
                                                type={'search'}
                                                name='reset'
                                                className="rounded-xl border focus:border-blue-500 border-[#626365] bg-[#fff] max-w-[500px]"
                                                
                                                onChange={(e) => setLlmPrompt(e.target.value)}
                                                onKeyDown={(e) => {
                                                    
                                                    if (e.key !== "Enter") {
                                                        return;
                                                    }
                                                    const llmData = {
                                                    chat_message: (e.target as HTMLInputElement).value,
                                                    conversation: apiResponse,
                                                    };
                                                    llmRequestResponse(llmData);
                                                }}
                                                placeholder="Ask me something..."
                                            />
                                        </div>
                                        <div className="flex mt-3 md:flex-row flex-col">
                                            <h1 className="mr-4 mt-1 text-blue-500 md:mb-0 mb-2">Suggestions: </h1>
                                            <button 
                                                className="text-gray-900 md:mb-0 mb-2 bg-white rounded-lg border border-blue-200 py-1 px-2 hover:bg-gray-100 hover:text-blue-500 focus:ring-4 focus:ring-gray-200 mr-4 max-w-fit"
                                                onClick={(e) => {
                                                    const llmData = {
                                                    chat_message: "Generate the summary, summary should be who was customer and who was agent, then what was customer asking for, how did agent respond to it and was customer satisfied with the agent",
                                                    conversation: apiResponse,
                                                    };
                                                    llmRequestResponse(llmData);
                                                }}
                                                >
                                                    Summary
                                            </button>

                                            <button 
                                                className="text-gray-900 md:mb-0 mb-2 bg-white rounded-lg border border-blue-200 py-1 px-2 hover:bg-gray-100 hover:text-blue-500 focus:ring-4 focus:ring-gray-200 mr-4 max-w-fit"
                                                onClick={(e) => {
                                                    const llmData = {
                                                    chat_message: "Was customer satisfied with agent information, answer it in yes or no and reason",
                                                    conversation: apiResponse,
                                                    };
                                                    llmRequestResponse(llmData);
                                                }}
                                                >
                                                    Customer Satisfaction
                                            </button>

                                            <button 
                                                className="text-gray-900  bg-white rounded-lg border border-blue-200 py-1 px-2 hover:bg-gray-100 hover:text-blue-500 focus:ring-4 focus:ring-gray-200 max-w-fit"
                                                onClick={(e) => {
                                                    const llmData = {
                                                    chat_message: "What was the sentiment of the overall conversation. Also give sentiment of agent and customer seprately",
                                                    conversation: apiResponse,
                                                    };
                                                    llmRequestResponse(llmData);
                                                }}
                                                >
                                                    Sentiment
                                            </button>
                                        </div>
                                    </div>}

                                    {llmLoading &&
                                        <div className="mt-5">
                                            <Skeleton count={5}/>
                                        </div>
                                    }

                                    {!llmLoading && 
                                    <>  
                                        <p className="mt-5 text-left">{llmResponse}</p>
                                    </>
                                    }
                                </div>
                                
                            </div>
                            }
                        </div>
                        
                </div>

                

            </main>
            <Footer/>

            </div>
    )
}