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
import axios from 'axios';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function App() {
  const [filebase64,setFileBase64] = useState<string>("")
  const [apiResponse, setApiResponse] = useState<string>("");
  const [blobData, setBlobData] = useState<Blob | null>(null);
  const [llmResponse, setLlmResponse] = useState<string | null>(null);
  const [llmerror, setLlmError] = useState(false);
  const [uploadUi, setuploadUi] = useState(true);
  const [asrLoading, setasrLoading] = useState(true);
  const [llmLoading, setllmLoading] = useState(false);
  const [llmPrompt, setLlmPrompt] = useState<string>("");
  const [nextUiLoading, setnextUiLoading] = useState(false);
  const [generateSummary, setgenerateSummary] = useState<string>("");
  const [generateSatisfaction, setgenerateSatisfaction] = useState<string>("");
  const [generateSentiment, setgenerateSentiment] = useState<string>("");
  const [generateTurnover, setgenerateTurnover] = useState<string>("");
  const [generateTopic, setgenerateTopic] = useState<string>("");


  function generateLLMSummary(data: { chat_message: string | any, conversation: string }){
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
                console.log("LLM Response from summary: ", response.data);
                setgenerateSummary(response.data);
                return response.data;

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

        return '';
  }

  function generateLLMSatisfaction(data: { chat_message: string | any, conversation: string }){
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
                console.log("LLM Response from Satisfaction: ", response.data);
                setgenerateSatisfaction(response.data);
                return response.data;

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

        return '';
  }

  function generateLLMSentiment(data: { chat_message: string | any, conversation: string }){
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
                console.log("LLM Response from Sentiment: ", response.data);
                setgenerateSentiment(response.data);
                return response.data;

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

        return '';
  }

  function generateLLMTurnover(data: { chat_message: string | any, conversation: string }){
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
                console.log("LLM Response from turnover: ", response.data);
                setgenerateTurnover(response.data);
                return response.data;

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

        return '';
  }

  function generateLLMTopic(data: { chat_message: string | any, conversation: string }){
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
                console.log("LLM Response from topic: ", response.data);
                setgenerateTopic(response.data);
                return response.data;

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

        return '';
  }

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
          const llm_summary = {
              chat_message : "Generate the summary, summary should be who was customer and who was agent, then what was customer asking for, how did agent respond to it and was customer satisfied with the agent",
              conversation: transcript
          }

          generateLLMSummary(llm_summary)

          const llm_satisfaction = {
            chat_message: "Was customer satisfied with agent information, answer it in yes or no and reason",
            conversation: transcript,
            };
            generateLLMSatisfaction(llm_satisfaction)

            const llm_sentiment = {
                chat_message: "Give me a proper report on what was the sentiment of customer and agent, what is the overall sentiment of a entire conversation. Give the sentiment in dictionary format like this {speaker0: '', speaker1: '', Overall Sentiment: ''}",
                conversation: apiResponse,
                };
          
            generateLLMSentiment(llm_sentiment)

            const llm_turnover = {
                chat_message: "What are the changes that this customer will turn into paying customer or this customer will come back",
                conversation: apiResponse,
                };
            
            generateLLMTurnover(llm_turnover)
            
            const llm_topic = {
                chat_message: "Extract the conversation topic between speakers",
                conversation: apiResponse,
                };

            generateLLMTopic(llm_topic)

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
      convertFileToBase(files);
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
    <div className="App mb-44">
      <header className="">
        
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

            <div className='flex items-center justify-center flex-col mb-20'>

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
            <div className="">
                <div className="grid md:grid-cols-2 gap-10 justify-evenly">
                    
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

                            <div className="md:mt-0 mt-10 flex ">
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
                            <div className="flex mt-3 md:flex-row flex-col text-sm font-medium">
                                {/* <h1 className="mr-4 mt-1 text-blue-500 md:mb-0 mb-2">Suggestions: </h1> */}
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
                                        Summary of conversation 
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
                                    className="text-gray-900 md:mb-0 mb-2 bg-white rounded-lg border border-blue-200 py-1 px-2 hover:bg-gray-100 hover:text-blue-500 focus:ring-4 focus:ring-gray-200 mr-4 max-w-fit"
                                    onClick={(e) => {
                                        const llmData = {
                                        chat_message: "Give me a proper report on what was the sentiment of customer and agent, what is the overall sentiment of a entire conversation. Give the sentiment in dictionary format like this {speaker0: '', speaker1: '', Overall Sentiment: ''}",
                                        conversation: apiResponse,
                                        };
                                        llmRequestResponse(llmData);
                                    }}
                                    >
                                        Conversation Sentiment
                                </button>

                            </div>

                            <div className="flex md:mt-3 md:flex-row flex-col text-sm font-medium">
                                {/* <h1 className="mr-4 mt-1 text-blue-500 md:mb-0 mb-2">Suggestions: </h1> */}
                                <button 
                                    className="text-gray-900 md:mb-0 mb-2 bg-white rounded-lg border border-blue-200 py-1 px-2 hover:bg-gray-100 hover:text-blue-500 focus:ring-4 focus:ring-gray-200 mr-4 max-w-fit"
                                    onClick={(e) => {
                                        const llmData = {
                                        chat_message: "What are the changes that this customer will turn into paying customer or this customer will come back",
                                        conversation: apiResponse,
                                        };
                                        llmRequestResponse(llmData);
                                    }}
                                    >
                                        Customer turnover chances
                                </button>

                                <button 
                                    className="text-gray-900 md:mb-0 mb-2 bg-white rounded-lg border border-blue-200 py-1 px-2 hover:bg-gray-100 hover:text-blue-500 focus:ring-4 focus:ring-gray-200 mr-4 w-fit"
                                    onClick={(e) => {
                                        const llmData = {
                                        chat_message: "Extract the conversation topic between speakers",
                                        conversation: apiResponse,
                                        };
                                        llmRequestResponse(llmData);
                                    }}
                                    >
                                        Conversation topic extraction
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
            </div>
        }

        { !uploadUi  && apiResponse && generateSummary && generateSatisfaction && generateSentiment && generateTurnover && generateTopic &&

          <button
            className="mt-40 inline-flex items-center justify-center rounded-xl border-2 bg-[#6a32ee] px-6 py-3 text-center font-medium text-white duration-200 hover:border-black hover:bg-transparent hover:text-black focus:outline-none focus-visible:outline-black focus-visible:ring-black lg:w-auto"
          >
          Generate Report
          </button>

        }

        </div>
      </header>
    </div>
  );
}

export default App;