import React, { useEffect, useState } from 'react'
import './index.sass' // Import the CSS file for styling
import useRequest from '../../hooks/useRequest'
import { Table, Button, Badge, message } from 'antd'

const Contact = () => {
  const [data, setData] = useState()
  const { request, isLoading, error } = useRequest('/attraction/getListInfo', {
    method: 'GET',
  })
  const { request: switchStatus } = useRequest('/comment/updateStatus', {
    method: 'GET',
  })

  const fetchData = async () => {
    const res = await request()
    if (!error) {
      setData(res.data.attractions)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const columns = [
    {
      title: 'Attraction ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Attraction Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Comments Count',
      dataIndex: 'comments_count',
      key: 'comments_count',
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.comments_count - b.comments_count,
    },
    {
      title: 'Latest Comment creation time:',
      dataIndex: 'latest_comment_time',
      key: 'latest_comment_time',
      render: (txt, row) => {
        const date = new Date(txt);
        return txt ? date.toLocaleString(): 'No Data';
      },
    },
    {
      title: 'Official Tel',
      dataIndex: 'official_tel',
      key: 'official_tel',
    }
  ]

  const expandedRowRender = (e) => {
    const columns = [
      {
        title: 'Comment_ID',
        dataIndex: 'review_id',
        key: 'review_id',
        render: (text, record, index) => <span>{index+1}</span>,
      },
      {
        title: "Posted by", 
        dataIndex: 'reviewer_email',
      },
      {
        title: 'Post Title',
        dataIndex: 'review_title'
      },
      {
        title: 'Content',
        dataIndex: 'detailed_review',
        key: 'detailed_review',
      },
      {
        title: 'Rate',
        dataIndex: 'star_rating',
        render: (val) => <Badge count={val} color={val>=3 ? '#52c41a': '#f5222d'} />
      },
      {
        title: 'Post Date',
        dataIndex: 'review_time',
        key: 'review_time',
      },
      {
        title: 'Status',
        key: 'status',
        width:100,
        render: (row) =>
          !Number(row.status) ? (
            <Badge status='error' text='disable' />
          ) : (
            <Badge status='success' text='enable' />
          ),
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        key: 'operation',
        render: (text, row) => (
            <Button
              type='link'
              onClick={() => {
                switchStatus(null, { review_id: row.review_id }).then((res) => {
                  message.success(res.message)
                  fetchData()
                })
              }}
            >
              Switch
            </Button>
        ),
      },
    ]
    return (
      <Table
        rowKey='review_id'
        columns={columns}
        dataSource={e.comments}
        pagination={false}
      />
    )
  }

  return (
    <div style={{padding: '20px 50px'}} className='comments-container'>
      <Table
        rowKey='id'
        loading={isLoading}
        columns={columns}
        expandable={{
          expandedRowRender,
        }}
        dataSource={data}
      />
    </div>
  )
}

export default Contact
