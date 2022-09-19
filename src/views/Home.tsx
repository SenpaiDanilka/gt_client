import { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import Cookie from 'js-cookie'
import { useLazyQuery, gql } from '@apollo/client'

const FindUserByEmail = gql`
  query findUserByEmail($email: String!) {
    findUserByEmail(email: $email) {
      _id
      name
      email
      phone
      spaces {
        data {
          _id
          name
        }
      }
      items {
        data {
          _id
          name
        }
      }
    }
  }
`;

export default function Home() {
  const navigate = useNavigate()
  const cookies = Cookie.get('fauna-session');

  const [getCurrentUser, { data }] = useLazyQuery(FindUserByEmail);

  useEffect(() => {
    if(!cookies) {
      navigate('/sign_in')
    }
    getCurrentUser({
      variables: {
        email: "user1@gmail.com"
      }
    })
  }, [cookies])

  if (data?.findUserByEmail?.spaces?.data) {
    const spaces = data?.findUserByEmail?.spaces?.data
    const ownerInfo = data.findUserByEmail;
    return (
      <>
        <h4>{ownerInfo.name}</h4>
        <div><b>Email:</b> {ownerInfo.email}</div>
        <h6>Your Spaces: </h6>
        <div style={{ 
          marginTop: '20px', 
          overflow: 'auto',
          minWidth: '270px', 
          maxHeight: '60vh', 
          display: 'flex',
          justifyContent: 'center' 
        }}>
          <ul className="uk-list uk-list-large uk-list-striped">
            {
              Object.keys(spaces).map((_, index) => {
                const space = spaces[index]
                return (
                  <li key={space._id}>
                    <div className="container">
                      <div>{space.name}</div>
                      <p uk-margin>
                        <button 
                          className="uk-button uk-button-secondary uk-button-small" 
                          onClick={() => {
                            navigate(`/space/${space._id}/edit`)
                          }}
                        >
                          Edit</button>
                        <button 
                          className="uk-button uk-button-danger uk-button-small"
                          onClick={() => {
                            alert('Delete not implemented yet')
                          }}
                        >
                          Delete
                        </button>
                      </p>
                    </div>
                  </li>
                )
              })
            }
          </ul>
        </div>
      </>
    )
  }
  return <div>Home</div>
}