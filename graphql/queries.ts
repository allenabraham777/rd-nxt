import { gql } from "@apollo/client";

export const GET_ALL_VOTES_BY_POST_ID = gql`
  query MyQuery($post_id: ID!) {
    getVotesByPostId(post_id: $post_id) {
      id
      post_id
      upvote
      username
      created_at
    }
  }
`;

export const GET_SUBREDDIT_LIST_WITH_LIMIT = gql`
  query MyQuery($limit: Int!) {
    getSubredditListWithLimit(limit: $limit) {
      id
      topic
      created_at
    }
  }
`;

export const GET_SUBREDDIT_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getSubredditListByTopic(topic: $topic) {
      topic
      id
      created_at
    }
  }
`;

export const GET_POSTS = gql`
  query MyQuery {
    getPostList {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        topic
        id
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
      comments {
        id
        post_id
        text
        username
      }
    }
  }
`;

export const GET_POST_BY_POST_ID = gql`
  query MyQuery($id: ID!) {
    getPostByPostId(id: $id) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        topic
        id
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
      comments {
        id
        post_id
        text
        username
        created_at
      }
    }
  }
`;

export const GET_POSTS_BY_TOPIC = gql`
  query MyQuery($topic: String!) {
    getPostListByTopic(topic: $topic) {
      body
      created_at
      id
      image
      subreddit_id
      title
      username
      subreddit {
        topic
        id
      }
      votes {
        created_at
        id
        post_id
        upvote
        username
      }
      comments {
        id
        post_id
        text
        username
      }
    }
  }
`;
