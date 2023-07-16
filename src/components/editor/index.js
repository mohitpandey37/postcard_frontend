import React from "react";
import { useQuill } from 'react-quilljs';
import 'quill/dist/quill.snow.css';

export default function (props) {
    const { quill, quillRef } = useQuill();

    // const theme = 'snow';
    // const modules = {
    //     toolbar: [
    //         ['bold', 'italic', 'underline'],
    //     ],
    // };
    // const placeholder = 'text...';
    // const formats = ['bold', 'italic', 'underline'];
    // const { quillRef } = useQuill({ theme, modules, formats, placeholder });

    React.useEffect(() => {
        if (quill) {
          quill.on('text-change', (delta, oldDelta, source) => {
            props.onValue(quill.root.innerHTML)
          });
        }
        }, [quill]);

    return (
        <div >
            <div ref={quillRef} />
        </div>
    )
}