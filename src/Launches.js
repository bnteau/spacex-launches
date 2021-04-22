import { useQuery, gql } from "@apollo/client";

const SPACEX_LAUNCHES = gql`
  query GetSpacexLaunches {
    launches(limit: 5) {
      launch_date_utc
      launch_success
      rocket {
        rocket_name
      }
      links {
        video_link
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
      <div>
          {data.launches.map((launch) => (
              <div key={launch.launch_date_utc} style={{ marginBottom: "50px" }}>
                <p>Date : {launch.launch_date_utc}</p>
                <p>{launch.details}</p>
                <p>Rocket used : {launch.rocket.rocket_name}</p>
                {launch.launch_success ? <p>This one was good</p> : <p>Arf</p>}
                <p>You can watch the launch <a href={launch.links.video_link}>here</a></p>
              </div>
          ))}
      </div>
  )
}