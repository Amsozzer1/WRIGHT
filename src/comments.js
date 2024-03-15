import React, { useState } from 'react';
import './App.css';
// Mock data for initial comments
const initialComments = [
  { id: 1, author: 'Alice', text: 'This is an interesting video!' },
  { id: 2, author: 'Bob', text: 'Thanks for sharing!' },
];

const Comment = ({ comment }) => (
  <div className="comment">
    <h5 className="comment-author">{comment.author}</h5>
    <p className="comment-text">{comment.text}</p>
  </div>
);

const CommentForm = ({ addComment }) => {
  const [author, setAuthor] = useState('');
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    addComment({ author, text });
    setAuthor('');
    setText('');
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        placeholder="Your name"
        required
      />
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Your comment"
        required
      />
      <button type="submit">Post Comment</button>
    </form>
  );
};

const CommentsSection = () => {
  const [comments, setComments] = useState(initialComments);

  const addComment = (comment) => {
    // In a real app, you'd also want to save this to a server
    setComments([...comments, { ...comment, id: Date.now() }]);
  };

  return (
    <div className="comments-section w-full"
    
    >
      <div
      className='flex flex-col align-middle justify-center'
        style={{alignContent:'center', alignItems:'center',
        backgroundColor: 'lightblue',
        
        }}
>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
      <CommentForm addComment={addComment} />
      </div>
    </div>
  );
};

export default CommentsSection;
