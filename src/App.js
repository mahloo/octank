import React, { useState, useEffect } from 'react';
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { API, Storage } from 'aws-amplify';
import { listClaims } from './graphql/queries';
import { readUserInfo } from './graphql/queries';
import { updateUser as updateUserMutation } from './graphql/mutations';
import { createClaim as createClaimMutation, updateClaim as updateClaimMutation, deleteClaim as deleteClaimMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '', date: '' }

function App() {
  const [claims, setClaims] = useState([]);
  const [formData, setFormData] = useState(initialFormState);

  async function onChange(e) {
    if (!e.target.files[0]) return
    const file = e.target.files[0];
    setFormData({ ...formData, image: file.name });
    await Storage.put(file.name, file);
    fetchClaims();
  }

  useEffect(() => {
    fetchClaims();
  }, []);

  async function fetchClaims() {
    const apiData = await API.graphql({ query: listClaims});
    const claimsFromAPI = apiData.data.listClaims.items;
    await Promise.all(claimsFromAPI.map(async claim => {
      if (claim.image) {
        const image = await Storage.get(claim.image);
        claim.image = image;
      }
      return claim;
    }))
    setClaims(apiData.data.listClaims.items);
  }

  async function createClaim() {
    if (!formData.name || !formData.description) return;
    await API.graphql({ query: createClaimMutation, variables: { input: formData } });
    if (formData.image) {
      const image = await Storage.get(formData.image);
      formData.image = image;
    }
    setClaims([ ...claims, formData ]);
    setFormData(initialFormState);
  }

  async function deleteClaim({ id }) {
    const newClaimArray = claims.filter(claim => claim.id !== id);
    setClaims(newClaimArray);
    await API.graphql({ query: deleteClaimMutation, variables: { input: { id } }});
  }

  return (
    <div className="App">
      <h1>Welcome to Octank</h1>
      <input
        onChange={e => setFormData({ ...formData, 'name': e.target.value})}
        placeholder="Title"
        value={formData.name}
      />
      <input
        onChange={e => setFormData({ ...formData, 'description': e.target.value})}
        placeholder="Claim description"
        value={formData.description}
      />
      <input
        onChange={e => setFormData({ ...formData, 'date': e.target.value})}
        placeholder="Date"
        value={formData.date}
      />
      <input
        type="file"
        onChange={onChange}
      />
      <button onClick={createClaim}>Create Claim</button>
      <div style={{marginBottom: 30}}>
        {
          claims.map(claim => (
            <div key={claim.id || claim.name}>
              <h2>{claim.name}</h2>
              <p>{claim.description}</p>
              <button onClick={() => deleteClaim(claim)}>Delete Claim</button>
              {
                claim.image && <img src={claim.image} style={{width: 400}} />
              }
            </div>
          ))
        }
      </div>
      <AmplifySignOut />
    </div>
  );
}

export default withAuthenticator(App);