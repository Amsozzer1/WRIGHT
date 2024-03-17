import { useParams } from "react-router"
import {getChapterFromLesson} from './firebase/functions.js';
import React, { useState } from 'react';
import Menu from './MENU.js';
import CommentsSection from "./comments.js";
import { Button } from "@mui/material";
import './lessons.css'
export default function EachLesson() {
    let { course,lessonid,chapterid } = useParams();
    let [ChaptersData, setChaptersData] = useState([]);
    let [rendered, setRendered] = useState(false);
    let [commentsShow, setCommentsShow] = useState(false);
    let [TranscriptionShow, setTranscriptionShow] = useState(false);
    let [NotesShow, setNotesShow] = useState(false);
    
    
    function dtbsHelper(course,lessonid,chapterid){
        getChapterFromLesson(course,lessonid,chapterid)
        .then((docs) =>
        
        // eslint-disable-next-line array-callback-return
        docs.map((doc) => {
          
            setChaptersData((prev) => {
            return [...prev, doc];
          });
        })
        );
       
      }
    React.useEffect(() => {
      if(rendered===false){
        dtbsHelper(course,lessonid,chapterid);
        setRendered(true);
      }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rendered]);
    return (
        <div>
            <Menu/>
        
        <div>
            
            
                <div className="relative pt-12">
                    {ChaptersData.map((chapter) => {
                    return (
                    <div className="max-w-4xl mx-auto my-8 p-4 shadow-lg rounded-lg">
                    <h1 className="text-2xl font-bold mb-4">{chapter[0]}</h1>
                    {/* Uncomment if you need to display video information */}
                    {/* <p className="mb-4">{chapter[1].video}</p> */}
                    <div className="flex flex-col items-center justify-start  pt-3">
                        <iframe
                        className="rounded-lg"
                        src={chapter[1].video}
                        style={{ width: "100%", height: "50vh" }} // This replaces the width="60%" to make it responsive.
                        title={chapter[0]}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        ></iframe>

                        <div className=" flex flex-row gap-2 w-full pt-5 lessonsTabs">
                            <Button
                            onClick={() => {setTranscriptionShow(!TranscriptionShow); setCommentsShow(false); setNotesShow(false)}}
                            >
                                Transcription
                            </Button>
                            <Button
                            onClick={() => {setNotesShow(!NotesShow); setTranscriptionShow(false); setCommentsShow(false)}}
                            >
                                Notes
                            </Button>
                            <Button
                            onClick={() => {setCommentsShow(!commentsShow); setTranscriptionShow(false); setNotesShow(false)}}
                            
                            >
                                Q&A
                            </Button>
                        </div>
                        {
                            TranscriptionShow?
                            <div className="w-full p-5">
                                <h1>Transcription</h1>
                                <p>Duo labore et lorem duo clita eirmod dolor sed et. Dolor et takimata voluptua sit. Et dolor nonumy diam kasd.</p>
                            </div>:
                            null
                        }
                        {
                            commentsShow?
                            <div className="w-full p-5">
                                <CommentsSection course={course} lessonid={lessonid} chapterid={chapterid}/>
                            </div>:
                            null
                        }
                        {
                            NotesShow?
                            <div className="w-full p-5">
                                <h1>Notes</h1>
                                <p>Duo labore et lorem duo clita eirmod dolor sed et. Dolor et takimata voluptua sit. Et dolor nonumy diam kasd.</p>
                            </div>:
                            null
                        }
                    </div>
                </div>

                    );
                
                })}
            </div>
        </div>
        {/* <CommentsSection course={course} lessonid={lessonid} chapterid={chapterid}/> */}
        </div>
    )
}