import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { ApolloClient } from "../../clients";
import Video from "../../components/Video";
import { Header } from "../../components/Header";

export default function Main() {
  // Creating a state to store the uploaded video
    const [search, setSearch] = useState("");
  const [videos, setVideos] = useState([]);

  // Get the client from the useApolloClient hook
  //   const client = useApolloClient();

  // Query the videos from the the graph
  const GET_VIDEOS = gql`
    query videos(
      $first: Int
      $skip: Int
      $orderBy: Video_orderBy
      $orderDirection: OrderDirection
      $where: Video_filter
    ) {
      videos(
        first: $first
        skip: $skip
        orderBy: $orderBy
        orderDirection: $orderDirection
        where: $where
      ) {
        id
        hash
        title
        description
        location
        category
        thumbnailHash
        date
        author
        createdAt
      }
    }
  `;

  // Function to get the videos from the graph
  const getVideos = async () => {
    // Query the videos from the graph
    ApolloClient.query({
      query: GET_VIDEOS,
      variables: {
        first: 200,
        skip: 0,
        orderBy: "createdAt",
          orderDirection: "desc",
         // NEW: Added where in order to search for videos
          where: {
            ...(search && {
              title_contains_nocase: search,
            }),
          },
        },
      fetchPolicy: "network-only",
    })
      .then(({ data }) => {
        // Set the videos to the state
        setVideos(data.videos);
      })
      .catch((err) => {
        alert(err.message);
      });
  };

  useEffect(() => {
    // Runs the function getVideos when the component is mounted
    getVideos();
  }, [search]);
  return (
    <div className="w-full bg-[#1a1c1f] flex flex-row">
      <div className="flex-1 h-screen flex flex-col">
        <div className="flex flex-row flex-wrap">
          <Header
            search={(e) => {
              setSearch(e);
            }}
          />
          {/* {videos.map((video) => (
            <div className="w-80">
              <p>{video.title}</p>
            </div>
          ))} */}
          {videos.map((video) => (
            <div
              className="w-80"
              onClick={() => {
                // Navigation to the video screen (which we will create later)
                window.location.href = `/video?id=${video.id}`;
              }}
            >
              <Video video={video} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
