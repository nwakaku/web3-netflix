import React, { useEffect, useState } from "react";
import { gql } from "@apollo/client";
import { ApolloClient } from "../../clients";
import Video from "../../components/Video";
import { Header } from "../../components/Header";
import { AiOutlineStar, AiFillStar } from "react-icons/ai";


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
      <div className="flex-1 h-full flex flex-col">
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
          <div className="movies">
            <div className="text-part">
              <h3>
                NETFLIX <span>ORIGINAL</span>
              </h3>
              <h1>Passion Of Christ</h1>
              <div className="">
                <div className="description">
                  <div className="stars">
                    <AiFillStar color="red" />
                    <AiFillStar color="red" />
                    <AiFillStar color="red" />
                    <AiFillStar color="red" />
                    <AiOutlineStar color="red" />
                  </div>
                  <div className="year">
                    <p>2004</p>
                    <p>TV-MA</p>
                    <p>1 season</p>
                  </div>
                </div>

                <div>
                  <p>
                    Jesus Christ, the savior of humanity, is betrayed by one of
                    his disciple and captured by the Romans. Even during a
                    torturous death, Jesus redeems souls and defeats Satan's
                    true purpose.
                  </p>
                  <div className="some-button">
                    <button
                      type="button"
                      class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-12 py-2.5 text-center mr-2 mb-2"
                    >
                      Play
                    </button>
                    <button
                      type="button"
                      class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-12 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                    >
                      Watch Later
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="image-part">
              <img
                className=""
                src="https://imgs.search.brave.com/4qhCCe8MpmEs8-Mu0xx-rLbs_6ej40lDS5oZNxp_nJM/rs:fit:1200:720:1/g:ce/aHR0cHM6Ly93d3cu/ZmxpeHdhdGNoLmNv/L3dwLWNvbnRlbnQv/dXBsb2Fkcy82MDAz/MTQyMi5qcGc"
                alt=""
              />
            </div>
          </div>
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
