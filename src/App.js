import React, { useState, useEffect } from 'react';
//new
import {
  HashRouter,
  Switch,
  Route
} from "react-router-dom";
import { DataStore } from "@aws-amplify/datastore";
import { css } from '@emotion/css';
import Claims from './Claims';
import Claim from './Claim';
import Header from './Header';
import CreateClaim from './CreateClaim';
import Button from './Button';
//
import './App.css';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { API, Storage, Auth} from 'aws-amplify';
import { listClaims } from './graphql/queries';
//import { readUserInfo } from './graphql/queries';
//import { updateUser as updateUserMutation } from './graphql/mutations';
//import { createClaim as createClaimMutation, updateClaim as updateClaimMutation, deleteClaim as deleteClaimMutation } from './graphql/mutations';

const initialFormState = { name: '', description: '', date: '' }

function Router() {
  /* create a couple of pieces of initial state */
  const [showOverlay, updateOverlayVisibility] = useState(false);
  const [claims, updateClaims] = useState([]);
  const [myClaims, updateMyClaims] = useState([]);

  /* fetch claims when component loads */
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
    setClaimState(claimsFromAPI);
  }

  async function setClaimState(claimsFromAPI) {
    const user = await Auth.currentAuthenticatedUser();
    const myClaimData = claimsFromAPI.filter(p => p.owner === user.username);
    updateMyClaims(myClaimData);
    updateClaims(claimsFromAPI);
  }

  return (
    <>
      <HashRouter>
          <div className={contentStyle}>
            <Header />
            <hr className={dividerStyle} />
            <Button title="Add Claim" onClick={() => updateOverlayVisibility(true)} />
            <Switch>
              <Route exact path="/" >
                <Claims claims={claims} />
              </Route>
              <Route path="/claim/:id" >
                <Claim />
              </Route>
              <Route exact path="/myclaim" >
                <Claims claims={myClaims} />
              </Route>
            </Switch>
          </div>
          <AmplifySignOut />
        </HashRouter>
        { showOverlay && (
          <CreateClaim
            updateOverlayVisibility={updateOverlayVisibility}
            updateClaims={setClaimState}
            claims={claims}
          />
        )}
    </>
  );
} 

const dividerStyle = css`
  margin-top: 15px;
`

const contentStyle = css`
  min-height: calc(100vh - 45px);
  padding: 0px 40px;
`

export default withAuthenticator(Router);
/*
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
*/