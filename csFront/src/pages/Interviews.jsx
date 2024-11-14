import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { getInterviewTitleAsync } from '../redux/interviewSlice'
import { getInterviewById } from '../api/interview'
import { getTypeList } from '../redux/typeSlice'
import styles from '../css/Interview.module.css'
import { useDispatch, useSelector } from 'react-redux'
import PageHeader from '../components/PageHeader'
import { Tree, BackTop, Empty } from 'antd'

// 面试题树形结构组件
const InterviewTree = React.memo(({ treeData, onSelect, expandedKeys, onExpand }) => (
  <Tree
    className="draggable-tree"
    showLine
    treeData={treeData}
    onSelect={onSelect}
    expandedKeys={expandedKeys}
    onExpand={onExpand}
    selectedKeys={[]}
  />
));

// 面试题内容展示组件
const InterviewContent = React.memo(({ interviewInfo }) => (
  <div className={styles.content}>
    <h1 className={styles.interviewRightTilte}>
      {interviewInfo.interviewTitle}
    </h1>
    <div className={styles.contextContainer}>
      <div
        dangerouslySetInnerHTML={{
          __html: interviewInfo.interviewContent,
        }}
      />
    </div>
  </div>
));

function Interviews() {
  const { interviewTitleList } = useSelector((state) => state.interview)
  const { typeList } = useSelector((state) => state.type)
  const [interviewInfo, setInterViewInfo] = useState(null)
  const [expandedKeys, setExpandedKeys] = useState([])
  const [currentInterviewId, setCurrentInterviewId] = useState(null)

  const dispatch = useDispatch()

  // 根据类型列表和面试题标题列表生成树形结构数据
  const treeData = useMemo(() => {
    if (typeList.length === 0 || interviewTitleList.length === 0) return [];

    return typeList.map((item, index) => ({
      title: <h3 style={{ fontWeight: '500' }}>{item.typeName}</h3>,
      key: index,
      children: interviewTitleList[index]?.map(interview => ({
        title: <h4 style={{ fontWeight: '400' }}>{interview.interviewTitle}</h4>,
        key: interview._id,
      })) || [],
    }));
  }, [typeList, interviewTitleList]);

  // 处理树节点选择事件
  const onSelect = useCallback((selectedKeys, info) => {
    const selectedId = selectedKeys[0] || info.node.key;
    
    if (!isNaN(selectedId)) {
      // 如果选中的是类型目录
      console.log("选中了类型目录:", info.node.title);
      // 展开或收起该目录
      setExpandedKeys(prevKeys => 
        prevKeys.includes(selectedId) 
          ? prevKeys.filter(key => key !== selectedId)
          : [...prevKeys, selectedId]
      );
    } else if (selectedId !== currentInterviewId) {
      // 如果选中的是具体的面试题且不是当前已选中的面试题
      setCurrentInterviewId(selectedId);
      // 获取面试题详情
      getInterviewById(selectedId).then((res) => {
        console.log('🐤 ≂ res:', res);
        setInterViewInfo(res.data);
      });
    }
  }, [currentInterviewId]);

  // 处理树节点展开/收起事件
  const onExpand = useCallback((newExpandedKeys) => {
    setExpandedKeys(newExpandedKeys);
  }, []);

  // 获取面试题标题列表
  useEffect(() => {
    if (!interviewTitleList.length) {
      dispatch(getInterviewTitleAsync())
    }
  }, [dispatch, interviewTitleList.length]);

  // 获取类型列表
  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())
    }
  }, [dispatch, typeList.length]);

  return (
    <div className={styles.container}>
      <PageHeader title="面试题大全" />
      <div className={styles.interviewContainer}>
        <div className={styles.leftSide}>
          <div className={styles.interviewLeftTitle}>
            <InterviewTree
              treeData={treeData}
              onSelect={onSelect}
              expandedKeys={expandedKeys}
              onExpand={onExpand}
            />
          </div>
        </div>
        <div className={styles.rightSide}>
          {interviewInfo ? (
            <InterviewContent interviewInfo={interviewInfo} />
          ) : (
            <div className={styles.emptyContainer}>
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={<span>请从左侧选择一个面试题</span>}
              />
            </div>
          )}
        </div>
      </div>
      <BackTop />
    </div>
  )
}

export default Interviews
