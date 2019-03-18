import React, { Component } from 'react';
import axios from 'axios';

const apiUrl = 'http://localhost:3300/api/users';

class App extends Component {
  state = {
    users: []
  };

  getUsers = () => {
    axios.get(apiUrl)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.error(err));
  }

  deleteUser = (id) => {
    axios.delete(`${apiUrl}/${id}`)
    .then(res => window.location.reload())
    .catch(err => console.error(err));
  }

  addUser = (event) => {
    event.persist();
    event.preventDefault();
    const { name, bio } = event.target;
    const requestBody = { name: name.value, bio: bio.value };

    axios.post(`${apiUrl}`, requestBody)
      .then(res => this.setState({ users: res.data }))
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.getUsers();
  }

  render() {
    return (
      <>
        {
          this.state.users.map(user => {
            return (
              <div key={user.id}>
                { JSON.stringify(user) }
                <button
                  onClick={() => this.deleteUser(user.id)}
                >
                  delete
                </button>
              </div>
            );
          })
        }
        <form onSubmit={this.addUser}>
          <input
            name="name"
            type="text"
            placeholder="name"
          />
        <textarea
            name="bio"
            placeholder="bio"
          />
          <button type="submit">Add</button>
        </form>
      </>
    );
  }
}

export default App;
