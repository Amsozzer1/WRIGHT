import Menu from './MENU.js';
import CommentsSection from './comments.js';
export default function LessonPage() {
    
    return (
        <div>
            <Menu/>
            <div className='flex flex-col align-middle justify-start aspect-video pt-24'
        style={{alignContent:'center', alignItems:'center',
        }}>
    <iframe 
        className='rounded-lg'
        src="https://www.youtube.com/embed/4WiH9pf2ULQ" 
        width="60%" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
        allowFullScreen
        style={{height:'60vh'}}
        >
    </iframe>
</div>
<CommentsSection/>
        </div>
    );
    }