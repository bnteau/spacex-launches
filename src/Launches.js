import { useQuery, gql } from "@apollo/client";
import "./launches.scss";

const SPACEX_LAUNCHES = gql`
  query GetSpacexLaunches {
    launches(limit: 6) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
        flickr_images
      }
      details
    }
  }
`;

export default function SpacexLaunches() {
  const { loading, error, data } = useQuery(SPACEX_LAUNCHES);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : (</p>;

    console.log(data);

  return (
      <div className="launches">
          {data.launches.map((launch) => (
              <div
                key={launch.launch_date_utc} 
                className="launch"
              >
                <div
                  className="launch__background"
                  style={{ backgroundImage: `url(${launch.links.flickr_images[0]})` }}
                >
                  <p className="launch__rocket">Rocket used : {launch.rocket.rocket_name}</p>
                  {launch.launch_success ? 
                    <p className="launch__success">This one was good</p> : 
                    <p className="launch__fail">Arf</p>
                  }
                </div>
                <div className="launch__infos">
                    <p className="launch__date">Date : {launch.launch_date_utc}</p>
                  <p className="launch__details">{launch.details}</p>
                  <p className="launch__url">
                    You can watch the launch <a href={launch.links.video_link}>here</a>
                  </p>
                </div>
              </div>
          ))}
      </div>
  )
}