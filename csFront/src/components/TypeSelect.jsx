import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Tag } from 'antd'
import { getTypeList } from '../redux/typeSlice'
import { useDispatch } from 'react-redux'
import { updateIssueTypeId } from '../redux/typeSlice'

function TypeSelect(props) {
  const [tags, setTags] = useState()
  const { typeList } = useSelector((state) => state.type)

  const colorArr = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple',
  ]

  const dispatch = useDispatch()
  const changeType = (type) => {
      console.log('🐤 ≂ type:', type)
      dispatch(updateIssueTypeId(type))
  }

  useEffect(() => {
    if (!typeList.length) {
      dispatch(getTypeList())
    }
    if (typeList.length) {
      const arr = []
      arr.push(
        <Tag
          color="magenta"
          key="all"
          value="all"
          onClick={() => changeType('all')}
        >
          全部
        </Tag>
      )
      typeList.forEach((item, index) => {
        arr.push(
          <Tag
            color={colorArr[index % colorArr.length]}
            key={item._id}
            value={item._id}
            onClick={() => changeType(item._id)}
          >
            {item.typeName}
          </Tag>
        )
      })
      setTags(arr)
    }
  }, [typeList])
  return <div>{tags}</div>
}

export default TypeSelect
