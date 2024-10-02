import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';
import styles from '../css/Discuss.module.css';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';

function Discuss({ onSubmit }) {
    const editorRef = useRef(null);
    const userInfo = useSelector(state => state.user);

    const handleSubmit = (e) => {
        e.preventDefault();
        const editorInstance = editorRef.current.getInstance();
        const comment = editorInstance.getMarkdown();
        if (comment.trim()) {
            onSubmit(comment);
            editorInstance.setMarkdown('');
        }
    };

    return (
        <div className={styles.discussContainer}>
            <div className={styles.userInfoContainer}>
                <Avatar
                    src={userInfo.avatar}
                    alt={userInfo.nickname}
                    size="small"
                    className={styles.avatar}
                />
                <span className={styles.username}>{userInfo.nickname}</span>
            </div>
            <form onSubmit={handleSubmit} className={styles.formContainer}>
                <Editor
                    ref={editorRef}
                    initialValue=""
                    previewStyle="vertical"
                    height="200px"
                    initialEditType="markdown"
                    useCommandShortcut={true}
                />
                <button type="submit" className={styles.submitButton}>
                    添加评论
                </button>
            </form>
        </div>
    );
}

export default Discuss;