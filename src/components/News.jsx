import React from 'react'
import { Select, Typography, Row, Col, Avatar, Card } from 'antd'
import moment from 'moment'

import { useGetNewsQuery } from '../services/cryptoNewsApi'

const { Text, Title } = Typography
const { Option } = Select
const demoImage =
  'http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg'

const News = () => {
  const { data: newsData, isFetching } = useGetNewsQuery('crypto')

  if (!newsData?.value) return 'Loading ....'

  return (
    <Row gutter={[24, 24]}>
      {newsData.value.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className='news-card'>
            <a href={news.url} target='_blank' rel='noreferrer'>
              <div className='news-image-container'>
                <Title className='news-title' level={4}>
                  {news.name}
                </Title>
                <img
                  style={{ maxWidh: '200px', maxHeight: '100px' }}
                  src={news?.image?.thumbnail?.contentUrl || demoImage}
                  alt='news'
                />
              </div>
              <p>
                {news.description > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className='provider-container'>
                <Avatar
                  src={news.provider[0]?.image?.thumbnail?.contentUrl}
                  alt='news'
                />
                <Text>
                  {moment(news.datePublished).startOf('ss').fromNow()}
                </Text>
              </div>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
