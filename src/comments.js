import React, { useState } from 'react';
import './App.css';
import {getReplies,authStateChange,postComment,getComments,postReply} from './firebase/functions';
import SendIcon from '@mui/icons-material/Send';
import { Button } from "@mui/material";
// Mock data for initial comments
// const initialComments = [
//   { id: 1, author: 'Alice', text: 'This is an interesting video!' },
//   { id: 2, author: 'Bob', text: 'Thanks for sharing!' },
// ];
function Reply ({ replies,comment, img, author
  ,course,lessonid,chapterid,commentID }){



  return(
  <div className="replies">
    {replies.map((reply) => (
      <div className="reply flex flex-col pt-5">
        <div className='flex fex-row '
        style={{width:'60vw',alignContent:'center', alignItems:'center'}}>
        <img src = {reply.img} alt=''
        style={{marginRight:'10px', height:'40px', borderRadius:'50%'}}
        ></img>
        <p className='comment-author'>{reply.author}</p>
        </div>
        <p className="reply-text pt-2" style={{paddingLeft:'45px'}}>{reply.text}</p>
        

      </div>
    ))}
  </div>
);}
function Comment ({ comment,course,lessonid,chapterid,commentID,img, author,text}) { 
  const [replies, setReplies] = useState([]);
  let [ShowReplies, setShowReplies] = useState(false);
  let [posted, setPosted] = useState(false);
  const [reply, setRepy] = useState([]);
  const getRepliesHelper = (commentID) => {
    getReplies(course,lessonid,chapterid,commentID)
      .then((docs) => {
        docs.map((doc) => {
          setReplies((prev) => {
            
            return [...prev, doc[1]];
          });
      }
      )})}
      function handlePost(e){
        e.preventDefault();
        
        setPosted(true);
        let post = {author:author,text:reply,img:img};
    postReply(post
      ,course,lessonid,chapterid,commentID);
      setRepy('');
      }
  function handleSubmit() {
    setShowReplies(!ShowReplies);
    
    
      setReplies([]);
    getRepliesHelper(commentID);
  }
  React.useEffect(() => {
    if(posted===true){
      document.getElementsByClassName('INPUT').value = '';
      setReplies([]);
      getRepliesHelper(commentID);
      setPosted(false);
    }
  }, [ posted]);

  return(
  
  <div className="comment">
   <div>
    <div className='flex flex-row gap-4'
    style={{alignContent:'center', alignItems:'center'}}>
    <img src={comment[1] ? comment[1].img : null} alt="user" style={{marginRight:'10px',width:'40px', height:'40px', borderRadius:'50%'}}/>
    <h5 className="comment-author">{comment[1] ? comment[1].author : null}</h5>
    </div>
    <p className="comment-text pl-16">
      {comment[1] ? comment[1].text : null}
    </p>

   </div>
    {ShowReplies? 
    <div>
   <Button onClick={handleSubmit}>Hide Replies</Button>

      <div className='pl-10 z-10'>
      
      <Reply
        replies={replies}
        comment={comment}course={course}lessonid={lessonid}chapterid={chapterid}commentID={commentID}img={img} author={author}
        />
        <form className='flex flex-row items-center space-x-2 bg-white p-2 rounded-lg' onSubmit={handlePost}>
          <input required type="text" value={reply} onChange={(e) => setRepy(e.target.value)} placeholder="Reply" className='flex-1 p-2 rounded-md border-2 border-gray-300 focus:border-blue-500 focus:outline-none INPUT' />
          <button type='submit' className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600'>
            <SendIcon/>
          </button>
        </form>
        
    </div>
      </div>:<Button onClick={handleSubmit}>Show Replies</Button>}

  </div>
);}


const CommentsSection = ({course,lessonid,chapterid}) => {
  const [User, setUser] = useState(null);
  const [author, setAuthor] = useState('');
  const [img, setImg] = useState('');
  const [comments, setComments] = useState([]);
  const [rendered, setRendered] = useState(false);
  const [commentID, setCommentID] = useState('');
  const [replies, setReplies] = useState([]);
  

  
  React.useEffect(() => {
    authStateChange((user) => {
      if (user) {
        setUser(user);
        setAuthor(user.displayName);
        setImg(user.photoURL);
      } else {
        console.log("No user signed in.");
      }
    });
    

    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const addComment = (comment) => {
    setComments([...comments, { ...comment, id: Date.now() }]);
    postComment(comment,img,author,course,lessonid,chapterid)
    .then((docRef) => {
      setCommentID(docRef);
    });
    
  };
 



React.useEffect(() => {
  const getCommentsHelper = () => {
    setComments([]);
    getComments(course,lessonid,chapterid)
      .then((docs) => {
        docs.map((doc) => {
          setComments((prev) => {
            return [...prev, doc];
          });
          
  
      }
      )})};
  if(rendered===false){
    getCommentsHelper();
    // getRepliesHelper(commentID);
    setRendered(true);
  }
}, [chapterid, course, lessonid, rendered,comments]);
const [text, setText] = useState('');
  const [posted, setPosted] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    addComment({ author, text, img, date: new Date().toISOString()});
    setRendered(false);
    setText('');
    setPosted(!posted);
  };
  let photoURL = img ? img : null;
  return (
    <div className="comments-section w-full"
    
    >
      <div
      className='flex flex-col'
        style={{
        
        
        }}
>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div>
          <Comment  
        course={course} lessonid={lessonid} chapterid={chapterid}
        key={comment[0]} comment={comment} 
        commentID={comment[0]} img={img} author={author} 
        />
       
        </div>
      ))}
      <form className="comment-form" onSubmit={handleSubmit}>
      <div className='flex flex-row' >
      <img src={photoURL||null} alt="user" style={{marginRight:'10px',width:'40px', height:'40px', borderRadius:'50%'}}/>

      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your comment"
        required
        style={{width:'60vw',height:'40px',borderRadius:'5px',border:'1px solid #d1d1d1',padding:'10px'}}
      />
     
        <button type="submit" className='p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 'style={{marginLeft:'10px',maxWidth:'40px'}}>
            <SendIcon/>
          </button>
      </div>
      
    </form>
      </div>
      
    </div>
  );
};

export default CommentsSection;
